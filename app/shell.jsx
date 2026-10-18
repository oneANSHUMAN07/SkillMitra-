/* SkillMitra — app shell, top bar, Ask SkillMitra panel */
import React, { useState, useEffect, useRef } from 'react';

const STUDENT_NAV = [
  { to:'/dashboard', label:'Dashboard', icon:'layout-dashboard' },
  { to:'/learning', label:'My Learning', icon:'route', match:['/learning','/roadmap'] },
  { to:'/skill-gaps', label:'Skill Gaps', icon:'target', match:['/skill-gaps','/analysis'] },
  { to:'/projects', label:'Projects', icon:'folder-kanban' },
  { to:'/assessment', label:'Assessments', icon:'clipboard-check' },
  { to:'/career-readiness', label:'Career Readiness', icon:'gauge' },
  { to:'/industry-skills', label:'Industry Skills', icon:'briefcase' },
];
const INST_NAV = [
  { to:'/institution', label:'Learning Insights', icon:'line-chart' },
  { to:'/institution/cohorts', label:'Cohorts', icon:'users', soon:true },
];
const IND_NAV = [
  { to:'/industry', label:'Role Requirements', icon:'briefcase' },
];

const SEARCH_INDEX = [
  { l:'Dashboard', to:'/dashboard', i:'layout-dashboard' },
  { l:'Skill Analysis', to:'/analysis', i:'scan-search' },
  { l:'Skill Gaps', to:'/skill-gaps', i:'target' },
  { l:'Learning Roadmap', to:'/learning', i:'route' },
  { l:'SQL Fundamentals', to:'/learning/sql', i:'database' },
  { l:'Python for Analytics', to:'/learning/python', i:'code' },
  { l:'Excel Analytics', to:'/learning/excel', i:'file-spreadsheet' },
  { l:'Statistics for Data Analysis', to:'/learning/statistics', i:'sigma' },
  { l:'Power BI', to:'/learning/powerbi', i:'bar-chart-3' },
  { l:'Machine Learning Foundations', to:'/learning/machine-learning', i:'cpu' },
  { l:'Git & GitHub', to:'/learning/git', i:'git-branch' },
  { l:'Projects', to:'/projects', i:'folder-kanban' },
  { l:'Student Performance Analytics', to:'/projects/student-performance-analytics', i:'folder-open' },
  { l:'Sales Dashboard', to:'/projects/sales-dashboard', i:'folder-open' },
  { l:'Customer Analytics', to:'/projects/customer-analytics', i:'folder-open' },
  { l:'SQL Assessment', to:'/assessment', i:'clipboard-check' },
  { l:'Career Readiness', to:'/career-readiness', i:'gauge' },
  { l:'Industry Skill Requirements', to:'/industry-skills', i:'briefcase' },
  { l:'Profile & Settings', to:'/profile', i:'user-round' },
];

function isOn(item, path){
  const ms = item.match || [item.to];
  return ms.some(m => path === m || path.startsWith(m + '/'));
}

