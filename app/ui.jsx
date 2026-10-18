/* SkillMitra — primitives, store, router helpers */
import React, { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } from 'react';
import * as lucide from 'lucide';
if (typeof window !== 'undefined') {
  if (!window.React) window.React = React;
  if (!window.lucide) window.lucide = lucide;
}
const D = window.SM_DATA;

/* ---------------- Icons (Lucide) ---------------- */
function pascal(n){ return n.split('-').map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(''); }
function Icon({ name, size, className, style, strokeWidth=2 }){
  const lib = (window.lucide && (window.lucide.icons || window.lucide)) || {};
  let node = lib[pascal(name)];
  if (node && node[0] === 'svg') node = node[2];
  const kids = (node || []).map(([tag, attrs], i) => React.createElement(tag, { key:i, ...attrs }));
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size||24} height={size||24} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true">{kids}</svg>
  );
}

/* ---------------- Logo ---------------- */
function LogoMark({ size=30 }){
  // Abstract: a learner (dot) at the start of an ascending stepped path.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#2448D8"/>
      <circle cx="10" cy="10.5" r="3.2" fill="#fff"/>
      <path d="M7 24.5h6.5v-5H19v-5h6" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="25" cy="14.5" r="2.4" fill="#5FD39C"/>
    </svg>
  );
}
function Logo({ size=30, onClick }){
  return (
    <a className="logo" href="#/" onClick={onClick} aria-label="SkillMitra home">
      <LogoMark size={size}/><span className="t">Skill<b>Mitra</b></span>
    </a>
  );
}

