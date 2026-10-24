# Intelligent Multi-Agent Mobile Manipulation · ICRA 2027 workshop site

A one-page static site: plain HTML, CSS and a little JavaScript. There is no build step and nothing to install.

```
index.html            page structure and all prose (scope, questions, call, roadmap, participation)
assets/js/data.js     speakers, organizers, schedule, dates, venue, contact  ← most edits happen here
assets/js/main.js     renders data.js, nav, theme toggle (no need to touch)
assets/css/style.css  design tokens at the top (colors, type), then components
assets/img/           favicon.svg, og-card.png (1200×630 share preview)
media/people/         square headshots, <first>-<last>.jpg, at least 400 px
```

## Preview locally

```bash
cd "website/ICRA 2027 multi robot web"
python3 -m http.server 8027
# open http://localhost:8027
```

## Common updates

- **Talk title, speaker photo, homepage**: edit the speaker's line in `assets/js/data.js` (`talk`, `photo`, `url`). A speaker without a photo shows initials.
- **Speaker confirmed**: change `status: "tentative"` to `"confirmed"`.
- **Dates**: replace `"TBA"` in `dates`, and set `workshopDate` once ICRA assigns the day.
- **Submission portal opens**: set `submitUrl`; the grey button becomes a live "Submit a contribution" link.
- **Assigning speakers to sessions**: change `detail: "Three talks"` in `schedule` to the three names.
- **After acceptance**: delete the `<span class="pill">Proposal stage</span>` in `index.html` (search for "Proposal-stage marker").
- **After the workshop**: add the roadmap, slides and recordings as a new section in `index.html` (copy the markup of any `<section class="section">`).

## Deploy (GitHub Pages)

Repo: https://github.com/lguanrui/ICRA-2027-multi-robot-mobile-manipulation-workshop (branch `main`). `main_proposal.pdf` is listed in `.gitignore` so the proposal is never published.

1. Repo Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
2. The site then lives at https://lguanrui.github.io/ICRA-2027-multi-robot-mobile-manipulation-workshop/ and every push to `main` redeploys it within a minute or two.
3. Optional custom domain: add a `CNAME` file with the domain, point a DNS CNAME record at `lguanrui.github.io`, and update the `og:url` / `og:image` tags in `index.html` to the new address.