function Sidebar({ path, mode, expanded, onNav }){
  const { readiness, role } = useStore();
  const nav = mode === 'institution' ? INST_NAV : mode === 'industry' ? IND_NAV : STUDENT_NAV;
  return (
    <aside id="primary-sidebar" className="side" aria-label="Primary">
      <Logo/>
      <div className="side-group">{mode==='institution'?'Institution':mode==='industry'?'Industry Partner':'Learn'}</div>
      <nav>
        {nav.map(n => (
          <button key={n.to} className={`nav-item ${isOn(n,path)?'on':''}`} onClick={()=>{ n.soon ? null : go(n.to); onNav&&onNav(); }} title={n.label} aria-current={isOn(n,path)?'page':undefined} disabled={n.soon} style={n.soon?{opacity:.55,cursor:'default'}:null}>
            <Icon name={n.icon}/><span className="lbl">{n.label}</span>
            {n.to==='/skill-gaps' && <span className="count">3</span>}
            {n.soon && <span className="count" style={{background:'var(--line-2)',color:'var(--ink-3)'}}>Soon</span>}
          </button>
        ))}
      </nav>
      {mode==='student' && (
        <div className="side-card" style={{ marginTop:18 }}>
          <div className="eyebrow">Target</div>
          <div style={{ fontWeight:700, margin:'4px 0 10px' }}>{role.title}</div>
          <div className="between" style={{ fontSize:12.5, marginBottom:6 }}><span className="muted">Readiness</span><b className="num">{readiness}%</b></div>
          <Bar value={readiness} tone="green" size="sm"/>
        </div>
      )}
      <div className="side-foot">
        {mode==='student' && <>
          <button className={`nav-item ${path==='/ask'?'on':''}`} onClick={()=>{ window.dispatchEvent(new CustomEvent('sm:ask')); onNav&&onNav(); }} title="Ask SkillMitra"><Icon name="message-square-text"/><span className="lbl">Ask SkillMitra</span></button>
          <button className={`nav-item ${path==='/profile'?'on':''}`} onClick={()=>{ go('/profile'); onNav&&onNav(); }} title="Profile"><Icon name="user-round"/><span className="lbl">Profile</span></button>
          <button className={`nav-item ${path==='/settings'?'on':''}`} onClick={()=>{ go('/settings'); onNav&&onNav(); }} title="Settings"><Icon name="settings"/><span className="lbl">Settings</span></button>
        </>}
        <button className="nav-item" onClick={()=>go('/switch')} title="Switch workspace"><Icon name="repeat-2"/><span className="lbl">Switch workspace</span></button>
      </div>
    </aside>
  );
}

function SearchBox(){
  const [q, setQ] = useState(''); const [open, setOpen] = useState(false); const [hl, setHl] = useState(0);
  const ref = useRef();
  const res = q ? SEARCH_INDEX.filter(s => s.l.toLowerCase().includes(q.toLowerCase())).slice(0,6) : SEARCH_INDEX.slice(0,5);
  useEffect(()=>{
    const k = e => { if ((e.metaKey||e.ctrlKey) && e.key==='k'){ e.preventDefault(); ref.current && ref.current.focus(); } };
    addEventListener('keydown', k); return ()=>removeEventListener('keydown', k);
  },[]);
  const pick = r => { go(r.to); setQ(''); setOpen(false); ref.current.blur(); };
  return (
    <div className="search">
      <Icon name="search"/>
      <input ref={ref} value={q} placeholder="Search skills, courses, projects…" aria-label="Search"
        onChange={e=>{setQ(e.target.value); setHl(0);}} onFocus={()=>setOpen(true)} onBlur={()=>setTimeout(()=>setOpen(false),150)}
        onKeyDown={e=>{ if(e.key==='ArrowDown'){setHl(h=>Math.min(h+1,res.length-1));e.preventDefault();} if(e.key==='ArrowUp'){setHl(h=>Math.max(h-1,0));e.preventDefault();} if(e.key==='Enter'&&res[hl]) pick(res[hl]); if(e.key==='Escape') ref.current.blur(); }}/>
      <kbd>⌘K</kbd>
      {open && (
        <div className="search-results">
          {!q && <div className="eyebrow" style={{ padding:'6px 10px' }}>Jump to</div>}
          {res.length ? res.map((r,i)=>(
            <button key={r.to} className={i===hl?'hl':''} onMouseDown={()=>pick(r)}><Icon name={r.i}/>{r.l}</button>
          )) : <div className="faint" style={{ padding:'14px 10px', fontSize:13 }}>No results for “{q}”. Try “SQL” or “projects”.</div>}
        </div>
      )}
    </div>
  );
}

