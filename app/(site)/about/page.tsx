import { Label, PageHead, Principles, StartModule } from '@/components/ui';
import { about, principles } from '@/lib/site';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta({ path: '/about/', title: 'About', description: about.lead, noindex: !about.published });

type Person = { name: string; role: string; bio: string; photo?: string };
const initials = (n: string) => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

export default function About() {
  const team = about.team as Person[];
  return (
    <>
      <PageHead kicker="About" title={about.title} lead={about.lead} />
      <section className="block block--tight">
        <div className="about">
          <div className="about__story">{about.story.map(p => <p key={p.slice(0, 24)}>{p}</p>)}</div>
          <dl className="specstrip about__facts">{about.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </div>
      </section>
      {team.length ? (
        <section className="block">
          <div className="chead"><Label>People</Label><h2>Who you’ll work with.</h2></div>
          <div className="team">
            {team.map(t => (
              <article className="person" key={t.name}>
                <span className="person__photo">{t.photo ? <img src={t.photo} alt={t.name} loading="lazy" decoding="async" /> : <span aria-hidden="true">{initials(t.name)}</span>}</span>
                <h3>{t.name}</h3><p className="person__role">{t.role}</p><p className="person__bio">{t.bio}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      <section className="block">
        <div className="chead"><Label>How we work</Label><h2>Good design, applied to the web.</h2></div>
        <Principles list={principles} />
      </section>
      <StartModule />
    </>
  );
}
