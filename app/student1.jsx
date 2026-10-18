/* SkillMitra — Dashboard, Skill Analysis, Skill Gaps, Roadmap, Resources */
import React, { useState, useEffect, useRef, useMemo } from 'react';

const s1Css = `
.dash-hero{display:grid;grid-template-columns:1.35fr 1fr;gap:20px}
.goal-card{display:grid;grid-template-columns:auto 1fr;gap:28px;align-items:center;padding:28px;background:var(--goal-card-bg);border-radius:var(--r-lg);border:1px solid var(--line);box-shadow:var(--sh-1)}
.next-card{padding:28px;display:flex;flex-direction:column;background:var(--next-card-bg);color:#fff;border-radius:var(--r-lg);border:1px solid var(--next-card-border);box-shadow:0 18px 36px -8px rgba(0,0,0,0.35)}
.next-card h3{color:#fff}
.skill-row{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.skill-card{padding:18px 16px;border-radius:var(--r);transition:all 0.2s}
.skill-card:hover{transform:translateY(-2px);box-shadow:var(--sh-2)}
.dash-2{display:grid;grid-template-columns:1.35fr 1fr;gap:20px}
.dash-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.act{display:flex;gap:12px;padding:14px 0;border-top:1px solid var(--line-2)}
.act:first-child{border-top:0;padding-top:0}
.act .icon-tile{width:32px;height:32px;border-radius:8px}
.act .icon-tile svg{width:15px;height:15px}
.gap-row{display:grid;grid-template-columns:96px 1fr 1fr 28px;align-items:center;gap:12px;padding:10px 0;border-top:1px solid var(--line-2);font-size:13.5px}
.an-src{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.an-src .card{padding:16px}
.an-grid{display:grid;grid-template-columns:1fr 1.3fr;gap:20px}
.an-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.an-col{border-radius:12px;padding:18px;border:1px solid var(--line);background:var(--surface)}
.cmp-row{display:grid;grid-template-columns:110px 1fr 120px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid var(--line-2)}
.cmp-track{position:relative;height:10px;background:var(--line-2);border-radius:99px}
.cmp-track i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;transition:width 1s cubic-bezier(0.16, 1, 0.3, 1);box-shadow:0 0 8px var(--blue-glow)}
.cmp-track b{position:absolute;top:-5px;width:2px;height:20px;background:var(--ink);border-radius:2px;box-shadow:0 0 4px rgba(0,0,0,0.5)}
.gaps-wrap{display:grid;grid-template-columns:1fr 340px;gap:20px;align-items:start}
.rm-wrap{display:grid;grid-template-columns:1fr 320px;gap:24px;align-items:start}
.rm{position:relative}
.rm-step{display:grid;grid-template-columns:56px 1fr;gap:0;position:relative}
.rm-step .rail{position:relative;display:flex;justify-content:center}
.rm-step .rail::after{content:"";position:absolute;top:44px;bottom:-4px;width:2px;background:var(--line)}
.rm-step:last-child .rail::after{display:none}
.rm-step.done .rail::after{background:var(--green)}
.rm-step.cur .rail::after{background:linear-gradient(var(--blue) 50%,var(--line) 50%)}
.rm-node{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:13px;background:var(--surface);border:2px solid var(--line);color:var(--ink-3);position:relative;z-index:1;font-family:var(--mono)}
.rm-step.cur .rm-node{border-color:var(--blue);color:var(--blue);box-shadow:0 0 0 5px var(--blue-50);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 0 4px var(--blue-50)}50%{box-shadow:0 0 0 8px var(--blue-glow)}}
.rm-step.done .rm-node{background:var(--green);border-color:var(--green);color:#fff}
.rm-card{margin-bottom:16px;padding:22px 24px;border-radius:var(--r)}
.rm-step.cur .rm-card{border-color:var(--blue-200);box-shadow:var(--sh-2)}
.rm-step.locked .rm-card{background:var(--surface-alt)}
.rm-meta{display:grid;grid-template-columns:repeat(4,auto);gap:22px;margin-top:16px;padding-top:14px;border-top:1px solid var(--line-2);justify-content:start}
.rm-meta div{font-size:13px}
.rm-meta .eyebrow{font-size:10px;margin-bottom:2px}
.res-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;min-width:0}
.res-grid>*{min-width:0}
.res-card{padding:22px;display:flex;flex-direction:column;border-radius:var(--r)}
.res-wrap{display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,320px);gap:20px;align-items:start;min-width:0;width:100%}
.res-wrap>*{min-width:0}
.tabs{display:flex;gap:6px;border-bottom:1px solid var(--line);margin-bottom:20px;overflow-x:auto}
.tabs button{height:40px;padding:0 16px;border:0;background:none;font-weight:600;font-size:13.5px;color:var(--ink-3);border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap;transition:all 0.15s}
.tabs button.on{color:var(--blue);border-bottom-color:var(--blue)}
.tabs button:hover{color:var(--ink)}
@media (max-width:1200px){.skill-row{grid-template-columns:repeat(3,1fr)}.an-src{grid-template-columns:repeat(3,1fr)}}
@media (max-width:1280px){.res-wrap{grid-template-columns:minmax(0,1fr)}.res-wrap>:last-child{position:static!important}}
@media (max-width:1024px){
  .dash-hero,.dash-2,.an-grid,.gaps-wrap,.rm-wrap,.res-wrap{grid-template-columns:1fr}
  .dash-3{grid-template-columns:1fr 1fr}
}
@media (max-width:720px){
  .goal-card{grid-template-columns:1fr;justify-items:start;gap:18px;padding:20px}
  .skill-row{grid-template-columns:1fr 1fr}
  .dash-3,.res-grid,.an-cols{grid-template-columns:1fr}
  .an-src{grid-template-columns:1fr 1fr}
  .cmp-row{grid-template-columns:80px 1fr;}
  .cmp-row > :last-child{grid-column:1/-1}
  .rm-step{grid-template-columns:44px 1fr}
  .rm-node{width:34px;height:34px;font-size:12px}
  .rm-meta{grid-template-columns:1fr 1fr;gap:12px}
  .gap-row{grid-template-columns:80px 1fr 1fr 24px}
}
`;
function S1Style(){ return <style>{s1Css}</style>; }

function greeting(){ const h = new Date().getHours(); return h<12?'Good morning':h<17?'Good afternoon':'Good evening'; }