function TopBar({ mode, onMenu, expanded }){
  const { state, update, reset, theme, toggleTheme } = useStore();
  const [pop, setPop] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{ const s=()=>setScrolled(scrollY>4); addEventListener('scroll',s); return ()=>removeEventListener('scroll',s); },[]);
  useEffect(()=>{ const c=e=>{ if(!e.target.closest('[data-pop]')) setPop(null); }; addEventListener('mousedown',c); return ()=>removeEventListener('mousedown',c); },[]);
  const who = mode==='institution' ? { n:'Dr. Meera Iyer', s:'Placement & Training', i:'MI' }
    : mode==='industry' ? { n:'Rahul Khanna', s:'Northwind Analytics', i:'RK' }
    : { n:state.profile.name, s:'B.Tech CSE · Sem '+state.profile.semester, i:state.profile.initials || 'AM' };
  return (
    <header className={`top ${scrolled?'scrolled':''}`}>
      <button className="iconbtn menu-toggle" onClick={onMenu} aria-label="Toggle sidebar" aria-controls="primary-sidebar" aria-expanded={expanded}><Icon name="panel-left"/></button>
      <div className="mob-logo" style={{ display:'none' }}><Logo size={28}/></div>
      <SearchBox/>
      <div style={{ flex:1 }}/>
      <button 
        className="iconbtn" 
        onClick={toggleTheme} 
        aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`} 
        title={`Switch to ${theme==='dark'?'light':'dark'} mode`}
      >
        <Icon name={theme==='dark'?'sun':'moon'}/>
      </button>
      <div style={{ position:'relative' }} data-pop>
        <button className="iconbtn" aria-label="Notifications" onClick={()=>setPop(pop==='n'?null:'n')}><Icon name="bell"/><span className="pip"/></button>
        {pop==='n' && (
          <div className="pop">
            <div className="pop-head"><b style={{ fontSize:14 }}>Notifications</b><span className="chip chip-blue">3 new</span></div>
            {D.notifications.map((n,i)=>(
              <button key={i} className="notif" onClick={()=>{ go(n.to); setPop(null); }}>
                <div className={`icon-tile ${n.tone}`}><Icon name={n.icon}/></div>
                <div style={{ flex:1 }}><div style={{ fontWeight:600 }}>{n.t}</div><div className="faint">{n.s}</div></div>
                <span className="faint" style={{ fontSize:12 }}>{n.when}</span>
              </button>
            ))}
            <div style={{ padding:'10px 16px', textAlign:'center' }}><button className="link" onClick={()=>setPop(null)}>Mark all as read</button></div>
          </div>
        )}
      </div>
      <div style={{ position:'relative' }} data-pop>
        <button className="me" onClick={()=>setPop(pop==='m'?null:'m')} aria-label="Account menu">
          <span className="avatar" style={mode!=='student'?{background:'linear-gradient(160deg,#C9D6F7,#9AB0EE)',color:'#152B8A'}:null}>{who.i}</span>
          <span style={{ textAlign:'left' }}><div className="n">{who.n}</div><div className="s">{who.s}</div></span>
          <Icon name="chevron-down" size={15} className="faint"/>
        </button>
        {pop==='m' && (
          <div className="pop" style={{ width:240, padding:'6px 0' }}>
            {mode==='student' && <>
              <button className="menu-item" onClick={()=>{go('/profile');setPop(null);}}><Icon name="user-round"/>Profile</button>
              <button className="menu-item" onClick={()=>{go('/settings');setPop(null);}}><Icon name="settings"/>Settings</button>
              <button className="menu-item" onClick={()=>{go('/onboarding');setPop(null);}}><Icon name="list-restart"/>Redo onboarding</button>
            </>}
            <button className="menu-item" onClick={toggleTheme}><Icon name={theme==='dark'?'sun':'moon'}/>{theme==='dark'?'Light theme':'Dark theme'}</button>
            <button className="menu-item" onClick={()=>{go('/switch');setPop(null);}}><Icon name="repeat-2"/>Switch workspace</button>
            <div className="divider" style={{ margin:'6px 0' }}/>
            <button className="menu-item" onClick={()=>{ reset(); go('/'); }}><Icon name="rotate-ccw"/>Reset demo data</button>
            <button className="menu-item" onClick={()=>{ update({auth:null}); go('/login'); }}><Icon name="log-out"/>Sign out</button>
          </div>
        )}
      </div>
    </header>
  );
}

function MobileNav({ path }){
  const [more, setMore] = useState(false);
  const items = STUDENT_NAV.slice(0,4);
  return (<>
    <nav className="mobnav" aria-label="Mobile">
      {items.map(n => <button key={n.to} className={isOn(n,path)?'on':''} onClick={()=>go(n.to)}><Icon name={n.icon}/>{n.label.replace('My ','')}</button>)}
      <button onClick={()=>setMore(true)} className={['/assessment','/career-readiness','/industry-skills','/profile','/settings'].some(p=>path.startsWith(p))?'on':''}><Icon name="menu"/>More</button>
    </nav>
    {more && (
      <div className="mob-sheet" onClick={()=>setMore(false)}>
        <div onClick={e=>e.stopPropagation()}>
          <div style={{ width:36, height:4, borderRadius:4, background:'var(--line)', margin:'0 auto 14px' }}/>
          {[...STUDENT_NAV.slice(4), { to:'/profile', label:'Profile', icon:'user-round' }, { to:'/settings', label:'Settings', icon:'settings' }, { to:'/switch', label:'Switch workspace', icon:'repeat-2' }].map(n => (
            <button key={n.to} className={`nav-item ${isOn(n,path)?'on':''}`} style={{ height:46 }} onClick={()=>{ go(n.to); setMore(false); }}><Icon name={n.icon}/><span className="lbl">{n.label}</span></button>
          ))}
        </div>
      </div>
    )}
  </>);
}

/* ---------------- Ask SkillMitra ---------------- */
const PROMPTS = ['What should I learn next?','Why is SQL important for my goal?','Explain my skill gap.','Help me choose a project.'];

function answerFor(q, ctx){
  const { role, gaps, readiness, sqlValidated, projectDone, current, next } = ctx;
  const t = q.toLowerCase();
  const missing = gaps.filter(g=>g.status!=='strong').map(g=>g.skill);
  if (/next|learn|start|now/.test(t) && !/why/.test(t)){
    if (!sqlValidated) return { text:<>
      <b>SQL Fundamentals</b> is your next recommended step because it is one of the highest-priority gaps for your <b>{role.title}</b> goal. You're at <b>Beginner</b> and the role expects <b>Advanced</b> — and you're already 45% through the module.
      <div style={{marginTop:8}}>Finishing it and passing the assessment should lift your readiness from <b>{readiness}%</b> to around <b>74%</b>.</div></>,
      src:['Career goal: '+role.title,'Gap: SQL · High','Roadmap step 01'], acts:[{l:'Continue SQL',to:'/learning/sql'},{l:'Take assessment',to:'/assessment'}] };
    if (!projectDone) return { text:<>Nice work validating SQL. Your next step is to <b>apply it</b>: start <b>Student Performance Analytics</b>. A completed project is one of the three things currently holding back your readiness, and this one uses exactly the SQL and Excel you've already got.</>,
      src:['SQL validated · Intermediate','Projects: 60%'], acts:[{l:'Open project',to:'/projects/student-performance-analytics'}] };
    return { text:<>You've validated SQL and shipped a project. Next up is <b>Statistics for Data Analysis</b> — it's a core requirement for {role.title} roles and your current level is Beginner.</>,
      src:['Roadmap step 02','Gap: Statistics · Medium'], acts:[{l:'Start Statistics',to:'/learning/statistics'}] };
  }
  if (/sql|why/.test(t)) return { text:<>
    For a {role.title}, SQL is how you get to the data in the first place. Almost every analyst task — pulling a report, checking a metric, preparing a dashboard — begins with a query.
    <div style={{marginTop:8}}>In our curated requirements, SQL is marked <b>Core</b> at <b>Advanced</b> level. You're currently at <b>{D.LEVELS[ctx.levels.SQL]}</b>, which makes it your top-priority gap.</div></>,
    src:['Industry requirements · '+role.title,'Your level: '+D.LEVELS[ctx.levels.SQL]], acts:[{l:'View skill gaps',to:'/skill-gaps'}] };
  if (/gap|explain|missing|behind/.test(t)) return { text:<>
    You match <b>{gaps.filter(g=>g.status==='strong').length} of {gaps.length}</b> core skills for {role.title}. Python and Excel are already at the required level.
    <div style={{marginTop:8}}>The gaps are {missing.map((m,i)=><React.Fragment key={m}>{i>0 && (i===missing.length-1?' and ':', ')}<b>{m}</b></React.Fragment>)}. {gaps.find(g=>g.skill==='Power BI')?.cur===0 && 'Power BI is completely new to you, so it\'s a "start", not a "learn".'}</div></>,
    src:['Skill analysis','Resume + assessments'], acts:[{l:'Open skill gaps',to:'/skill-gaps'}] };
  if (/project|build|portfolio/.test(t)) return { text:<>
    I'd pick <b>Student Performance Analytics</b>. It's Beginner level, takes 1–2 weeks, and practises <b>SQL + Excel</b> — your top gap plus a strength — so you'll make progress without getting stuck.
    <div style={{marginTop:8}}>Once you've done Power BI, <b>Sales Dashboard</b> is the natural follow-up.</div></>,
    src:['94% match','Skills: SQL, Excel'], acts:[{l:'View project',to:'/projects/student-performance-analytics'},{l:'All projects',to:'/projects'}] };
  if (/ready|readiness|score|job|placement/.test(t)) return { text:<>Your career readiness is <b>{readiness}%</b>, up from 42% when you joined. The biggest levers right now are Power BI, Statistics and one more practical project.</>,
    src:['Career readiness'], acts:[{l:'See breakdown',to:'/career-readiness'}] };
  return { text:<>I can help with your learning plan for <b>{role.title}</b>. Try asking what to learn next, why a skill matters, or which project to pick. Right now you're on <b>{current.title}</b>, with <b>{next.title}</b> after that.</>,
    src:['Roadmap'], acts:[{l:'Open roadmap',to:'/learning'}] };
}

function AskPanel({ open, onClose }){
  const store = useStore();
  const { role, gaps, readiness } = store;
  const [msgs, setMsgs] = useState([]);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const body = useRef();
  useEffect(()=>{ if (body.current) body.current.scrollTop = body.current.scrollHeight; }, [msgs, busy]);
  useEffect(()=>{ const k=e=>{ if(e.key==='Escape') onClose(); }; if(open) addEventListener('keydown',k); return ()=>removeEventListener('keydown',k); },[open]);
  const ask = (q) => {
    if (!q.trim() || busy) return;
    setMsgs(m => [...m, { r:'u', q }]); setInput(''); setBusy(true);
    setTimeout(()=>{ setMsgs(m => [...m, { r:'a', ...answerFor(q, store) }]); setBusy(false); }, 900);
  };
  if (!open) return null;
  return (
    <section className="ask" role="dialog" aria-label="Ask SkillMitra">
      <div className="ask-head">
        <LogoMark size={32}/>
        <div style={{ flex:1 }}><div style={{ fontWeight:700 }}>Ask SkillMitra</div><div className="faint" style={{ fontSize:12.5 }}>Answers based on your profile and roadmap</div></div>
        {msgs.length>0 && <button className="iconbtn" style={{width:32,height:32}} onClick={()=>setMsgs([])} aria-label="Clear conversation" title="New conversation"><Icon name="rotate-ccw" size={15}/></button>}
        <button className="iconbtn" style={{width:32,height:32}} onClick={onClose} aria-label="Close"><Icon name="x" size={16}/></button>
      </div>
      <div className="ask-ctx">
        <span className="eyebrow" style={{ marginRight:4 }}>Using</span>
        <span className="tag" style={{height:22,fontSize:11.5}}>{role.title}</span>
        <span className="tag" style={{height:22,fontSize:11.5}}>{gaps.filter(g=>g.status!=='strong').length} gaps</span>
        <span className="tag" style={{height:22,fontSize:11.5}}>Readiness {readiness}%</span>
      </div>
      <div className="ask-body" ref={body}>
        {msgs.length===0 && (
          <div>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>Hi {store.state.profile.name}, what can I help with?</div>
            <p className="muted" style={{ fontSize:13.5, marginBottom:16 }}>I know your goal, current skills, gaps and where you are on your roadmap.</p>
            <div className="stack" style={{ '--g':'8px' }}>
              {PROMPTS.map(p => <button key={p} className="prompt" onClick={()=>ask(p)}>{p}<Icon name="arrow-up-right"/></button>)}
            </div>
          </div>
        )}
        {msgs.map((m,i)=> m.r==='u'
          ? <div key={i} className="msg-u">{m.q}</div>
          : <div key={i} className="msg-a-wrap reveal"><span className="mk"><LogoMark size={26}/></span><div className="msg-a">
              {m.text}
              <div className="src">{m.src.map(s=><span key={s} className="chip chip-gray" style={{height:22,fontSize:11}}>{s}</span>)}</div>
              <div className="acts">{m.acts.map(a=><button key={a.to} className="btn btn-secondary btn-sm" onClick={()=>{ go(a.to); if (innerWidth<720) onClose(); }}>{a.l}<Icon name="arrow-right"/></button>)}</div>
            </div></div>
        )}
        {busy && <div className="msg-a-wrap"><span className="mk"><LogoMark size={26}/></span><div className="typing" aria-label="SkillMitra is typing"><i/><i/><i/></div></div>}
        {msgs.length>0 && !busy && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:4 }}>
            {PROMPTS.filter(p=>!msgs.some(m=>m.q===p)).slice(0,3).map(p=><button key={p} className="chip chip-blue" style={{cursor:'pointer',height:28}} onClick={()=>ask(p)}>{p}</button>)}
          </div>
        )}
      </div>
      <form className="ask-input" onSubmit={e=>{e.preventDefault(); ask(input);}}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about your learning path…" aria-label="Ask a question"/>
        <button className="btn btn-primary" style={{ width:42, padding:0 }} aria-label="Send" disabled={!input.trim()||busy}><Icon name="arrow-up"/></button>
      </form>
    </section>
  );
}

function AppShell({ path, mode='student', children }){
  const [askOpen, setAskOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(()=>{ const o=()=>setAskOpen(true); addEventListener('sm:ask',o); return ()=>removeEventListener('sm:ask',o); },[]);
  useEffect(()=>{ setExpanded(false); },[path]);
  useEffect(()=>{ const close=e=>{if(e.key==='Escape')setExpanded(false);}; addEventListener('keydown',close); return ()=>removeEventListener('keydown',close); },[]);
  return (
    <div className={`shell ${expanded?'expanded':''}`}>
      <Sidebar path={path} mode={mode} expanded={expanded} onNav={()=>setExpanded(false)}/>
      {expanded && <button className="mobile-sidebar-backdrop" aria-label="Close navigation menu" onClick={()=>setExpanded(false)}/>}
      <div className="main">
        <TopBar mode={mode} expanded={expanded} onMenu={()=>setExpanded(e=>!e)}/>
        <main className="page" key={path}>{children}</main>
      </div>
      {mode==='student' && <MobileNav path={path}/>}
      {mode==='student' && !askOpen && (
        <button className="ask-fab" onClick={()=>setAskOpen(true)} aria-label="Ask SkillMitra">
          <span className="m"><Icon name="message-square-text"/></span><span className="t">Ask SkillMitra</span>
        </button>
      )}
      {mode==='student' && <AskPanel open={askOpen} onClose={()=>setAskOpen(false)}/>}
    </div>
  );
}

Object.assign(window, { AppShell, AskPanel });
