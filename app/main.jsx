import React from 'react';
import ReactDOM from 'react-dom/client';
import * as lucide from 'lucide';

window.React = React;
window.ReactDOM = ReactDOM;
window.lucide = lucide;

import './styles.css';
import './data.js';
import './ui.jsx';
import './shell.jsx';
import './public.jsx';
import './student1.jsx';
import './student2.jsx';
import './partners.jsx';

function parse(full) {
  const [p, qs = ''] = full.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  return { p: p.replace(/\/+$/, '') || '/', query };
}

function App() {
  const {
    useRoute,
    useStore,
    go,
    Landing,
    Login,
    Switch,
    Onboarding,
    AppShell,
    Institution,
    Industry,
    Dashboard,
    Analysis,
    SkillGaps,
    Resources,
    Roadmap,
    ProjectDetail,
    Projects,
    Assessment,
    CareerReadiness,
    IndustrySkills,
    Profile,
    NotFound,
  } = window;

  const full = useRoute();
  const { state } = useStore();
  const { p, query } = parse(full);

  // public routes
  if (p === '/') return <Landing />;
  if (p === '/login') return <Login variant="student" />;
  if (p === '/institution-login') return <Login variant="institution" />;
  if (p === '/industry-login') return <Login variant="industry" />;
  if (p === '/switch') return <Switch />;
  if (p === '/onboarding') {
    if (!state.auth) {
      setTimeout(() => go('/login'));
      return null;
    }
    return <Onboarding />;
  }

  // partner workspaces
  if (p.startsWith('/institution')) {
    if (state.auth !== 'institution') return <Login variant="institution" />;
    return <AppShell path={p} mode="institution"><Institution /></AppShell>;
  }
  if (p.startsWith('/industry') && !p.startsWith('/industry-skills')) {
    if (state.auth !== 'industry') return <Login variant="industry" />;
    return <AppShell path={p} mode="industry"><Industry /></AppShell>;
  }

  // student app — guard
  if (state.auth !== 'student') return <Login variant="student" />;

  let page;
  const seg = p.split('/').filter(Boolean);
  switch (seg[0]) {
    case 'dashboard': page = <Dashboard />; break;
    case 'analysis': page = <Analysis query={query} />; break;
    case 'skill-gaps': page = <SkillGaps />; break;
    case 'learning':
    case 'roadmap': page = seg[1] ? <Resources topic={seg[1]} /> : <Roadmap />; break;
    case 'projects': page = seg[1] ? <ProjectDetail id={seg[1]} /> : <Projects />; break;
    case 'assessment': page = <Assessment />; break;
    case 'career-readiness': page = <CareerReadiness />; break;
    case 'industry-skills': page = <IndustrySkills />; break;
    case 'profile': page = <Profile tab="profile" />; break;
    case 'settings': page = <Profile tab="settings" />; break;
    case 'ask':
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('sm:ask'));
        go('/dashboard');
      });
      page = <Dashboard />;
      break;
    default: page = <NotFound />;
  }
  return <AppShell path={full}>{page}</AppShell>;
}

const rootEl = document.getElementById('root');
if (rootEl) {
  const { StoreProvider } = window;
  ReactDOM.createRoot(rootEl).render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );
}
