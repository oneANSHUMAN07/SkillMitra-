# SkillMitra

### Your personalized learning guide

SkillMitra is a learning and career-readiness platform prototype that helps students identify skill gaps, follow role-focused learning roadmaps, practice through projects, and track progress toward their career goals.

**[Open the live website](https://skillmitra.xyz)** · **[Open the original demo](https://skillmitra-learning-hub.netlify.app/)** · **[View the GitHub repository](https://github.com/oneANSHUMAN07/SkillMitra)**

> SkillMitra is a hackathon prototype. Student and partner dashboards use curated demo data, and progress is saved in the browser. Live YouTube search is available for SQL learning when the Netlify environment variable is configured.

## Preview

### Landing page

![SkillMitra landing page](screenshots/multi_muqt76sf-flwu/01.jpg)
## What you can explore

- **Student dashboard:** Career-readiness score, skill overview, learning progress, and suggested next steps.
- **Skill analysis and gaps:** Compare a learner's current profile with the skills associated with a target role.
- **Personalized roadmap:** Explore learning paths for Data Analyst and other career goals, with courses, videos, and practice.
- **Course catalog:** Explore learning opportunities and discover resources relevant to career goals.
- **Learning progress tracking:** Review learning progress and see the skills that still need improvement.
- **Projects and assessments:** Work through sample projects and assessments that demonstrate the validation flow.
- **Career readiness:** See progress toward the selected role and the skills still to build.
- **Institution and industry views:** Preview cohort insights and industry role requirements.
- **Ask SkillMitra:** Try the in-app learning assistant panel.
- **Live SQL videos:** Fetch current public YouTube videos through a Netlify Function when configured.
- **Custom domain:** Access the platform through [skillmitra.xyz](https://skillmitra.xyz).

## Try the demo

Open the [SkillMitra website](https://skillmitra.xyz) or the [original demo](https://skillmitra-learning-hub.netlify.app/) and choose a demo workspace from the login screen. No account is needed to explore the prototype.

## Run locally

The frontend is served from the repository root. React, Babel, and Lucide are loaded from CDNs; there is no frontend build step. Netlify CLI serves the site and its serverless function together.

1. Install [Node.js](https://nodejs.org/) and the Netlify CLI:

   ```bash
   npm install --global netlify-cli
   ```

2. Clone the repository and enter the project folder:

   ```bash
   git clone https://github.com/oneANSHUMAN07/SkillMitra.git
   cd SkillMitra
   ```

3. Sign in to Netlify CLI and link the folder to the Netlify site if prompted:

   ```bash
   netlify login
   netlify link
   ```

4. Start the local site:

   ```bash
   netlify dev
   ```

   Netlify CLI prints the local URL when the site is ready. The main prototype can be explored without an API key; live SQL video search needs the setup below.

## Configure live YouTube search

The SQL learning page calls `/.netlify/functions/youtube-search`. The function reads `YOUTUBE_API_KEY` on the server and never needs the key in browser code.

1. Enable **YouTube Data API v3** in Google Cloud and create a restricted API key.
2. For local development, put the key in a root `.env` file (already ignored by Git):

   ```env
   YOUTUBE_API_KEY=your_restricted_api_key
   ```

3. For the deployed site, add `YOUTUBE_API_KEY` under the site's **Netlify environment variables**, then redeploy.

Never commit `.env` or put the key in frontend code. Restrict the key to YouTube Data API v3. If a key has ever been committed or shared, revoke it and create a new one.

## Deploy to Netlify

Connect this GitHub repository to Netlify. The included [`netlify.toml`](netlify.toml) publishes the repository root and points Netlify to `netlify/functions`; no build command is required. Add `YOUTUBE_API_KEY` in Netlify's environment variables to enable live SQL video search.

The custom domain [skillmitra.xyz](https://skillmitra.xyz) is configured for the deployed website. DNS and HTTPS availability may depend on successful domain verification and certificate provisioning.

## Project structure

```text
.
├── app/                 # React UI, pages, styles, and demo data
├── assets/img/          # Image assets
├── netlify/functions/   # Server-side YouTube search function
├── screenshots/         # Project previews
├── index.html           # Frontend entry point
└── netlify.toml         # Netlify publish and function settings
```

## Built with

- React 18 and JavaScript
- CSS
- Netlify Functions
- YouTube Data API v3
- GitHub and Netlify deployment

---

**SkillMitra — Learn, grow, and prepare for your career.**
