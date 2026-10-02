# behavitor.com (Next.js)

The Behavitor studio site: Next.js 16 (App Router), hosted on Vercel.
Forms send through **Resend**, posts written in the editor are stored in **Vercel Blob**, and AI news refreshes daily with **Vercel Cron**.

```
npm install
npm run dev        # http://localhost:3000 (copy .env.example to .env.local first)
npm run build      # production build, as Vercel runs it
```

## Go live: step by step

**1. Put the code on GitHub** (create an empty *private* repository called `behavitor-web` on github.com first, without a README)

```
git remote add origin https://github.com/YOUR-ACCOUNT/behavitor-web.git
git push -u origin main
```

**2. Import it into Vercel**: vercel.com → Add New → Project → pick the repository. Vercel detects Next.js; keep the defaults and deploy.

**3. Blob storage (posts, images, news)**: in the Vercel project → Storage → Create → Blob → choose **Private**, then connect it to the project. This adds `BLOB_READ_WRITE_TOKEN` automatically.

**4. Resend (forms)**
1. Create an account at resend.com and add your domain `behavitor.com` (Domains → Add). Copy the DNS records it shows into your domain registrar, and wait for "Verified".
2. Create an API key (API Keys → Create, "Sending access").
3. Optional, for the newsletter: Audience → create a segment and copy its ID.

**5. Environment variables** (Vercel project → Settings → Environment Variables), then **Redeploy**:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | the key from step 4 |
| `CONTACT_FROM` | `Behavitor <forms@behavitor.com>` (any address on the verified domain) |
| `CONTACT_TO` | `hello@behavitor.com` (where inquiries arrive) |
| `RESEND_SEGMENT_ID` | optional: the newsletter segment |
| `ADMIN_PASSWORD` | a long password for the editor (a password manager can make one) |
| `SESSION_SECRET` | 64 random characters, e.g. run `openssl rand -hex 32` in Terminal |
| `CRON_SECRET` | any long random text; Vercel uses it to call the daily news job |

**6. Domain**: Vercel project → Settings → Domains → add `behavitor.com` (and `www.behavitor.com`, set to redirect). Copy the DNS records into your registrar.

**7. First news refresh**: Vercel project → Settings → Cron Jobs → "Run" next to `/api/cron/news/`. After that it runs every day at 06:00 UTC.

**8. Check**: send yourself a test inquiry from /contact/, sign in at /admin/, and publish a test post.

Until Resend is set up, forms open the visitor's email app instead, so no inquiry is lost. Until Blob is connected, the editor can be opened but not saved, and the site shows the posts and headlines bundled in the code.

## Writing posts: the editor at /admin/

Sign in with `ADMIN_PASSWORD`. You can:
- **Write a new post** in Markdown with a live preview. The toolbar adds headings, lists, links, tip boxes, before/after boxes and images.
- **Choose a cover**: one of the 19 drawings, or upload a photo (JPG, PNG, WebP, AVIF or GIF, up to 4 MB).
- **Save a draft** (only you can see it), **Publish**, **Update**, **Unpublish** or **Delete**. Published changes appear on the site within seconds; no redeploy needed.
- **Edit the posts that came with the site**. Saving one stores a copy in Blob that replaces the original; deleting one hides it.

Markdown quick guide: `## Heading`, `**bold**`, `*italic*`, `[link](https://…)`, `- list item`, `> quote`, and two site blocks:

```
:::note
A short tip, shown in a box.
:::

:::compare Before | After
What people see today.
---
What they would see instead.
:::
```

Sessions last 12 hours. Wrong passwords are slowed down. The editor is never indexed by search engines.

## Where things live

| Path | What it holds |
|---|---|
| `content/data.js` | Site settings, services, concept projects, the 12 behavior laws, About, testimonials |
| `content/posts.js`, `content/ai-posts.js` | The articles that came with the site (the editor can override them) |
| `content/sample-audit.js`, `content/terms.js` | The sample audit report and the terms of engagement (a draft until `published: true`) |
| `content/art/` | The drawings: law diagrams, post covers, concept before/after |
| `app/(site)/` | The public pages |
| `app/admin/` | The editor |
| `app/api/` | Forms (`contact`, `newsletter`), the news job (`cron/news`), share images (`og`), uploads |
| `components/` | Shared pieces; `components/client/` are the interactive ones (dial, search, forms, checklist) |
| `lib/` | Posts (Blob + seed), news, email, search, login, Markdown |
| `app/globals.css` | All styles |

Settings in `content/data.js` (`site`): `auditPrice`, `foundingOffer`, `bookingUrl`, `analytics.plausibleDomain`, `social`. Each feature appears only once its setting is filled in.

## Good to know

- **Share images**: pages with a PNG in `public/og/` (listed in `content/og-list.json`) use it; new posts get one drawn automatically.
- **Security**: strict headers in `next.config.ts` (no framing, HTTPS only, limited sources). The editor is protected twice: by `proxy.ts` and inside every save action.
- **Analytics events** (with Plausible): Audit click, Contact click, Booking click, Checklist click, Dial used, Inquiry sent, Inquiry details added, Inquiry email app opened, Newsletter signup, Checklist printed/completed, Checklist notes requested, Search result, Search no results.
- **Yearly**: update the `Expires` date in `public/.well-known/security.txt`.
- **AI news** leaves out politics, government, regulation, legal and military stories on purpose (the `OFF_TOPIC` list in `lib/news.ts`).