/* ---------------- Router ---------------- */
function useRoute(){
  const get = () => (location.hash.replace(/^#/, '') || '/');
  const [path, setPath] = useState(get());
  useEffect(()=>{
    const on = () => { setPath(get()); window.scrollTo(0,0); };
    addEventListener('hashchange', on); return () => removeEventListener('hashchange', on);
  },[]);
  return path;
}
function go(to){ if (location.hash !== '#'+to) location.hash = to; else window.scrollTo(0,0); }
function A({ to, children, className, ...rest }){
  return <a href={'#'+to} className={className} {...rest}>{children}</a>;
}

/* ---------------- Store ---------------- */
const STORE_KEY = 'skillmitra.v1';
const THEME_KEY = 'skillmitra.theme';

function getInitialTheme(){
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch(e){}
  return 'light';
}

function applyTheme(theme){
  try {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  } catch(e){}
}

// Initial application
if (typeof document !== 'undefined') {
  applyTheme(getInitialTheme());
}

const defaultState = {
  auth: null,            // null | 'student' | 'institution' | 'industry'
  onboarded: true,       // demo student is already onboarded
  goal: 'data-analyst',
  profile: { ...D.student },
  sqlLevel: 1,           // Beginner → becomes 2 after validation
  assessment: null,      // {score, answers}
  resourceProgress: {},  // id -> %
  project: { status:'not-started', done:[] }, // in-progress | submitted
  readinessBefore: 42,
  asked: [],
};
function loadState(){
  try { const s = JSON.parse(localStorage.getItem(STORE_KEY)); return s ? { ...defaultState, ...s } : defaultState; }
  catch(e){ return defaultState; }
}
const StoreCtx = createContext(null);
function StoreProvider({ children }){
  const [state, setState] = useState(loadState);
  const [theme, setTheme] = useState(getInitialTheme);
  const [toast, setToast] = useState(null);

  useEffect(()=>{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }, [state]);
  useEffect(()=>{ applyTheme(theme); }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  }, []);

  const update = useCallback((patch) => setState(s => ({ ...s, ...(typeof patch==='function'? patch(s) : patch) })), []);
  const notify = useCallback((msg) => { setToast(msg); clearTimeout(window.__smt); window.__smt = setTimeout(()=>setToast(null), 2800); }, []);
  const reset = useCallback(() => { setState({ ...defaultState }); }, []);
  const derived = useMemo(()=>derive(state), [state]);
  return (
    <StoreCtx.Provider value={{ state, update, notify, reset, theme, toggleTheme, ...derived }}>
      {children}
      {toast && <div className="toast" role="status"><Icon name="check-circle-2"/>{toast}</div>}
    </StoreCtx.Provider>
  );
}
function useStore(){ return useContext(StoreCtx); }

/* Derived, deterministic metrics from state */
function derive(state){
  const role = D.roles[state.goal] || D.roles['data-analyst'];
  const levels = { ...D.baseLevels, SQL: state.sqlLevel };
  const sqlValidated = state.sqlLevel >= 2;
  const projectDone = state.project.status === 'submitted';

  const gaps = role.required.map(r => {
    const cur = levels[r.skill] ?? 0;
    const diff = Math.max(0, r.level - cur);
    const gap = diff === 0 ? 'None' : diff === 1 ? 'Medium' : 'High';
    const action = diff === 0 ? 'Maintain' : cur === 0 ? 'Start' : 'Learn';
    const status = diff === 0 ? 'strong' : cur === 0 ? 'missing' : 'developing';
    return { ...r, cur, diff, gap, action, status };
  });

  const comp = {
    skills: sqlValidated ? 80 : 72,
    learning: sqlValidated ? 70 : 65,
    projects: projectDone ? 76 : 60,
    assessments: sqlValidated ? 84 : 80,
  };
  const readiness = Math.round(comp.skills*.3 + comp.learning*.3 + comp.projects*.25 + comp.assessments*.15);

  // roadmap step progress
  const rp = state.resourceProgress;
  const sqlItems = D.resources.sql.items;
  const sqlRes = Math.round(sqlItems.reduce((a,i)=>a + (rp[i.id] ?? i.progress), 0) / sqlItems.length);
  const steps = D.roadmap.map(s => {
    let progress = s.baseProgress, status = 'Not Started';
    if (s.id === 'sql'){ progress = sqlValidated ? 100 : Math.max(45, sqlRes); status = sqlValidated ? 'Completed' : 'In Progress'; }
    if (s.id === 'statistics' && sqlValidated){ status = 'Up Next'; }
    if (s.id === 'project'){
      const pd = state.project.done.length;
      progress = projectDone ? 100 : Math.round(pd/5*100);
      status = projectDone ? 'Completed' : state.project.status === 'in-progress' ? 'In Progress' : 'Not Started';
    }
    if (s.id === 'final'){ status = 'Locked'; }
    return { ...s, progress, status };
  });
  const learningProgress = 64 + (sqlValidated ? 6 : 0) + (projectDone ? 6 : 0);
  const current = steps.find(s => s.status === 'In Progress' && s.id==='sql') || steps.find(s=>s.status==='Up Next') || steps[1];
  const next = steps[steps.indexOf(current)+1] || steps[2];

  const nextAction = !sqlValidated
    ? { title:'Complete SQL Fundamentals', sub:`Lesson 9 of 24 · ${100-Math.max(45,sqlRes)}% left`, to:'/learning/sql', cta:'Continue Learning' }
    : !projectDone
      ? { title:'Start Student Performance Analytics', sub:'Apply your validated SQL skills', to:'/projects/student-performance-analytics', cta:'Open Project' }
      : { title:'Begin Statistics for Data Analysis', sub:'Next step on your roadmap', to:'/learning/statistics', cta:'Continue Learning' };

  return { role, levels, gaps, comp, readiness, steps, learningProgress, current, next, sqlValidated, projectDone, nextAction, sqlRes };
}

/* ---------------- Visual primitives ---------------- */
function useMounted(delay=60){ const [m,setM]=useState(false); useEffect(()=>{ const t=setTimeout(()=>setM(true),delay); return ()=>clearTimeout(t); },[]); return m; }

function Ring({ value, size=132, stroke=10, color='var(--blue)', track, label, sub, children }){
  const m = useMounted();
  const r = (size - stroke)/2, c = 2*Math.PI*r;
  const off = c * (1 - (m ? value : 0)/100);
  return (
    <div style={{ position:'relative', width:size, height:size, flexShrink:0 }} role="img" aria-label={`${label||'Progress'} ${value}%`}>
      <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} strokeWidth={stroke} fill="none" className="ring-track" style={track?{stroke:track}:null}/>
        <circle cx={size/2} cy={size/2} r={r} strokeWidth={stroke} fill="none" stroke={color} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off} className="ring-val"/>
      </svg>
      <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center', textAlign:'center' }}>
        {children || <div>
          <div className="num" style={{ fontSize:size*.24, fontWeight:800, letterSpacing:'-.04em', lineHeight:1 }}>{value}<span style={{ fontSize:size*.12, fontWeight:700, color:'var(--ink-3)' }}>%</span></div>
          {sub && <div className="faint" style={{ fontSize:11.5, fontWeight:600, marginTop:4 }}>{sub}</div>}
        </div>}
      </div>
    </div>
  );
}
function Bar({ value, tone, size, style }){
  const m = useMounted();
  return <div className={`bar ${tone||''} ${size==='sm'?'bar-sm':''}`} style={style} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"><i style={{ width:(m?value:0)+'%' }}/></div>;
}
const STATUS = {
  strong:     { label:'Strong', cls:'chip-green', icon:'check' },
  developing: { label:'Needs Improvement', cls:'chip-amber', icon:'alert-triangle' },
  missing:    { label:'Missing', cls:'chip-red', icon:'x' },
};
function StatusChip({ status, label }){
  const s = STATUS[status];
  return <span className={`chip ${s.cls}`}><Icon name={s.icon}/>{label || s.label}</span>;
}
function StatusDot({ status, size=22 }){
  const s = STATUS[status];
  const bg = { strong:'var(--green-50)', developing:'var(--amber-50)', missing:'var(--red-50)' }[status];
  const fg = { strong:'var(--green)', developing:'var(--amber)', missing:'var(--red)' }[status];
  return <span style={{ width:size, height:size, borderRadius:6, background:bg, color:fg, display:'grid', placeItems:'center', flexShrink:0 }}><Icon name={s.icon} size={size*.6} strokeWidth={2.6}/></span>;
}
function LevelPips({ level, max=3, tone='blue', target }){
  return (
    <span style={{ display:'inline-flex', gap:3 }} aria-label={`${D.LEVELS[level]}`}>
      {Array.from({length:max}).map((_,i)=>{
        const on = i < level, tgt = target!=null && i < target && !on;
        return <i key={i} style={{ width:18, height:6, borderRadius:2,
          background: on ? (tone==='green'?'var(--green)':tone==='amber'?'#D9921F':'var(--blue)') : 'var(--line-2)',
          outline: tgt ? '1px dashed var(--ink-3)' : 'none', outlineOffset:-1 }}/>;
      })}
    </span>
  );
}
function Crumbs({ items }){
  return <nav className="crumbs" aria-label="Breadcrumb">{items.map((it,i)=>(
    <React.Fragment key={i}>{i>0 && <Icon name="chevron-right"/>}{it.to ? <A to={it.to}>{it.label}</A> : <span style={{color:'var(--ink-2)'}}>{it.label}</span>}</React.Fragment>
  ))}</nav>;
}
function PageHead({ crumbs, title, sub, right, eyebrow }){
  return (
    <div className="page-head">
      <div>
        {crumbs && <Crumbs items={crumbs}/>}
        {eyebrow && <div className="eyebrow" style={{ marginBottom:8 }}>{eyebrow}</div>}
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {right && <div className="row" style={{ flexWrap:'wrap' }}>{right}</div>}
    </div>
  );
}
function diffChip(d){
  const m = { Beginner:'chip-green', Intermediate:'chip-blue', Advanced:'chip-amber' };
  return <span className={`chip ${m[d]||'chip-gray'}`}>{d}</span>;
}

Object.assign(window, { Icon, Logo, LogoMark, useRoute, go, A, StoreProvider, useStore, Ring, Bar, StatusChip, StatusDot, LevelPips, Crumbs, PageHead, diffChip, useMounted, STATUS, D });