/* ================= DASHBOARD ================= */
function Dashboard(){
  const { state, role, gaps, readiness, learningProgress, steps, current, next, nextAction, levels } = useStore();
  const skills = [...gaps].sort((a,b)=>({strong:0,developing:1,missing:2}[a.status]-({strong:0,developing:1,missing:2}[b.status])));
  const recs = [
    { t:'SQL Fundamentals', s:'Course · 6 hrs', i:'database', to:'/learning/sql', tag:'Top priority', tone:'amber', p:steps[0].progress },
    { t:'Statistics Essentials', s:'Course · 5 hrs', i:'sigma', to:'/learning/statistics', tag:'Up next', tone:'blue', p:0 },
    { t:'Power BI for Beginners', s:'Course · 5 hrs', i:'bar-chart-3', to:'/learning/powerbi', tag:'Missing skill', tone:'red', p:0 },
  ];
  return (<>
    <S1Style/>
    <div className="page-head">
      <div><h1>{greeting()}, {state.profile.name} 👋</h1><p>Here’s your learning progress for today.</p></div>
      <div className="row"><A to="/analysis" className="btn btn-secondary"><Icon name="scan-search"/>Skill Analysis</A></div>
    </div>

    <div className="dash-hero">
      <div className="card goal-card">
        <Ring value={readiness} size={148} stroke={11} color="var(--green)" label="Career readiness" sub="Career ready"/>
        <div>
          <div className="eyebrow">Target career</div>
          <div className="row" style={{ gap:10, margin:'4px 0 6px' }}><h2 style={{ fontSize:28, fontWeight:800 }}>{role.title}</h2><span className="chip chip-green"><Icon name="trending-up"/>+{readiness-state.readinessBefore} since July</span></div>
          <p className="muted" style={{ fontSize:14 }}>You match {gaps.filter(g=>g.status==='strong').length} of {gaps.length} core skills. Closing SQL and Statistics will make the biggest difference.</p>
          <div className="row" style={{ marginTop:18, flexWrap:'wrap' }}>
            <A to="/career-readiness" className="btn btn-secondary btn-sm">Career Readiness<Icon name="arrow-right"/></A>
            <A to="/industry-skills" className="link">Role requirements</A>
          </div>
        </div>
      </div>
      <div className="card next-card">
        <div className="eyebrow" style={{ color:'rgba(255,255,255,.55)' }}>Next recommended action</div>
        <h3 style={{ fontSize:22, fontWeight:800, margin:'10px 0 6px' }}>{nextAction.title}</h3>
        <p style={{ color:'rgba(255,255,255,.65)', fontSize:14 }}>{nextAction.sub}</p>
        {nextAction.to==='/learning/sql' && <div style={{ margin:'18px 0 0' }}>
          <div className="between" style={{ fontSize:12.5, marginBottom:6, color:'rgba(255,255,255,.7)' }}><span>Module progress</span><b className="num" style={{ color:'#fff' }}>{steps[0].progress}%</b></div>
          <div className="bar" style={{ background:'rgba(255,255,255,.12)' }}><i style={{ width:steps[0].progress+'%', background:'#6F8BFF' }}/></div>
        </div>}
        <div style={{ flex:1, minHeight:18 }}/>
        <div className="row" style={{ flexWrap:'wrap' }}>
          <A to={nextAction.to} className="btn btn-white">{nextAction.cta}<Icon name="arrow-right"/></A>
          {nextAction.to==='/learning/sql' && <A to="/assessment" className="btn btn-outline-white">Take assessment</A>}
        </div>
      </div>
    </div>

    <div className="card-head" style={{ marginTop:32 }}><h2 className="card-title" style={{ fontSize:17 }}>Skill Overview</h2><A to="/analysis" className="link">Full analysis<Icon name="arrow-right"/></A></div>
    <div className="skill-row">
      {skills.map(g=>{
        const skillKeyMap = { SQL:'sql', Statistics:'statistics', 'Power BI':'powerbi', Python:'python', Excel:'excel', 'Machine Learning':'machine-learning', Git:'git', C:'c', Figma:'figma' };
        const toUrl = skillKeyMap[g.skill] ? `/learning/${skillKeyMap[g.skill]}` : '/skill-gaps';
        return (
          <A key={g.skill} to={toUrl} className="card card-hover skill-card">
            <div className="between"><b style={{ fontSize:15 }}>{g.skill}</b><StatusDot status={g.status}/></div>
            <div style={{ margin:'14px 0 10px' }}><LevelPips level={g.cur} target={g.level} tone={g.status==='strong'?'green':g.status==='developing'?'amber':'blue'}/></div>
            <div className="between"><span style={{ fontSize:12.5, fontWeight:600, color:{strong:'var(--green)',developing:'var(--amber)',missing:'var(--red)'}[g.status] }}>{STATUS[g.status].label}</span><span className="faint" style={{ fontSize:12 }}>{D.LEVELS[g.cur]}</span></div>
          </A>
        );
      })}
    </div>

    <div className="dash-2" style={{ marginTop:20 }}>
      <div className="card card-pad">
        <div className="card-head"><div><h3 className="card-title">Learning Progress</h3><div className="faint" style={{ fontSize:13, marginTop:2 }}>Current roadmap · {role.title}</div></div><b className="num" style={{ fontSize:26, letterSpacing:'-.03em' }}>{learningProgress}%</b></div>
        <Bar value={learningProgress}/>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:4, marginTop:10 }}>
          {steps.map(s=><div key={s.id} style={{ fontSize:11, color:s.status==='Completed'?'var(--green)':s.status==='In Progress'||s.status==='Up Next'?'var(--blue)':'var(--ink-3)', fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.n} {s.title.split(' ')[0]}</div>)}
        </div>
        <div className="divider"/>
        <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <div style={{ padding:14, borderRadius:10, background:'var(--blue-50)', border:'1px solid var(--blue-100)' }}>
            <div className="eyebrow" style={{ color:'var(--blue)' }}>Current stage</div>
            <div style={{ fontWeight:700, marginTop:4 }}>{current.title}</div>
            <div className="faint" style={{ fontSize:12.5 }}>{current.time}</div>
          </div>
          <div style={{ padding:14, borderRadius:10, background:'var(--bg)', border:'1px solid var(--line)' }}>
            <div className="eyebrow">Next</div>
            <div style={{ fontWeight:700, marginTop:4 }}>{next.title.replace(' for Data Analysis','')}</div>
            <div className="faint" style={{ fontSize:12.5 }}>{next.time}</div>
          </div>
        </div>
        <div style={{ marginTop:16 }}><A to="/learning" className="link">Open roadmap<Icon name="arrow-right"/></A></div>
      </div>
      <div className="card card-pad">
        <div className="card-head"><h3 className="card-title">Skill Gap Snapshot</h3><span className="faint" style={{ fontSize:12 }}>You vs. {role.title}</span></div>
        <div className="gap-row" style={{ borderTop:0, paddingTop:0 }}><span className="eyebrow" style={{fontSize:10}}>Skill</span><span className="eyebrow" style={{fontSize:10}}>Current</span><span className="eyebrow" style={{fontSize:10}}>Required</span><span/></div>
        {gaps.map(g=>(
          <div key={g.skill} className="gap-row">
            <b style={{ fontWeight:600 }}>{g.skill}</b>
            <LevelPips level={g.cur} tone={g.status==='strong'?'green':'amber'}/>
            <LevelPips level={g.level} tone="blue"/>
            <StatusDot status={g.status} size={22}/>
          </div>
        ))}
        <A to="/skill-gaps" className="btn btn-primary btn-block" style={{ marginTop:16 }}>View Skill Gaps<Icon name="arrow-right"/></A>
      </div>
    </div>

    <div className="dash-2" style={{ marginTop:20 }}>
      <div>
        <div className="card-head"><h2 className="card-title" style={{ fontSize:17 }}>Recommended for You</h2><A to="/learning" className="link">All resources<Icon name="arrow-right"/></A></div>
        <div className="dash-3">
          {recs.map(r=>(
            <A key={r.t} to={r.to} className="card card-hover card-pad" style={{ display:'flex', flexDirection:'column', padding:18 }}>
              <div className="between"><div className="icon-tile"><Icon name={r.i}/></div><span className={`chip chip-${r.tone}`}>{r.tag}</span></div>
              <b style={{ fontSize:15, marginTop:16 }}>{r.t}</b>
              <span className="faint" style={{ fontSize:12.5, marginTop:2 }}>{r.s}</span>
              <div style={{ flex:1, minHeight:16 }}/>
              {r.p>0 ? <><Bar value={r.p} size="sm"/><span className="faint" style={{ fontSize:12, marginTop:6 }}>{r.p}% complete</span></> : <span className="link" style={{ fontSize:13 }}>Start<Icon name="arrow-right"/></span>}
            </A>
          ))}
        </div>
      </div>
      <div className="card card-pad">
        <div className="card-head"><h3 className="card-title">Recent Activity</h3></div>
        {(state.sqlLevel>=2 ? [{icon:'badge-check',tone:'green',t:'SQL validated at Intermediate',s:`Scored ${state.assessment?.score ?? 8}/10 on SQL Fundamentals`,when:'Just now'}, ...D.activity] : D.activity).slice(0,4).map((a,i)=>(
          <div key={i} className="act">
            <div className={`icon-tile ${a.tone}`}><Icon name={a.icon}/></div>
            <div style={{ flex:1, minWidth:0 }}><div style={{ fontWeight:600, fontSize:13.5 }}>{a.t}</div><div className="faint" style={{ fontSize:12.5 }}>{a.s}</div></div>
            <span className="faint" style={{ fontSize:12, whiteSpace:'nowrap' }}>{a.when}</span>
          </div>
        ))}
      </div>
    </div>
  </>);
}

/* ================= SKILL ANALYSIS ================= */
function Analysis({ query }){
  const { state, role, gaps, levels } = useStore();
  const shouldRun = query.run === '1';
  const [phase, setPhase] = useState(shouldRun ? 0 : 4);
  useEffect(()=>{ if (!shouldRun) return; const ts=[1,2,3,4].map((p,i)=>setTimeout(()=>setPhase(p), 650*(i+1))); return ()=>ts.forEach(clearTimeout); },[]);
  const sources = [
    { i:'file-text', t:'Resume', s:state.profile.resume ? 'Parsed · 6 skills' : 'Not uploaded' },
    { i:'school', t:'Academic Profile', s:`${state.profile.degree} · Sem ${state.profile.semester}` },
    { i:'list-checks', t:'Self-Declared Skills', s:`${state.profile.skills.length} skills` },
    { i:'clipboard-check', t:'Assessment Results', s:state.sqlLevel>=2?'Python, Excel, SQL':'Python, Excel' },
    { i:'flag', t:'Career Goal', s:role.title },
  ];
  const groups = [
    { k:'strong', t:'Strong', d:'At or above the level your role needs.', bg:'var(--green-50)', bd:'var(--green-100)', c:'var(--green)' },
    { k:'developing', t:'Developing', d:'Started, but below the required level.', bg:'var(--amber-50)', bd:'var(--amber-100)', c:'var(--amber)' },
    { k:'missing', t:'Missing', d:'Not yet in your profile.', bg:'var(--red-50)', bd:'var(--red-100)', c:'var(--red)' },
  ];
  // Spec: Developing = SQL; Missing = Power BI, Statistics (Statistics level is beginner but unverified → treated missing in analysis)
  const groupOf = g => g.skill==='Statistics' && state.sqlLevel<2 ? 'missing' : g.status;
  return (<>
    <S1Style/>
    <PageHead crumbs={[{label:'Dashboard',to:'/dashboard'},{label:'Skill Analysis'}]} title="Your Skill Analysis"
      sub={`We combined five sources to understand where you stand against the ${role.title} role.`}
      right={<><button className="btn btn-secondary" onClick={()=>go('/analysis?run=1&t='+Date.now())}><Icon name="refresh-cw"/>Re-run analysis</button><A to="/skill-gaps" className="btn btn-primary">View Skill Gaps<Icon name="arrow-right"/></A></>}/>

    <div className="eyebrow" style={{ marginBottom:10 }}>Input sources</div>
    <div className="an-src">
      {sources.map((s,i)=>{ const done = phase>=1 && (phase>1 || i<3) || phase>=2; return (
        <div key={s.t} className="card" style={{ transition:'border-color .3s', borderColor: done?'var(--line)':'var(--line)' }}>
          <div className="between"><div className={`icon-tile ${done?'':'gray'}`} style={{ width:34, height:34 }}><Icon name={s.i}/></div>
            {done ? <Icon name="check-circle-2" size={17} style={{ color:'var(--green)' }}/> : <Icon name="loader-2" size={17} className="spin" style={{ color:'var(--ink-3)' }}/>}</div>
          <b style={{ display:'block', fontSize:14, marginTop:12 }}>{s.t}</b>
          <span className="faint" style={{ fontSize:12.5 }}>{s.s}</span>
        </div>);})}
    </div>

    {phase<4 ? (
      <div className="card card-pad" style={{ marginTop:20 }} aria-live="polite">
        <div className="row" style={{ marginBottom:18 }}><Icon name="loader-2" className="spin" style={{ color:'var(--blue)' }}/><b>{['Reading your profile…','Extracting skills from resume…','Comparing with Data Analyst requirements…','Scoring skill levels…'][phase]}</b></div>
        {[0,1,2].map(i=><div key={i} className="skel" style={{ height:44, marginBottom:10, width:`${90-i*14}%` }}/>)}
      </div>
    ) : (
      <div className="reveal">
        <div className="an-grid" style={{ marginTop:20 }}>
          <div className="card card-pad">
            <div className="eyebrow">Current skills</div>
            <div className="row" style={{ flexWrap:'wrap', gap:8, margin:'12px 0 22px' }}>
              {state.profile.skills.map(s=><span key={s} className="tag" style={{ height:32, fontSize:14, padding:'0 14px', background:'var(--surface)' }}>{s}</span>)}
            </div>
            <div className="eyebrow">Target role</div>
            <div className="row" style={{ marginTop:12 }}>
              <div className="icon-tile"><Icon name={role.icon}/></div>
              <div><b style={{ fontSize:18 }}>{role.title}</b><div className="faint" style={{ fontSize:12.5 }}>{role.required.length} core skills · curated requirements</div></div>
            </div>
            <div className="divider"/>
            <div className="eyebrow" style={{ marginBottom:12 }}>Match</div>
            <div className="row" style={{ gap:16 }}>
              <Ring value={Math.round(gaps.reduce((a,g)=>a+Math.min(g.cur,g.level)/g.level,0)/gaps.length*100)} size={86} stroke={8} sub="match"/>
              <p className="muted" style={{ fontSize:13.5 }}>Your foundation in <b>Python</b> and <b>Excel</b> is strong. The fastest path forward is SQL — you’ve started, and it’s required at an advanced level.</p>
            </div>
          </div>
          <div className="card card-pad">
            <div className="card-head"><h3 className="card-title">Analysis result</h3><span className="chip chip-blue"><Icon name="sparkles"/>AI-assessed</span></div>
            <div className="an-cols">
              {groups.map(gr=>{ const items = gaps.filter(g=>groupOf(g)===gr.k); return (
                <div key={gr.k} className="an-col" style={{ background:gr.bg, borderColor:gr.bd }}>
                  <div className="row" style={{ gap:8, color:gr.c, fontWeight:700 }}><Icon name={STATUS[gr.k].icon} size={16} strokeWidth={2.6}/>{gr.t}</div>
                  <p style={{ fontSize:12.5, color:'var(--ink-2)', margin:'4px 0 14px' }}>{gr.d}</p>
                  {items.length ? items.map(g=><div key={g.skill} style={{ background:'var(--surface)', color:'var(--ink)', borderRadius:8, padding:'9px 12px', fontWeight:700, fontSize:14, marginBottom:6, border:'1px solid var(--line)' }}>{g.skill}</div>)
                    : <div className="faint" style={{ fontSize:13 }}>None</div>}
                </div>);})}
            </div>
          </div>
        </div>

        <div className="card card-pad" style={{ marginTop:20 }}>
          <div className="card-head"><div><h3 className="card-title">Skill level vs. role requirement</h3><div className="faint" style={{ fontSize:13 }}>Bar shows your level · marker shows what {role.title} roles expect</div></div>
            <div className="row hide-sm" style={{ gap:14, fontSize:12 }}><span className="row" style={{gap:6}}><i style={{width:10,height:10,borderRadius:3,background:'var(--blue)'}}/>Your level</span><span className="row" style={{gap:6}}><i style={{width:2,height:12,background:'var(--ink)'}}/>Required</span></div></div>
          {gaps.map(g=><CompareRow key={g.skill} g={g}/>)}
          <div className="row" style={{ justifyContent:'flex-end', marginTop:16, gap:4, fontSize:11, fontFamily:'var(--mono)' }} aria-hidden="true">
            <span className="faint" style={{ marginRight:'auto' }}>SCALE</span>{D.LEVELS.map(l=><span key={l} className="faint" style={{ width:84, textAlign:'center' }}>{l}</span>)}
          </div>
        </div>
      </div>
    )}
  </>);
}
function CompareRow({ g }){
  const m = useMounted(100);
  const c = { strong:'var(--green)', developing:'#D9921F', missing:'var(--red)' }[g.status];
  return (
    <div className="cmp-row">
      <b style={{ fontSize:14 }}>{g.skill}</b>
      <div className="cmp-track"><i style={{ width:(m?Math.max(g.cur/3*100,2):0)+'%', background:c }}/><b style={{ left:`calc(${g.level/3*100}% - 1px)` }}/></div>
      <span style={{ fontSize:13 }}><b>{D.LEVELS[g.cur]}</b><span className="faint"> / {D.LEVELS[g.level]}</span></span>
    </div>
  );
}

