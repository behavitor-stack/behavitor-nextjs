'use client';
// The post editor: fields on the left, a live preview on the right.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { markdownToHtml } from '@/lib/markdown';
import { save, remove } from './actions';
import type { PostInput, Section } from '@/lib/posts';

type Initial = Omit<PostInput, 'status'> & { status: PostInput['status'] } | null;

const today = () => new Date().toISOString().slice(0, 10);
const slugify = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
const NEW_BODY = `Start with one or two sentences that say what the reader will get from this article.

## First section heading

Write in short paragraphs. Use **bold** for the one phrase you want people to remember.

- A list item
- Another list item

:::note
A short tip or aside, shown in a box.
:::
`;

export default function Editor({ initial, topics, covers, canSave }: {
  initial: Initial; topics: Record<Section, string[]>; covers: Record<string, string>; canSave: boolean;
}) {
  const router = useRouter();
  const isNew = !initial;
  const [section, setSection] = useState<Section>(initial?.section ?? 'blog');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [date, setDate] = useState(initial?.date ?? today());
  const [tag, setTag] = useState(initial?.tag ?? '');
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '');
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? '');
  const [takeaways, setTakeaways] = useState<string[]>(() => [...(initial?.takeaways ?? []), '', '', ''].slice(0, 3));
  const [cover, setCover] = useState(initial?.cover ?? (initial?.image ? '' : 'steps'));
  const [image, setImage] = useState(initial?.image ?? '');
  const format = initial?.format ?? 'md';
  const [body, setBody] = useState(initial?.body ?? NEW_BODY);
  const [status, setStatus] = useState(initial?.status ?? 'draft');
  const [busy, setBusy] = useState('');
  const [note, setNote] = useState<{ kind: 'ok' | 'err' | ''; text: string }>({ kind: '', text: '' });
  const [dirty, setDirty] = useState(false);
  const [view, setView] = useState<'edit' | 'preview'>('edit'); // phones show one at a time
  const ta = useRef<HTMLTextAreaElement>(null);
  const original = useRef({ section: initial?.section, slug: initial?.slug });

  const touch = <T,>(set: (v: T) => void) => (v: T) => { set(v); setDirty(true); };
  useEffect(() => { if (!slugTouched) setSlug(slugify(title)); }, [title, slugTouched]);
  // warn before leaving with unsaved changes
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    addEventListener('beforeunload', warn);
    return () => removeEventListener('beforeunload', warn);
  }, [dirty]);

  const html = useMemo(() => (format === 'md' ? markdownToHtml(body) : body), [body, format]);
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;

  // toolbar: wrap the selection, or insert a block at the cursor
  const wrap = (before: string, after = '', placeholder = '') => {
    const el = ta.current!;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const sel = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + sel + after + value.slice(e);
    setBody(next); setDirty(true);
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(s + before.length, s + before.length + sel.length); });
  };
  const block = (text: string) => {
    const el = ta.current!;
    const s = el.selectionStart, v = el.value;
    const pre = v.slice(0, s).replace(/\n*$/, ''), post = v.slice(s).replace(/^\n*/, '');
    const next = `${pre}${pre ? '\n\n' : ''}${text}\n\n${post}`;
    setBody(next); setDirty(true);
    requestAnimationFrame(() => { el.focus(); const at = (pre ? pre.length + 2 : 0) + text.length; el.setSelectionRange(at, at); });
  };

  const upload = async (file: File | undefined, then: (url: string) => void) => {
    if (!file) return;
    setBusy('upload');
    setNote({ kind: '', text: '' });
    try {
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/admin/upload/', { method: 'POST', body: fd });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || 'Upload failed');
      then(j.url);
    } catch (e) {
      setNote({ kind: 'err', text: (e as Error).message });
    } finally { setBusy(''); }
  };

  const submit = async (nextStatus: 'draft' | 'published') => {
    setBusy(nextStatus);
    setNote({ kind: '', text: '' });
    const r = await save({
      slug, section, title, seoTitle, date, tag, excerpt, takeaways, cover: image ? undefined : cover, image: image || undefined,
      format, body, status: nextStatus, originalSection: original.current.section, originalSlug: original.current.slug,
    });
    setBusy('');
    if (!r.ok) { setNote({ kind: 'err', text: r.error }); return; }
    setStatus(r.status);
    setDirty(false);
    setNote({ kind: 'ok', text: r.status === 'published' ? 'Published. It’s live on the site.' : 'Saved as a draft. Only you can see it.' });
    const moved = original.current.slug !== slug || original.current.section !== section;
    original.current = { section, slug };
    if (isNew || moved) router.replace(`/admin/edit/${section}/${slug}/`);
  };

  const del = async () => {
    if (!confirm(initial ? `Delete “${title}”? This can’t be undone.` : 'Discard this post?')) return;
    if (!initial) { router.push('/admin/'); return; }
    setBusy('delete');
    const r = await remove(original.current.section as Section, original.current.slug as string);
    if (!r.ok) { setBusy(''); setNote({ kind: 'err', text: r.error }); return; }
    setDirty(false);
    router.push('/admin/');
  };

  const live = status === 'published';
  const url = `/${section}/${slug || 'your-post'}/`;
  return (
    <div className="ed">
      <div className="ed__bar">
        <span className={`adm-status is-${status}`}>{live ? 'Published' : status === 'deleted' ? 'Hidden' : 'Draft'}</span>
        {dirty ? <span className="ed__unsaved">Unsaved changes</span> : null}
        <span className="ed__spacer" />
        <div className="ed__switch chips" role="group" aria-label="Show">
          <button type="button" className={`chip${view === 'edit' ? ' is-on' : ''}`} onClick={() => setView('edit')}>Write</button>
          <button type="button" className={`chip${view === 'preview' ? ' is-on' : ''}`} onClick={() => setView('preview')}>Preview</button>
        </div>
        {live ? <a className="adm-link" href={url} target="_blank" rel="noopener">View on site ↗</a> : null}
        <button type="button" className="adm-link adm-link--danger" onClick={del} disabled={Boolean(busy)}>{initial ? 'Delete' : 'Discard'}</button>
        {live ? <button type="button" className="btn btn--sm" disabled={!canSave || Boolean(busy)} onClick={() => submit('draft')}>Unpublish</button>
          : <button type="button" className="btn btn--sm" disabled={!canSave || Boolean(busy)} onClick={() => submit('draft')}>{busy === 'draft' ? 'Saving…' : 'Save draft'}</button>}
        <button type="button" className="btn btn--dark btn--sm" disabled={!canSave || Boolean(busy)} onClick={() => submit('published')}>{busy === 'published' ? 'Publishing…' : live ? 'Update' : 'Publish'}</button>
      </div>
      <p className={`ed__note${note.kind ? ` is-${note.kind}` : ''}`} role="status" aria-live="polite">{note.text}</p>

      <div className={`ed__grid is-${view}`}>
        <form className="ed__form" onSubmit={e => e.preventDefault()}>
          <div className="field">
            <label htmlFor="ed-title">Title</label>
            <input id="ed-title" className="ed__title" value={title} onChange={e => touch(setTitle)(e.target.value)} placeholder="A clear, specific title" />
          </div>
          <div className="ed__row">
            <fieldset className="field">
              <legend>Section</legend>
              <div className="slide" style={{ '--n': 2 } as React.CSSProperties}>
                {(['blog', 'ai'] as Section[]).map(s => <label key={s}><input type="radio" name="section" checked={section === s} onChange={() => touch(setSection)(s)} /><span>{s === 'ai' ? 'AI' : 'Blog'}</span></label>)}
                <span className="slide__thumb" aria-hidden="true" />
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="ed-tag">Topic</label>
              <input id="ed-tag" list="ed-topics" value={tag} onChange={e => touch(setTag)(e.target.value)} placeholder="Design" />
              <datalist id="ed-topics">{topics[section].map(t => <option key={t} value={t} />)}</datalist>
            </div>
            <div className="field">
              <label htmlFor="ed-date">Date</label>
              <input id="ed-date" type="date" value={date} onChange={e => touch(setDate)(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="ed-slug">Web address</label>
            <div className="ed__slug"><span>behavitor.com/{section}/</span>
              <input id="ed-slug" value={slug} onChange={e => { setSlugTouched(true); touch(setSlug)(slugify(e.target.value)); }} /></div>
          </div>
          <div className="field">
            <label htmlFor="ed-excerpt">Summary <span className="field__opt">{excerpt.length} characters · aim for 120–160</span></label>
            <textarea id="ed-excerpt" rows={2} value={excerpt} onChange={e => touch(setExcerpt)(e.target.value)} placeholder="One or two sentences shown on cards, in search results and when shared." />
          </div>
          <fieldset className="field">
            <legend>Key takeaways <span className="field__opt">shown on longer articles</span></legend>
            {takeaways.map((t, i) => <input key={i} aria-label={`Takeaway ${i + 1}`} value={t} placeholder={`Takeaway ${i + 1}`}
              onChange={e => { const next = [...takeaways]; next[i] = e.target.value; touch(setTakeaways)(next); }} />)}
          </fieldset>

          <fieldset className="field">
            <legend>Cover</legend>
            <div className="ed__covers">
              {Object.entries(covers).map(([name, svg]) => (
                <label key={name} className={`ed__cover${!image && cover === name ? ' is-on' : ''}`} title={name}>
                  <input type="radio" name="cover" className="sr" checked={!image && cover === name} onChange={() => { setImage(''); touch(setCover)(name); }} />
                  <span className={`pcover pcover--${name}${section === 'ai' ? ' pcover--dark' : ''}`} dangerouslySetInnerHTML={{ __html: svg }} />
                </label>
              ))}
              <label className={`ed__cover ed__cover--upload${image ? ' is-on' : ''}`}>
                <input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="sr"
                  onChange={e => upload(e.target.files?.[0], u => { setImage(u); setDirty(true); })} />
                {image ? <img src={image} alt="" /> : <span>{busy === 'upload' ? 'Uploading…' : 'Upload a photo'}</span>}
              </label>
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="ed-body">Article <span className="field__opt">{format === 'md' ? 'Markdown' : 'HTML (written in code)'} · {words} words · {Math.max(1, Math.round(words / 230))} min read</span></label>
            {format === 'md' ? (
              <div className="ed__tools" role="toolbar" aria-label="Formatting">
                <button type="button" onClick={() => block('## Heading')}>Heading</button>
                <button type="button" onClick={() => wrap('**', '**', 'bold text')}><b>B</b></button>
                <button type="button" onClick={() => wrap('*', '*', 'italic text')}><i>I</i></button>
                <button type="button" onClick={() => wrap('[', '](https://)', 'link text')}>Link</button>
                <button type="button" onClick={() => block('- First point\n- Second point')}>List</button>
                <button type="button" onClick={() => block('> A quote')}>Quote</button>
                <button type="button" onClick={() => block(':::note\nA short tip or aside.\n:::')}>Tip box</button>
                <button type="button" onClick={() => block(':::compare Before | After\nWhat people see today.\n---\nWhat they would see instead.\n:::')}>Before / after</button>
                <label className="ed__tool-file">Image<input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="sr"
                  onChange={e => upload(e.target.files?.[0], u => block(`![Describe the image](${u})`))} /></label>
              </div>
            ) : <p className="field__hint">This article was written in HTML. Edit carefully; the preview shows the result.</p>}
            <textarea id="ed-body" ref={ta} className="ed__body" value={body} onChange={e => touch(setBody)(e.target.value)} spellCheck />
          </div>
          <div className="field">
            <label htmlFor="ed-seo">Title for search engines <span className="field__opt">optional · {seoTitle.length}/60</span></label>
            <input id="ed-seo" value={seoTitle} maxLength={70} onChange={e => touch(setSeoTitle)(e.target.value)} placeholder="Only if the title is longer than about 60 characters" />
          </div>
        </form>

        <div className={`ed__preview article${section === 'ai' ? ' article--dark' : ''}`} aria-label="Preview">
          <p className="label">Preview</p>
          <h1 className="article__title">{title || 'Your title'}</h1>
          <p className="article__dek">{excerpt || 'Your summary appears here.'}</p>
          <div className="cover" aria-hidden="true">
            {image ? <span className="pcover"><img src={image} alt="" /></span>
              : <span className={`pcover pcover--${cover}${section === 'ai' ? ' pcover--dark' : ''}`} dangerouslySetInnerHTML={{ __html: covers[cover] || '' }} />}
          </div>
          <div className="article__body" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}