/* ================= SKILL GAPS ================= */
function SkillGaps(){
  const { role, gaps, sqlValidated } = useStore();
  const gapChip = g => g.gap==='None' ? <span className="chip chip-green">None</span> : g.gap==='High' ? <span className="chip chip-red">High</span> : <span className="chip chip-amber">Medium</span>;
  const actTo = s => ({
    SQL:'/learning/sql',
    Statistics:'/learning/statistics',
    'Power BI':'/learning/powerbi',
    Python:'/learning/python',
    Excel:'/learning/excel',
    'Machine Learning':'/learning/machine-learning',
    Git:'/learning/git',
    C:'/learning/c',
    Figma:'/learning/figma',
    'HTML & CSS':'/learning/web-development',
    JavaScript:'/learning/web-development',
    React:'/learning/web-development'
  })[s] || '/learning';
  const priority = sqlValidated ? gaps.find(g=>g.skill==='Power BI') : gaps.find(g=>g.skill==='SQL');
  const counts = { none:gaps.filter(g=>g.gap==='None').length, med:gaps.filter(g=>g.gap==='Medium').length, high:gaps.filter(g=>g.gap==='High').length };
  return (<>
    <S1Style/>
    <PageHead crumbs={[{label:'Dashboard',to:'/dashboard'},{label:'Skill Gaps'}]} title="Your Skill Gaps"
      sub="Here’s what stands between your current skills and your target career."
      right={<span className="chip chip-blue" style={{ height:32, padding:'0 12px', fontSize:13 }}><Icon name={role.icon}/>Target: {role.title}</span>}/>
    <div className="gaps-wrap">
      <div>
        <div className="grid" style={{ gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:16 }}>
          {[['No gap',counts.none,'green'],['Medium gap',counts.med,'amber'],['High gap',counts.high,'red']].map(([l,n,t])=>(
            <div key={l} className="card" style={{ padding:'14px 16px' }}><div className="faint" style={{ fontSize:12.5, fontWeight:600 }}>{l}</div><div className="row" style={{ gap:8, marginTop:2 }}><b className="num" style={{ fontSize:24 }}>{n}</b><span className={`chip chip-${t}`} style={{ height:8, width:8, padding:0, borderRadius:99 }}/></div></div>
          ))}
        </div>
        <div className="card" style={{ overflow:'hidden' }}>
          <table className="tbl tbl-resp">
            <thead><tr><th>Skill</th><th>Current Level</th><th>Required Level</th><th>Gap</th><th style={{ textAlign:'right' }}>Action</th></tr></thead>
            <tbody>{gaps.map(g=>(
              <tr key={g.skill} className={g.skill===priority?.skill?'hl':''}>
                <td className="full" data-l="Skill"><div className="row" style={{ gap:10 }}><StatusDot status={g.status}/><div><b>{g.skill}</b><div className="faint" style={{ fontSize:12 }}>{g.weight}</div></div></div></td>
                <td data-l="Current"><div style={{ fontWeight:600, fontSize:13.5 }}>{D.LEVELS[g.cur]}</div><LevelPips level={g.cur} tone={g.status==='strong'?'green':'amber'}/></td>
                <td data-l="Required"><div style={{ fontWeight:600, fontSize:13.5 }}>{D.LEVELS[g.level]}</div><LevelPips level={g.level}/></td>
                <td data-l="Gap">{gapChip(g)}</td>
                <td data-l="Action" style={{ textAlign:'right' }}>
                  {g.action==='Maintain' ? <A to="/assessment" className="btn btn-ghost btn-sm">Maintain</A>
                    : <A to={actTo(g.skill)} className={`btn btn-sm ${g.skill===priority?.skill?'btn-primary':'btn-secondary'}`}>{g.action}<Icon name="arrow-right"/></A>}
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p className="faint" style={{ fontSize:12.5, marginTop:12 }}><Icon name="info" size={13}/> Levels combine your resume, self-declared skills and validated assessments. Required levels come from curated {role.title} requirements.</p>
      </div>
      <div>
        <div className="card card-pad" style={{ borderColor:'var(--amber-100)' }}>
          <div className="row" style={{ gap:8 }}><span className="chip chip-amber"><Icon name="flag"/>Top Priority</span></div>
          <h2 style={{ fontSize:32, fontWeight:800, margin:'14px 0 6px' }}>{priority.skill}</h2>
          <p className="muted" style={{ fontSize:14 }}>{priority.skill==='SQL' ? 'SQL is a core requirement for your selected career path.' : 'Power BI is the remaining high gap — it’s new to you and listed in most analyst roles.'}</p>
          <div className="divider"/>
          <div className="between" style={{ fontSize:13, marginBottom:8 }}><span className="muted">Current</span><b>{D.LEVELS[priority.cur]}</b></div>
          <div className="between" style={{ fontSize:13, marginBottom:8 }}><span className="muted">Required</span><b>{D.LEVELS[priority.level]}</b></div>
          <div className="between" style={{ fontSize:13 }}><span className="muted">Estimated time</span><b>{priority.skill==='SQL'?'3 weeks':'2 weeks'}</b></div>
          <A to={actTo(priority.skill)} className="btn btn-primary btn-block btn-lg" style={{ marginTop:20 }}>Start Learning {priority.skill}<Icon name="arrow-right"/></A>
        </div>
        <div className="card card-pad" style={{ marginTop:16 }}>
          <b style={{ fontSize:14 }}>Why it matters</b>
          <p className="muted" style={{ fontSize:13.5, marginTop:6 }}>{role.required.find(r=>r.skill===priority.skill).why}</p>
          <button className="link" style={{ marginTop:12 }} onClick={()=>window.dispatchEvent(new CustomEvent('sm:ask'))}>Ask SkillMitra to explain<Icon name="arrow-right"/></button>
        </div>
      </div>
    </div>
  </>);
}

/* ================= ROADMAP ================= */
function Roadmap(){
  const { role, steps, learningProgress, readiness } = useStore();
  const chip = s => ({ 'Completed':<span className="chip chip-green"><Icon name="check"/>Completed</span>, 'In Progress':<span className="chip chip-blue"><span className="dot"/>In Progress</span>,
    'Up Next':<span className="chip chip-blue">Up Next</span>, 'Not Started':<span className="chip chip-gray">Not Started</span>, 'Locked':<span className="chip chip-gray"><Icon name="lock"/>Locked</span> })[s];
  const linkFor = s => s.id==='project' ? '/projects/student-performance-analytics' : s.id==='final' ? null : '/learning/'+s.id;
  return (<>
    <S1Style/>
    <PageHead crumbs={[{label:'Dashboard',to:'/dashboard'},{label:'My Learning'}]} title="Your Personalized Learning Path"
      sub={`Five steps, ordered by impact on your ${role.title} readiness. Each step unlocks the next.`}/>
    <div className="rm-wrap">
      <div className="rm">
        {steps.map((s,i)=>{
          const cls = s.status==='Completed'?'done':(s.status==='In Progress'||s.status==='Up Next')?'cur':s.status==='Locked'?'locked':'';
          const to = linkFor(s);
          return (
          <div key={s.id} className={`rm-step ${cls} reveal`} style={{ animationDelay:i*80+'ms' }}>
            <div className="rail"><div className="rm-node">{s.status==='Completed'?<Icon name="check" size={18} strokeWidth={3}/>:s.status==='Locked'?<Icon name="lock" size={15}/>:s.n}</div></div>
            <div className="card rm-card">
              <div className="between" style={{ alignItems:'flex-start', flexWrap:'wrap' }}>
                <div style={{ flex:1, minWidth:200 }}>
                  <div className="eyebrow">Step {s.n}</div>
                  <h3 style={{ fontSize:19, fontWeight:700, margin:'4px 0 4px' }}>{s.title}</h3>
                  <p className="muted" style={{ fontSize:13.5 }}>{s.desc}</p>
                </div>
                {chip(s.status)}
              </div>
              {(s.status==='In Progress' || s.progress>0) && <div style={{ marginTop:14 }}><div className="between" style={{ fontSize:12.5, marginBottom:6 }}><span className="muted">Progress</span><b className="num">{s.progress}%</b></div><Bar value={s.progress} tone={s.status==='Completed'?'green':''}/></div>}
              <div className="rm-meta">
                <div><div className="eyebrow">Estimated time</div><b>{s.time}</b></div>
                <div><div className="eyebrow">Skill gained</div><b>{s.gained}</b></div>
                <div><div className="eyebrow">Resources</div><b>{s.resources ? `${s.resources} items` : 'Assessment'}</b></div>
                <div style={{ alignSelf:'end' }}>
                  {to ? <A to={to} className={`btn btn-sm ${cls==='cur'?'btn-primary':'btn-secondary'}`}>{s.status==='In Progress'?'Continue':s.status==='Completed'?'Review':'View'}<Icon name="arrow-right"/></A>
                    : <span className="faint" style={{ fontSize:12.5 }}>Unlocks after step 04</span>}
                </div>
              </div>
            </div>
          </div>);})}
      </div>
      <div style={{ position:'sticky', top:84 }}>
        <div className="card card-pad">
          <div className="eyebrow">Career</div>
          <div className="row" style={{ marginTop:8 }}><div className="icon-tile"><Icon name={role.icon}/></div><b style={{ fontSize:18 }}>{role.title}</b></div>
          <div className="divider"/>
          <div className="between" style={{ fontSize:13, marginBottom:6 }}><span className="muted">Path complete</span><b className="num">{learningProgress}%</b></div>
          <Bar value={learningProgress}/>
          <div className="between" style={{ fontSize:13, margin:'16px 0 6px' }}><span className="muted">Career readiness</span><b className="num">{readiness}%</b></div>
          <Bar value={readiness} tone="green"/>
          <div className="divider"/>
          <div className="between" style={{ fontSize:13 }}><span className="muted">Estimated completion</span><b>Dec 2026</b></div>
          <div className="between" style={{ fontSize:13, marginTop:8 }}><span className="muted">Weekly pace</span><b>6 hrs / week</b></div>
          <A to="/career-readiness" className="btn btn-secondary btn-block" style={{ marginTop:18 }}>Career Readiness</A>
        </div>
        <div className="card card-pad" style={{ marginTop:16 }}>
          <b style={{ fontSize:14 }}>Recommended project</b>
          <p className="muted" style={{ fontSize:13, margin:'4px 0 12px' }}>Student Performance Analytics · SQL, Excel</p>
          <A to="/projects/student-performance-analytics" className="link">View Project<Icon name="arrow-right"/></A>
        </div>
      </div>
    </div>
  </>);
}

/* ================= YOUTUBE VIDEO PLAYER ================= */
function YouTubeIcon({ size = 16, style }){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" fill="#EF4444"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#FFFFFF"/>
    </svg>
  );
}

function YouTubeVideoPlayer({ video, allVideos, onSelectVideo, onComplete, isCompleted, onClose }){
  if (!video || !video.youtubeId) return null;
  const [viewMode, setViewMode] = useState('balanced'); // 'balanced' | 'theater' | 'compact'
  const currentIndex = allVideos.findIndex(v => (v.youtubeId === video.youtubeId || v.id === video.id));
  const nextVideo = currentIndex >= 0 && currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null;

  return (
    <div className="yt-player-card reveal" id="yt-player-section">
      <div className="yt-player-header">
        <div className="row" style={{ gap:10, flexWrap:'wrap', alignItems:'center' }}>
          <span className="yt-badge">
            <YouTubeIcon size={15}/> YouTube Lecture
          </span>
          {video.views && (
            <span className="yt-views-badge">
              <Icon name="flame" size={13} style={{ color:'#EF4444' }}/> {video.views}
            </span>
          )}
          {video.isFamous && (
            <span className="yt-famous-tag">Famous Lecture</span>
          )}
          <b style={{ fontSize:14.5, color:'var(--ink)' }}>{video.title}</b>
        </div>
        <div className="row" style={{ gap:8, alignItems:'center', flexWrap:'wrap' }}>
          {/* Size / Space Management View Switcher */}
          <div className="yt-view-switcher" role="group" aria-label="Player view mode">
            <button
              type="button"
              className={`yt-view-btn ${viewMode === 'balanced' ? 'active' : ''}`}
              onClick={() => setViewMode('balanced')}
              title="Standard balanced view (Comfortable 16:9, non-zoomed)"
            >
              <Icon name="monitor" size={12}/> Standard
            </button>
            <button
              type="button"
              className={`yt-view-btn ${viewMode === 'theater' ? 'active' : ''}`}
              onClick={() => setViewMode('theater')}
              title="Theater wide view"
            >
              <Icon name="maximize-2" size={12}/> Theater
            </button>
            <button
              type="button"
              className={`yt-view-btn ${viewMode === 'compact' ? 'active' : ''}`}
              onClick={() => setViewMode('compact')}
              title="Compact focused view"
            >
              <Icon name="minimize-2" size={12}/> Compact
            </button>
          </div>

          <a
            href={video.url || `https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-sm"
            title="Open on YouTube"
          >
            <Icon name="external-link" size={14}/> YouTube
          </a>
          {onClose && (
            <button className="btn btn-ghost btn-sm" onClick={onClose} title="Hide player">
              <Icon name="x" size={15}/>
            </button>
          )}
        </div>
      </div>

      {/* Balanced, cinema-proportioned video stage (prevents oversized/zoomed-in rendering) */}
      <div className="yt-stage">
        <div className={`yt-frame-wrap ${viewMode}`}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <div className="yt-player-footer">
        <div className="between" style={{ alignItems:'flex-start', flexWrap:'wrap', gap:12 }}>
          <div>
            <div className="row" style={{ gap:8, fontSize:12.5, color:'var(--ink-2)', marginBottom:4, flexWrap:'wrap' }}>
              <b>{video.provider}</b>
              <span>•</span>
              {video.views && (
                <>
                  <span className="yt-views-badge" style={{ padding:'2px 7px', fontSize:11 }}>
                    <Icon name="flame" size={11} style={{ color:'#EF4444' }}/> {video.views}
                  </span>
                  <span>•</span>
                </>
              )}
              <span>{video.duration}</span>
              <span>•</span>
              {diffChip(video.difficulty || 'Beginner')}
            </div>
            <p className="muted" style={{ fontSize:13, margin:0, maxWidth:620 }}>
              {video.description || 'Watch the lecture video above and follow along with practical code examples.'}
            </p>
          </div>
          <div className="row" style={{ gap:8, flexWrap:'wrap' }}>
            <button
              className={`btn btn-sm ${isCompleted ? 'btn-success' : 'btn-primary'}`}
              onClick={() => onComplete(video)}
            >
              {isCompleted ? <><Icon name="check"/>Completed</> : <><Icon name="check-circle"/>Mark as Completed</>}
            </button>
            {nextVideo && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onSelectVideo(nextVideo)}
              >
                Next Lecture <Icon name="arrow-right" size={14}/>
              </button>
            )}
          </div>
        </div>

        {video.lessons && video.lessons.length > 0 && (
          <div style={{ marginTop:12, paddingTop:10, borderTop:'1px solid var(--line-2)' }}>
            <div className="eyebrow" style={{ marginBottom:6, fontSize:10.5 }}>Key Concepts Covered in Lecture</div>
            <div className="row" style={{ flexWrap:'wrap', gap:6 }}>
              {video.lessons.map((l, idx) => (
                <span key={idx} className="tag" style={{ fontSize:11.5, height:24, background:'var(--surface-alt)' }}>
                  <Icon name="check" size={11} style={{ color:'var(--green)', marginRight:4 }}/>
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}

        {allVideos.length > 1 && (
          <div style={{ marginTop:12, paddingTop:10, borderTop:'1px solid var(--line-2)' }}>
            <div className="between" style={{ marginBottom:6 }}>
              <span className="eyebrow" style={{ fontSize:10.5 }}>Module Lectures ({allVideos.length} Available)</span>
              <span className="faint" style={{ fontSize:11.5 }}>Click any lecture to play in balanced player</span>
            </div>
            <div className="yt-playlist-row">
              {allVideos.map(v => {
                const isActive = (v.youtubeId === video.youtubeId || v.id === video.id);
                const thumb = v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
                return (
                  <button
                    key={v.id || v.youtubeId}
                    type="button"
                    className={`yt-playlist-item ${isActive ? 'active' : ''}`}
                    onClick={() => onSelectVideo(v)}
                  >
                    <div className="yt-playlist-thumb">
                      <img src={thumb} alt="" loading="lazy"/>
                      <div className="yt-play-overlay">
                        <div className="yt-play-btn-circle" style={{ width:28, height:28 }}>
                          <Icon name="play" size={13} style={{ marginLeft:2 }}/>
                        </div>
                      </div>
                      {v.views && (
                        <span className="yt-views-pill" style={{ fontSize:9.5, padding:'1px 5px' }}>
                          <Icon name="flame" size={9}/> {v.views}
                        </span>
                      )}
                      <span className="yt-duration-pill">{v.duration}</span>
                    </div>
                    <div style={{ padding:'6px 8px' }}>
                      <div style={{ fontSize:12, fontWeight:600, lineHeight:1.25, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                        {v.title}
                      </div>
                      <div className="between" style={{ marginTop:3 }}>
                        <span className="faint" style={{ fontSize:10.5 }}>{v.provider}</span>
                        {v.isFamous && <span className="yt-famous-tag" style={{ fontSize:8.5, padding:'1px 4px' }}>Famous</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= ARTICLE READER MODAL ================= */
function ArticleReaderModal({ article, onClose, onComplete, isCompleted }){
  if (!article) return null;
  const content = article.fullContent || {};
  const sections = content.sections || [];

  return (
    <div className="app-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="app-modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="app-modal-header">
          <div className="row" style={{ gap:10, flexWrap:'wrap', alignItems:'center' }}>
            <span className="res-type-badge article">
              <Icon name="file-text" size={13}/> Article & Guide
            </span>
            <span className="faint" style={{ fontSize:12 }}>{article.duration || '8 min read'}</span>
            {diffChip(article.difficulty || 'Beginner')}
            <b style={{ fontSize:15, color:'var(--ink)' }}>{article.title}</b>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose} title="Close article">
            <Icon name="x" size={16}/>
          </button>
        </div>

        <div className="app-modal-body">
          <div className="row" style={{ gap:8, fontSize:12.5, color:'var(--ink-2)', marginBottom:16 }}>
            <span>By <b>{article.provider}</b></span>
            <span>•</span>
            <span>{article.views || 'Verified Learning Resource'}</span>
          </div>

          {article.takeaways && article.takeaways.length > 0 && (
            <div style={{ background:'var(--surface-alt)', border:'1px solid var(--line)', borderRadius:8, padding:'14px 16px', marginBottom:18 }}>
              <b style={{ fontSize:13, display:'block', marginBottom:8, color:'var(--ink)' }}>
                <Icon name="sparkles" size={13} style={{ color:'var(--blue)', marginRight:6 }}/> Key Takeaways
              </b>
              <ul style={{ margin:0, paddingLeft:20, fontSize:13, color:'var(--ink-2)', lineHeight:1.55 }}>
                {article.takeaways.map((t, idx) => (
                  <li key={idx} style={{ marginBottom:4 }}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {content.intro && (
            <div className="reader-article-intro">
              {content.intro}
            </div>
          )}

          {sections.map((sec, idx) => (
            <div key={idx} style={{ marginBottom:18 }}>
              <h3 className="reader-section-title">{sec.heading}</h3>
              <div className="reader-section-text">{sec.text}</div>
            </div>
          ))}

          {!content.intro && !sections.length && (
            <p style={{ fontSize:14, lineHeight:1.6, color:'var(--ink-2)' }}>
              {article.description}
            </p>
          )}
        </div>

        <div className="app-modal-footer">
          <div className="row" style={{ gap:8 }}>
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <Icon name="external-link" size={13}/> Official Reference
              </a>
            )}
          </div>
          <div className="row" style={{ gap:8 }}>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              Done Reading
            </button>
            <button
              className={`btn btn-sm ${isCompleted ? 'btn-success' : 'btn-primary'}`}
              onClick={() => onComplete(article)}
            >
              {isCompleted ? <><Icon name="check"/>Completed</> : <><Icon name="check-circle"/>Mark as Read (+25%)</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= ASSIGNMENT WORKSPACE MODAL ================= */
function AssignmentWorkspaceModal({ assignment, onClose, onComplete, isCompleted }){
  if (!assignment) return null;
  const [tab, setTab] = useState('problem'); // 'problem' | 'solution'
  const [checkedTasks, setCheckedTasks] = useState({});

  const toggleTask = (idx) => {
    setCheckedTasks(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const tasks = assignment.tasks || [];
  const starter = assignment.starterDataset || {};
  const sol = assignment.solution || {};

  return (
    <div className="app-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="app-modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="app-modal-header">
          <div className="row" style={{ gap:10, flexWrap:'wrap', alignItems:'center' }}>
            <span className="res-type-badge assignment">
              <Icon name="code-2" size={13}/> Hands-on Assignment
            </span>
            <span className="faint" style={{ fontSize:12 }}>{assignment.duration || '30 mins'}</span>
            {diffChip(assignment.difficulty || 'Intermediate')}
            <b style={{ fontSize:15, color:'var(--ink)' }}>{assignment.title}</b>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose} title="Close assignment">
            <Icon name="x" size={16}/>
          </button>
        </div>

        {/* Modal Tabs */}
        <div style={{ display:'flex', borderBottom:'1px solid var(--line)', background:'var(--surface-alt)', padding:'0 16px' }}>
          <button
            className={`btn btn-ghost btn-sm ${tab === 'problem' ? 'active' : ''}`}
            onClick={() => setTab('problem')}
            style={{ borderRadius:0, borderBottom: tab === 'problem' ? '2px solid var(--blue)' : '2px solid transparent', color: tab === 'problem' ? 'var(--blue)' : 'var(--ink-2)', fontWeight:600 }}
          >
            <Icon name="file-text" size={14}/> Problem & Dataset ({tasks.length} Tasks)
          </button>
          <button
            className={`btn btn-ghost btn-sm ${tab === 'solution' ? 'active' : ''}`}
            onClick={() => setTab('solution')}
            style={{ borderRadius:0, borderBottom: tab === 'solution' ? '2px solid var(--blue)' : '2px solid transparent', color: tab === 'solution' ? 'var(--blue)' : 'var(--ink-2)', fontWeight:600 }}
          >
            <Icon name="check-circle-2" size={14}/> Model Solution & Walkthrough
          </button>
        </div>

        <div className="app-modal-body">
          {tab === 'problem' ? (
            <>
              {assignment.scenario && (
                <div className="assign-scenario-box">
                  <div className="eyebrow" style={{ marginBottom:4, color:'var(--ink)' }}>Business Scenario & Context</div>
                  <p style={{ fontSize:13.5, margin:0, color:'var(--ink-2)', lineHeight:1.55 }}>
                    {assignment.scenario}
                  </p>
                </div>
              )}

              {starter.tables && (
                <div style={{ marginBottom:16 }}>
                  <div className="eyebrow" style={{ marginBottom:4 }}>Dataset Schema & Sample Rows</div>
                  <div className="assign-code-preview">
                    {starter.tables.join('\n')}
                    {starter.sampleRows && `\n\nSample Rows:\n${starter.sampleRows}`}
                  </div>
                </div>
              )}

              <div style={{ marginBottom:16 }}>
                <div className="eyebrow" style={{ marginBottom:8 }}>Required Tasks (Tick off as you solve)</div>
                {tasks.map((task, idx) => {
                  const isChecked = Boolean(checkedTasks[idx]);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTask(idx)}
                      style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'8px 12px', borderRadius:6, cursor:'pointer', background: isChecked ? 'var(--surface-alt)' : 'transparent', marginBottom:4, border:'1px solid', borderColor: isChecked ? 'var(--line-2)' : 'transparent' }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ marginTop:3 }}
                      />
                      <span style={{ fontSize:13, color: isChecked ? 'var(--ink-3)' : 'var(--ink)', textDecoration: isChecked ? 'line-through' : 'none', lineHeight:1.45 }}>
                        {task}
                      </span>
                    </div>
                  );
                })}
              </div>

              {assignment.hints && assignment.hints.length > 0 && (
                <details style={{ background:'var(--surface-alt)', border:'1px solid var(--line)', borderRadius:8, padding:'10px 14px' }}>
                  <summary style={{ cursor:'pointer', fontWeight:600, fontSize:12.5, color:'var(--blue)' }}>
                    💡 Need a Hint? Click to reveal guidance
                  </summary>
                  <ul style={{ margin:'8px 0 0', paddingLeft:18, fontSize:12.5, color:'var(--ink-2)' }}>
                    {assignment.hints.map((h, i) => (
                      <li key={i} style={{ marginBottom:4 }}>{h}</li>
                    ))}
                  </ul>
                </details>
              )}
            </>
          ) : (
            <div>
              <div className="eyebrow" style={{ marginBottom:6 }}>Model Solution Code & Query</div>
              <div className="assign-code-preview" style={{ maxHeight:260 }}>
                {sol.code || 'Solution walkthrough available upon review.'}
              </div>

              {sol.explanation && (
                <div style={{ marginTop:14, padding:'12px 14px', background:'var(--surface-alt)', borderRadius:8, border:'1px solid var(--line)' }}>
                  <b style={{ fontSize:13, display:'block', marginBottom:4 }}>Explanation & Performance Analysis</b>
                  <p style={{ fontSize:13, margin:0, color:'var(--ink-2)', lineHeight:1.5 }}>
                    {sol.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="app-modal-footer">
          <div className="faint" style={{ fontSize:12 }}>
            {Object.values(checkedTasks).filter(Boolean).length} of {tasks.length} tasks ticked
          </div>
          <div className="row" style={{ gap:8 }}>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              Close
            </button>
            <button
              className={`btn btn-sm ${isCompleted ? 'btn-success' : 'btn-primary'}`}
              onClick={() => onComplete(assignment)}
            >
              {isCompleted ? <><Icon name="check"/>Completed</> : <><Icon name="check-circle"/>Mark as Solved (+25%)</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= TEST SERIES QUIZ RUNNER MODAL ================= */
function TestSeriesRunnerModal({ test, onClose, onComplete, isCompleted }){
  if (!test) return null;
  const questions = test.testQuestions || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const q = questions[currentIdx] || { q:'Question', options:[], answer:0, explanation:'' };
  const hasAnswered = selectedAnswers[currentIdx] !== undefined;

  const handleSelect = (optIdx) => {
    if (hasAnswered) return; // Lock in answer once selected
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const score = Object.entries(selectedAnswers).reduce((acc, [idx, ans]) => {
    return acc + (questions[idx] && questions[idx].answer === ans ? 1 : 0);
  }, 0);
  const scorePct = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const isPassed = scorePct >= (test.passScore || 80);

  const finishTest = () => {
    setShowResult(true);
    if (isPassed) {
      onComplete(test);
    }
  };

  const retakeTest = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResult(false);
  };

  return (
    <div className="app-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="app-modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="app-modal-header">
          <div className="row" style={{ gap:10, flexWrap:'wrap', alignItems:'center' }}>
            <span className="res-type-badge test">
              <Icon name="check-square" size={13}/> Test Series
            </span>
            <span className="faint" style={{ fontSize:12 }}>{test.duration || '12 mins'}</span>
            <span className="chip chip-gray" style={{ fontSize:11 }}>Pass: {test.passScore || 80}%</span>
            <b style={{ fontSize:15, color:'var(--ink)' }}>{test.title}</b>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose} title="Close test">
            <Icon name="x" size={16}/>
          </button>
        </div>

        <div className="app-modal-body">
          {showResult ? (
            <div style={{ textAlign:'center', padding:'20px 10px' }}>
              <div style={{ display:'inline-flex', padding:14, borderRadius:'50%', background: isPassed ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: isPassed ? 'var(--green)' : 'var(--red)', marginBottom:12 }}>
                <Icon name={isPassed ? 'badge-check' : 'alert-circle'} size={40}/>
              </div>
              <h2 style={{ fontSize:24, fontWeight:800, margin:'4px 0 6px' }}>
                {isPassed ? 'Test Passed! 🎉' : 'Needs Practice'}
              </h2>
              <div style={{ fontSize:48, fontWeight:800, margin:'10px 0', color: isPassed ? 'var(--green)' : 'var(--ink)' }}>
                {scorePct}%
              </div>
              <p className="muted" style={{ fontSize:14, margin:'0 0 20px' }}>
                You scored {score} out of {questions.length} questions correctly.
                {isPassed ? ' Your skill level and test series progress have been recorded.' : ' Review the explanations below and give it another try.'}
              </p>

              <div style={{ display:'flex', justifyContent:'center', gap:10, flexWrap:'wrap' }}>
                <button className="btn btn-secondary" onClick={retakeTest}>
                  <Icon name="rotate-ccw" size={14}/> Retake Test
                </button>
                <button className="btn btn-primary" onClick={onClose}>
                  Complete & Return
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Question progress dots */}
              <div style={{ display:'flex', gap:6, marginBottom:16 }}>
                {questions.map((_, idx) => {
                  const isCurrent = idx === currentIdx;
                  const isAns = selectedAnswers[idx] !== undefined;
                  const isCorrect = isAns && questions[idx].answer === selectedAnswers[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      style={{
                        flex:1,
                        height:7,
                        borderRadius:3,
                        border:0,
                        cursor:'pointer',
                        background: isCurrent ? 'var(--blue)' : isAns ? (isCorrect ? 'var(--green)' : 'var(--red)') : 'var(--line-2)'
                      }}
                      title={`Question ${idx + 1}`}
                    />
                  );
                })}
              </div>

              <div className="between" style={{ marginBottom:12 }}>
                <span className="eyebrow">Question {currentIdx + 1} of {questions.length}</span>
                <span className="faint" style={{ fontSize:12 }}>{answeredCount} of {questions.length} answered</span>
              </div>

              <div className="test-quiz-q-box">
                <h3 style={{ fontSize:16, fontWeight:700, lineHeight:1.45, margin:'0 0 16px', color:'var(--ink)' }}>
                  {q.q}
                </h3>

                <div>
                  {(q.options || []).map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentIdx] === optIdx;
                    let optClass = 'test-opt-item';
                    if (hasAnswered) {
                      if (optIdx === q.answer) optClass += ' correct';
                      else if (isSelected) optClass += ' wrong';
                    } else if (isSelected) {
                      optClass += ' selected';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        className={optClass}
                        onClick={() => handleSelect(optIdx)}
                      >
                        <span className="test-opt-key">{'ABCD'[optIdx]}</span>
                        <span style={{ flex:1 }}>{opt}</span>
                        {hasAnswered && optIdx === q.answer && (
                          <Icon name="check" size={16} style={{ color:'var(--green)' }}/>
                        )}
                        {hasAnswered && isSelected && optIdx !== q.answer && (
                          <Icon name="x" size={16} style={{ color:'var(--red)' }}/>
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && q.explanation && (
                  <div className="test-explanation-box">
                    <b style={{ display:'block', marginBottom:3, color:'var(--ink)' }}>
                      Explanation:
                    </b>
                    {q.explanation}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {!showResult && (
          <div className="app-modal-footer">
            <button
              className="btn btn-ghost btn-sm"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
            >
              <Icon name="arrow-left" size={13}/> Previous
            </button>
            <div className="row" style={{ gap:8 }}>
              {currentIdx < questions.length - 1 ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  disabled={!hasAnswered}
                >
                  Next Question <Icon name="arrow-right" size={13}/>
                </button>
              ) : (
                <button
                  className="btn btn-success btn-sm"
                  onClick={finishTest}
                  disabled={answeredCount < questions.length}
                >
                  Submit & View Results <Icon name="check" size={13}/>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= RESOURCES ================= */
function Resources({ topic }){
  const { state, update, notify, sqlValidated } = useStore();
  
  // Resolve topic and aliases (e.g. 'power-bi' -> 'powerbi')
  const cleanTopic = (topic || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const resKey = Object.keys(D.resources).find(k => k === topic || k === cleanTopic || k.replace(/[^a-z0-9]/g, '') === cleanTopic) || 'sql';
  const res = D.resources[resKey] || D.resources.sql;

  const [filter, setFilter] = useState('All'); // 'All' | 'Video' | 'Article' | 'Assignment' | 'Test Series' | 'Practice'
  const [practiceSubFilter, setPracticeSubFilter] = useState('all'); // 'all' | 'Assignment' | 'Test Series'
  const [sortBy, setSortBy] = useState('most-viewed');
  const [open, setOpen] = useState(null);
  const [liveVideos, setLiveVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showPlayer, setShowPlayer] = useState(true);
  
  // Interactive Modals State
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [activeTest, setActiveTest] = useState(null);

  const playerRef = useRef(null);

  useEffect(() => {
    setSelectedVideo(null);
    setShowPlayer(true);
  }, [topic]);

  useEffect(() => {
    let cancelled = false;
    const queryMap = {
      sql: 'SQL tutorial for beginners full course',
      python: 'python tutorial beginners full course',
      excel: 'excel tutorial for beginners full course',
      statistics: 'statistics for data analysis full course',
      powerbi: 'power bi tutorial beginners full course',
      'machine-learning': 'machine learning tutorial beginners',
      git: 'git github tutorial beginners',
      c: 'c programming tutorial beginners',
      figma: 'figma tutorial UI UX beginners'
    };
    const query = queryMap[resKey] || (res.title + ' tutorial');
    fetch('/.netlify/functions/youtube-search?q=' + encodeURIComponent(query))
      .then(async response => {
        if (!response.ok) return null;
        return response.json();
      })
      .then(data => {
        if (!cancelled && data && Array.isArray(data.videos) && data.videos.length > 0) {
          setLiveVideos(data.videos);
        }
      })
      .catch(() => { /* Graceful fallback to rich curated YouTube lectures */ });
    return () => { cancelled = true; };
  }, [resKey]);

  if (!res) return <NotFound/>;
  const step = D.roadmap.find(r=>r.id===resKey) || { time:'3 weeks · ~15 hrs', gained:res.title, topics:[] };
  const rp = state.resourceProgress;
  const prog = i => rp[i.id] ?? i.progress ?? 0;

  // Merge static curated items with any live items
  const staticItems = res.items || [];
  const extraLiveItems = liveVideos
    .filter(lv => !staticItems.some(si => si.youtubeId === lv.id))
    .slice(0, 3)
    .map(video => ({
      id: 'youtube-' + video.id,
      type: 'Video',
      icon: 'play-circle',
      title: video.title,
      provider: video.channelTitle,
      difficulty: 'Beginner',
      duration: 'YouTube lecture',
      views: 'YouTube lecture',
      viewCount: 500000,
      youtubeId: video.id,
      progress: rp['youtube-' + video.id] ?? 0,
      lessons: ['Video tutorial', 'Hands-on practice'],
      url: video.url,
      thumbnail: video.thumbnail
    }));

  const allItems = [...staticItems, ...extraLiveItems];
  const videoItems = allItems.filter(i => i.type === 'Video' || i.type === 'Course' || i.youtubeId);
  const articleItems = allItems.filter(i => i.type === 'Article');
  const assignmentItems = allItems.filter(i => i.category === 'Assignment');
  const testItems = allItems.filter(i => i.category === 'Test Series');
  const practiceItems = allItems.filter(i => i.type === 'Practice' || i.category === 'Assignment' || i.category === 'Test Series');

  // Filter items based on active tab
  let filteredItems = allItems.filter(i => {
    if (filter === 'All') return true;
    if (filter === 'Video') return i.type === 'Video' || i.type === 'Course' || i.youtubeId;
    if (filter === 'Article') return i.type === 'Article';
    if (filter === 'Assignment') return i.category === 'Assignment';
    if (filter === 'Test Series') return i.category === 'Test Series';
    if (filter === 'Practice') {
      if (practiceSubFilter === 'Assignment') return i.category === 'Assignment';
      if (practiceSubFilter === 'Test Series') return i.category === 'Test Series';
      return i.type === 'Practice' || i.category === 'Assignment' || i.category === 'Test Series';
    }
    return i.type === filter;
  });

  // Apply sorting
  let sortedItems = [...filteredItems];
  if (sortBy === 'most-viewed') {
    sortedItems.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  } else if (sortBy === 'beginner') {
    sortedItems.sort((a, b) => (a.difficulty === 'Beginner' ? -1 : 1));
  } else if (sortBy === 'duration') {
    sortedItems.sort((a, b) => (a.duration || '').localeCompare(b.duration || ''));
  }

  const overall = Math.round(allItems.reduce((a,i)=>a+prog(i),0)/Math.max(1,allItems.length));

  // Determine active video for the embedded YouTube player
  const defaultVideo = videoItems.find(v => v.youtubeId === res.featuredYoutubeId) || videoItems[0];
  const activeVideo = selectedVideo || defaultVideo;

  // Highest viewed lecture in this topic for the spotlight banner
  const famousSpotlight = [...videoItems].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))[0];

  const start = i => {
    const p = Math.min(100, prog(i) + (prog(i)>=100?0: prog(i)>=70?30:25));
    update({ resourceProgress:{ ...rp, [i.id]: p } });
    notify(p>=100 ? `Completed: ${i.title}` : `Progress saved · ${p}%`);
  };

  const selectAndPlayVideo = (v) => {
    setSelectedVideo(v);
    setShowPlayer(true);
    if (filter !== 'All' && filter !== 'Video' && (v.type === 'Video' || v.type === 'Course')) {
      setFilter('Video');
    }
    setTimeout(() => {
      const el = document.getElementById('yt-player-section');
      if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 50);
  };

  const handleTabClick = (tab) => {
    setFilter(tab);
    if (tab === 'Video' && !showPlayer) {
      setShowPlayer(true);
    }
  };

  const markVideoCompleted = (v) => {
    const currentP = prog(v);
    const newP = currentP >= 100 ? 0 : 100;
    update({ resourceProgress:{ ...rp, [v.id]: newP } });
    notify(newP === 100 ? `Completed: ${v.title}` : `Marked incomplete: ${v.title}`);
  };

  return (<>
    <S1Style/>
    <PageHead
      crumbs={[{label:'My Learning',to:'/learning'},{label:res.title}]}
      title={res.title}
      sub={`${step.time} · ${step.gained}`}
      right={resKey==='sql' && <A to="/assessment" className="btn btn-secondary"><Icon name="clipboard-check"/>Take SQL Assessment</A>}
    />

    {/* All Skills Fast Switcher Bar */}
    <div className="yt-skill-bar" role="navigation" aria-label="Course skills switcher">
      {Object.entries(D.resources).map(([k, sRes]) => {
        const isActive = resKey === k;
        const topItem = (sRes.items || []).find(it => it.views);
        return (
          <A
            key={k}
            to={`/learning/${k}`}
            className={`yt-skill-chip ${isActive ? 'active' : ''}`}
            title={`View ${sRes.title} resources`}
          >
            <span>{sRes.title.split(' ')[0]}</span>
            {topItem && <span style={{ opacity:0.8, fontSize:11 }}>({topItem.views})</span>}
          </A>
        );
      })}
    </div>

    <div className="res-wrap">
      <div>
        {/* Compact Why recommended for role banner */}
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:8, background:'var(--blue-50)', border:'1px solid var(--blue-100)', marginBottom:12 }}>
          <div className="icon-tile" style={{ width:28, height:28, background:'var(--surface)' }}><Icon name="lightbulb" size={15}/></div>
          <p style={{ margin:0, fontSize:13, color:'var(--ink-2)', lineHeight:1.4 }}>
            <b style={{ color:'var(--ink)' }}>Why this is recommended: </b>
            {res.why}
          </p>
        </div>

        {/* Top Famous Lecture Spotlight Banner */}
        {famousSpotlight && famousSpotlight.views && (
          <div className="yt-spotlight-card reveal">
            <div className="row" style={{ gap:10, flexWrap:'wrap', alignItems:'center' }}>
              <span className="yt-famous-tag">🔥 Most Viewed Lecture</span>
              <div>
                <b style={{ fontSize:13.5, display:'block' }}>{famousSpotlight.title}</b>
                <div className="faint" style={{ fontSize:11.5, marginTop:1 }}>
                  {famousSpotlight.provider} • <span className="yt-views-badge" style={{ padding:'1px 5px', fontSize:10.5 }}><Icon name="flame" size={10}/> {famousSpotlight.views}</span> • {famousSpotlight.duration}
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => selectAndPlayVideo(famousSpotlight)}
              style={{ whiteSpace:'nowrap', fontSize:12.5 }}
            >
              <Icon name="play" size={13}/> Watch Lecture
            </button>
          </div>
        )}

        {/* Embedded Balanced YouTube Video Player Section */}
        {showPlayer && activeVideo && (
          <div ref={playerRef}>
            <YouTubeVideoPlayer
              video={activeVideo}
              allVideos={videoItems}
              onSelectVideo={selectAndPlayVideo}
              onComplete={markVideoCompleted}
              isCompleted={prog(activeVideo) >= 100}
              onClose={() => setShowPlayer(false)}
            />
          </div>
        )}

        {/* Tabs for Resource Types (Videos, Articles, Assignments, Test Series) */}
        <div className="tabs" role="tablist">
          {[
            { id:'All', label:'All', count: allItems.length },
            { id:'Video', label:'Video Lectures', count: videoItems.length, icon:'play' },
            { id:'Article', label:'Articles & Guides', count: articleItems.length, icon:'file-text' },
            { id:'Assignment', label:'Assignments', count: assignmentItems.length, icon:'code-2' },
            { id:'Test Series', label:'Test Series', count: testItems.length, icon:'check-square' },
            { id:'Practice', label:'All Practice', count: practiceItems.length, icon:'cpu' },
          ].map(t => {
            const isSelected = filter === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isSelected}
                className={isSelected ? 'on' : ''}
                onClick={() => handleTabClick(t.id)}
              >
                {t.id === 'Video' ? <YouTubeIcon size={13} style={{ marginRight:4 }}/> : null}
                {t.label}
                <span className="faint" style={{ marginLeft:5 }}>{t.count}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-filter if 'Practice' tab is selected */}
        {filter === 'Practice' && (
          <div style={{ display:'flex', gap:6, marginBottom:12, alignItems:'center' }}>
            <span className="faint" style={{ fontSize:12 }}>Filter Practice:</span>
            {[
              { id:'all', label:`All (${practiceItems.length})` },
              { id:'Assignment', label:`Assignments (${assignmentItems.length})` },
              { id:'Test Series', label:`Test Series (${testItems.length})` },
            ].map(sub => (
              <button
                key={sub.id}
                type="button"
                className={`yt-sort-pill ${practiceSubFilter === sub.id ? 'active' : ''}`}
                onClick={() => setPracticeSubFilter(sub.id)}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* Sort & Filter by Views Bar */}
        <div className="yt-sort-bar">
          <div className="row" style={{ gap:6, flexWrap:'wrap', alignItems:'center' }}>
            <span className="faint" style={{ fontSize:11.5, fontWeight:600 }}>Sort By:</span>
            <button
              className={`yt-sort-pill ${sortBy === 'most-viewed' ? 'active' : ''}`}
              onClick={() => setSortBy('most-viewed')}
            >
              <Icon name="flame" size={12} style={{ color:'#EF4444' }}/> Most Viewed / Popular
            </button>
            <button
              className={`yt-sort-pill ${sortBy === 'recommended' ? 'active' : ''}`}
              onClick={() => setSortBy('recommended')}
            >
              <Icon name="sparkles" size={12} style={{ color:'var(--blue)' }}/> Curriculum Order
            </button>
            <button
              className={`yt-sort-pill ${sortBy === 'beginner' ? 'active' : ''}`}
              onClick={() => setSortBy('beginner')}
            >
              <Icon name="award" size={12}/> Beginner First
            </button>
          </div>
          <span className="faint" style={{ fontSize:11.5 }}>
            {sortedItems.length} resources listed
          </span>
        </div>

        {sortedItems.length === 0 ? (
          <div className="card card-pad" style={{ textAlign:'center', padding:40 }}>
            <div className="icon-tile gray" style={{ margin:'0 auto 12px' }}><Icon name="inbox"/></div>
            <b>No {filter.toLowerCase()} resources for this module yet</b>
            <p className="faint" style={{ fontSize:13, marginTop:4 }}>Check other tabs to continue your learning path.</p>
          </div>
        ) : (
          <div className="res-grid">
            {sortedItems.map(i => {
              const p = prog(i);
              const hasYouTube = Boolean(i.youtubeId);
              const isVideo = i.type === 'Video' || i.type === 'Course' || hasYouTube;
              const isArticle = i.type === 'Article';
              const isAssignment = i.category === 'Assignment';
              const isTestSeries = i.category === 'Test Series';
              const isPlaying = activeVideo && (activeVideo.id === i.id || activeVideo.youtubeId === i.youtubeId);
              const thumbUrl = i.thumbnail || (i.youtubeId ? `https://img.youtube.com/vi/${i.youtubeId}/hqdefault.jpg` : null);

              let badgeType = 'video';
              let badgeLabel = 'YouTube Lecture';
              let badgeIcon = 'play';

              if (isArticle) {
                badgeType = 'article';
                badgeLabel = 'Article & Guide';
                badgeIcon = 'file-text';
              } else if (isAssignment) {
                badgeType = 'assignment';
                badgeLabel = 'Hands-on Assignment';
                badgeIcon = 'code-2';
              } else if (isTestSeries) {
                badgeType = 'test';
                badgeLabel = 'Test Series & Quiz';
                badgeIcon = 'check-square';
              }

              return (
                <div key={i.id} className={`card card-hover res-card ${isPlaying && showPlayer ? 'ring-2' : ''}`} style={isPlaying && showPlayer ? { borderColor:'var(--blue)' } : {}}>
                  <div className="between">
                    <span className={`res-type-badge ${badgeType}`}>
                      {hasYouTube ? <YouTubeIcon size={14}/> : <Icon name={badgeIcon} size={13}/>}
                      {badgeLabel}
                    </span>
                    <div className="row" style={{ gap:6 }}>
                      {i.isFamous && <span className="yt-famous-tag">Famous</span>}
                      {diffChip(i.difficulty)}
                    </div>
                  </div>

                  {/* Video Thumbnail (for videos) */}
                  {thumbUrl && (
                    <div
                      className="yt-card-thumb-wrap"
                      onClick={() => selectAndPlayVideo(i)}
                      title={`Play ${i.title}`}
                      role="button"
                      tabIndex={0}
                    >
                      <img src={thumbUrl} alt={i.title} loading="lazy"/>
                      <div className="yt-play-overlay">
                        <div className="yt-play-btn-circle">
                          <Icon name="play" size={16} style={{ marginLeft:2 }}/>
                        </div>
                      </div>
                      {i.views && (
                        <span className="yt-views-pill">
                          <Icon name="flame" size={10} style={{ color:'#F59E0B' }}/> {i.views}
                        </span>
                      )}
                      <span className="yt-duration-pill">{i.duration}</span>
                    </div>
                  )}

                  <b style={{ fontSize:15, margin:'12px 0 4px', lineHeight:1.35 }}>{i.title}</b>
                  <div className="row" style={{ gap:6, fontSize:12, color:'var(--ink-2)', flexWrap:'wrap' }}>
                    <span className="faint">{i.provider}</span>
                    {i.views && (
                      <>
                        <span>•</span>
                        <span className="yt-views-badge" style={{ fontSize:10.5, padding:'1px 6px' }}>
                          <Icon name="flame" size={10}/> {i.views}
                        </span>
                      </>
                    )}
                    <span>•</span>
                    <span className="faint">{i.duration}</span>
                  </div>

                  {i.description && (
                    <p className="muted" style={{ fontSize:12.5, margin:'8px 0 0', lineHeight:1.4 }}>
                      {i.description}
                    </p>
                  )}

                  {/* Article Takeaways Preview */}
                  {isArticle && i.takeaways && i.takeaways.length > 0 && (
                    <ul className="takeaways-list">
                      {i.takeaways.slice(0, 2).map((tk, k) => (
                        <li key={k} className="takeaways-item">
                          <Icon name="check" size={13} style={{ color:'var(--green)', flexShrink:0, marginTop:2 }}/>
                          <span>{tk}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Assignment Task Count Preview */}
                  {isAssignment && i.tasks && (
                    <div style={{ marginTop:10, fontSize:12, color:'var(--ink-2)', background:'var(--surface-alt)', padding:'6px 10px', borderRadius:6 }}>
                      <Icon name="list-checks" size={13} style={{ marginRight:6, color:'var(--blue)' }}/>
                      {i.tasks.length} guided tasks with problem dataset & model solution
                    </div>
                  )}

                  {/* Test Series Info Preview */}
                  {isTestSeries && i.testQuestions && (
                    <div style={{ marginTop:10, fontSize:12, color:'var(--ink-2)', background:'var(--surface-alt)', padding:'6px 10px', borderRadius:6 }}>
                      <Icon name="clock" size={13} style={{ marginRight:6, color:'var(--purple, #8B5CF6)' }}/>
                      {i.testQuestions.length} multiple choice questions · Pass mark {i.passScore || 80}%
                    </div>
                  )}

                  {open===i.id && i.lessons && i.lessons.length>0 && (
                    <ul style={{ margin:'10px 0 0', padding:0, listStyle:'none' }}>
                      {i.lessons.map((l,k) => (
                        <li key={l} className="row" style={{ fontSize:12.5, gap:7, padding:'4px 0', color: k < Math.round(i.lessons.length*p/100) ? 'var(--ink)' : 'var(--ink-3)' }}>
                          {k < Math.round(i.lessons.length*p/100) ? <Icon name="check-circle-2" size={14} style={{ color:'var(--green)' }}/> : <Icon name="circle" size={14}/>}
                          {l}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div style={{ flex:1, minHeight:12 }}/>
                  <div className="between" style={{ fontSize:12, margin:'12px 0 4px' }}>
                    <span className="muted">Progress</span>
                    <b className="num">{p}%</b>
                  </div>
                  <Bar value={p} size="sm" tone={p>=100?'green':''}/>

                  <div className="row" style={{ marginTop:12, flexWrap:'wrap', gap:6 }}>
                    {isVideo ? (
                      <>
                        <button
                          className={`btn btn-sm ${isPlaying && showPlayer ? 'btn-secondary' : 'btn-primary'}`}
                          onClick={() => selectAndPlayVideo(i)}
                        >
                          <Icon name="play" size={13}/>
                          {isPlaying && showPlayer ? 'Playing' : 'Watch Video'}
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => start(i)}
                          title="Update progress"
                        >
                          {p >= 100 ? <Icon name="check" style={{ color:'var(--green)' }}/> : '+25%'}
                        </button>
                        {i.url && (
                          <a
                            className="btn btn-ghost btn-sm"
                            href={i.url}
                            target="_blank"
                            rel="noreferrer"
                            title="Open in YouTube"
                          >
                            <Icon name="external-link" size={13}/>
                          </a>
                        )}
                      </>
                    ) : isArticle ? (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setActiveArticle(i)}
                        >
                          <Icon name="book-open" size={13}/> Read Article
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => start(i)}
                          title="Update progress"
                        >
                          {p >= 100 ? <Icon name="check" style={{ color:'var(--green)' }}/> : '+25%'}
                        </button>
                      </>
                    ) : isAssignment ? (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setActiveAssignment(i)}
                        >
                          <Icon name="code-2" size={13}/> Solve Assignment
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => start(i)}
                          title="Update progress"
                        >
                          {p >= 100 ? <Icon name="check" style={{ color:'var(--green)' }}/> : '+25%'}
                        </button>
                      </>
                    ) : isTestSeries ? (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setActiveTest(i)}
                        >
                          <Icon name="check-square" size={13}/> Take Test
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => start(i)}
                          title="Update progress"
                        >
                          {p >= 100 ? <Icon name="check" style={{ color:'var(--green)' }}/> : '+25%'}
                        </button>
                      </>
                    ) : (
                      <button
                        className={`btn btn-sm ${p>=100?'btn-secondary':'btn-primary'}`}
                        onClick={()=>start(i)}
                      >
                        {p>=100 ? <><Icon name="check"/>Completed</> : p>0 ? 'Continue' : 'Start Learning'}
                      </button>
                    )}

                    {i.lessons && i.lessons.length > 0 && (
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={()=>setOpen(open===i.id?null:i.id)}
                        aria-expanded={open===i.id}
                      >
                        {open===i.id?'Hide':'Syllabus'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Right Sidebar with Module Breakdown */}
      <div style={{ position:'sticky', top:84 }}>
        <div className="card card-pad">
          <div className="row" style={{ gap:14 }}>
            <Ring value={resKey==='sql'&&sqlValidated?100:overall} size={74} stroke={7}/>
            <div>
              <b style={{ fontSize:15 }}>Module Progress</b>
              <div className="faint" style={{ fontSize:12 }}>{allItems.filter(i=>prog(i)>=100).length} of {allItems.length} completed</div>
            </div>
          </div>
          
          <div className="divider" style={{ margin:'14px 0' }}/>
          
          {/* Content Breakdown counts */}
          <div className="eyebrow" style={{ marginBottom:8 }}>Topic Resource Breakdown</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6, fontSize:12.5 }}>
            <div className="between">
              <span className="row" style={{ gap:6 }}><YouTubeIcon size={14}/> Video Lectures</span>
              <b>{videoItems.filter(i=>prog(i)>=100).length} / {videoItems.length}</b>
            </div>
            <div className="between">
              <span className="row" style={{ gap:6 }}><Icon name="file-text" size={13} style={{ color:'var(--blue)' }}/> Articles & Guides</span>
              <b>{articleItems.filter(i=>prog(i)>=100).length} / {articleItems.length}</b>
            </div>
            <div className="between">
              <span className="row" style={{ gap:6 }}><Icon name="code-2" size={13} style={{ color:'var(--green)' }}/> Hands-on Assignments</span>
              <b>{assignmentItems.filter(i=>prog(i)>=100).length} / {assignmentItems.length}</b>
            </div>
            <div className="between">
              <span className="row" style={{ gap:6 }}><Icon name="check-square" size={13} style={{ color:'var(--purple, #8B5CF6)' }}/> Test Series Quizzes</span>
              <b>{testItems.filter(i=>prog(i)>=100).length} / {testItems.length}</b>
            </div>
          </div>

          <div className="divider" style={{ margin:'14px 0' }}/>
          <div className="eyebrow" style={{ marginBottom:6 }}>You’ll be able to</div>
          <p style={{ fontSize:13, lineHeight:1.45, margin:0, color:'var(--ink-2)' }}>{res.outcome}</p>
          
          <div className="eyebrow" style={{ margin:'14px 0 6px' }}>Key Topics</div>
          {step.topics.map(t=>(
            <div key={t} className="row" style={{ fontSize:13, gap:6, padding:'3px 0' }}>
              <Icon name="dot" size={14} className="faint"/>{t}
            </div>
          ))}

          {resKey==='sql' && <>
            <div className="divider" style={{ margin:'14px 0' }}/>
            {sqlValidated
              ? <div className="row" style={{ color:'var(--green)', fontWeight:700, fontSize:13.5 }}><Icon name="badge-check"/>Validated · Intermediate</div>
              : <><p className="muted" style={{ fontSize:12.5, marginBottom:10 }}>Ready to prove your skills? Take the 10-question assessment.</p><A to="/assessment" className="btn btn-primary btn-block btn-sm">Start SQL Assessment</A></>}
          </>}
        </div>
      </div>
    </div>

    {/* Interactive Modals */}
    {activeArticle && (
      <ArticleReaderModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onComplete={(art) => {
          start(art);
          setActiveArticle(null);
        }}
        isCompleted={prog(activeArticle) >= 100}
      />
    )}

    {activeAssignment && (
      <AssignmentWorkspaceModal
        assignment={activeAssignment}
        onClose={() => setActiveAssignment(null)}
        onComplete={(asgn) => {
          start(asgn);
          setActiveAssignment(null);
        }}
        isCompleted={prog(activeAssignment) >= 100}
      />
    )}

    {activeTest && (
      <TestSeriesRunnerModal
        test={activeTest}
        onClose={() => setActiveTest(null)}
        onComplete={(tst) => {
          start(tst);
          setActiveTest(null);
        }}
        isCompleted={prog(activeTest) >= 100}
      />
    )}
  </>);
}


function NotFound(){
  return <div className="card card-pad" style={{ textAlign:'center', padding:56, maxWidth:520, margin:'40px auto' }}>
    <div className="icon-tile gray" style={{ margin:'0 auto 14px' }}><Icon name="compass"/></div>
    <h2 style={{ fontSize:22 }}>We couldn’t find that page</h2>
    <p className="muted" style={{ margin:'6px 0 20px' }}>It may have moved. Head back to your dashboard to continue.</p>
    <A to="/dashboard" className="btn btn-primary">Go to Dashboard</A>
  </div>;
}

Object.assign(window, { Dashboard, Analysis, SkillGaps, Roadmap, Resources, NotFound, S1Style });
