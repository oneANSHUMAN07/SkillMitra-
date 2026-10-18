/* SkillMitra — Projects, Project Details, Assessment, Career Readiness, Industry Skills, Profile, Settings */
import React, { useState, useEffect, useRef } from 'react';

const s2Css = `
.pj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.pj-card{display:flex;flex-direction:column;overflow:hidden}
.pj-cover{height:120px;background:var(--bg);border-bottom:1px solid var(--line);position:relative;padding:16px;display:flex;align-items:flex-end;gap:5px}
.pj-cover i{flex:1;border-radius:3px 3px 0 0;background:var(--blue-100)}
.pj-body{padding:20px;display:flex;flex-direction:column;flex:1}
.pd-wrap{display:grid;grid-template-columns:1fr 340px;gap:20px;align-items:start}
.ms{display:flex;gap:14px;padding:14px 0;border-top:1px solid var(--line-2);align-items:flex-start}
.ms:first-child{border-top:0}
.ms-check{width:24px;height:24px;border-radius:7px;border:2px solid var(--line);background:var(--surface);display:grid;place-items:center;flex-shrink:0;transition:all .15s;padding:0}
.ms-check.on{background:var(--green);border-color:var(--green);color:#fff}
.ms-check:disabled{cursor:default}
.qz{max-width:760px;margin:0 auto}
.opt-q{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:16px 18px;border:1.5px solid var(--line);border-radius:11px;background:var(--surface);color:var(--ink);font-size:15px;font-weight:500;transition:all .15s;margin-bottom:10px}
.opt-q:hover{border-color:var(--blue-200);background:var(--surface-alt)}
.opt-q.on{border-color:var(--blue);background:var(--blue-50)}
.opt-q .k{width:28px;height:28px;border-radius:7px;border:1.5px solid var(--line);display:grid;place-items:center;font-weight:700;font-size:13px;color:var(--ink-3);flex-shrink:0;font-family:var(--mono)}
.opt-q.on .k{background:var(--blue);border-color:var(--blue);color:#fff}
.qdots{display:flex;gap:4px}
.qdots button{flex:1;height:6px;border-radius:3px;border:0;background:var(--line);padding:0}
.qdots button.ans{background:var(--blue-200)}
.qdots button.cur{background:var(--blue)}
.cr-top{display:grid;grid-template-columns:1fr 1.4fr;gap:20px}
.cr-comp{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.cr-2{display:grid;grid-template-columns:1.2fr 1fr;gap:20px;margin-top:20px}
.role-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.role-card{text-align:left;padding:18px;border:1.5px solid var(--line);border-radius:var(--r-lg);background:var(--surface);color:var(--ink);transition:all .15s;width:100%}
.role-card:hover{border-color:var(--blue-200);background:var(--surface-alt)}
.role-card.on{border-color:var(--blue);box-shadow:0 0 0 3px var(--blue-100)}
.prof{display:grid;grid-template-columns:320px 1fr;gap:20px;align-items:start}
.toggle{width:40px;height:24px;border-radius:99px;background:var(--line);border:0;position:relative;transition:background .15s;flex-shrink:0;padding:0}
.toggle::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
.toggle.on{background:var(--blue)}
.toggle.on::after{transform:translateX(16px)}
@media (max-width:1100px){.pj-grid{grid-template-columns:1fr 1fr}.role-grid{grid-template-columns:1fr 1fr}}
@media (max-width:1024px){.pd-wrap,.cr-top,.cr-2,.prof{grid-template-columns:1fr}.cr-comp{grid-template-columns:1fr 1fr}}
@media (max-width:720px){.pj-grid{grid-template-columns:1fr}.opt-q{padding:14px;font-size:14px}}
`;
function S2Style(){ return <style>{s2Css}</style>; }

/* ================= PROJECTS ================= */
function Projects(){
  const { state } = useStore();
  const [f, setF] = useState('All');
  const list = D.projects.filter(p=>f==='All'||p.difficulty===f);
  const covers = { 'student-performance-analytics':[40,62,48,80,55,70,90], 'sales-dashboard':[30,45,60,52,75,68,85], 'customer-analytics':[70,55,62,40,48,35,30] };
  return (<>
    <S2Style/>
    <PageHead crumbs={[{label:'Dashboard',to:'/dashboard'},{label:'Projects'}]} title="Build Skills Through Projects"
      sub="Turn what you learn into something you can show."
      right={<div className="row" style={{ gap:14 }}><span className="faint" style={{ fontSize:13 }}><b style={{ color:'var(--ink)' }}>{D.completedProjects.length + (state.project.status==='submitted'?1:0)}</b> completed</span><span className="faint" style={{ fontSize:13 }}><b style={{ color:'var(--ink)' }}>1</b> recommended</span></div>}/>
    <div className="tabs" role="tablist">{['All','Beginner','Intermediate'].map(t=><button key={t} role="tab" aria-selected={f===t} className={f===t?'on':''} onClick={()=>setF(t)}>{t}</button>)}</div>
    <div className="pj-grid">
      {list.map(p=>{ const st = p.id==='student-performance-analytics' ? state.project.status : 'not-started'; return (
        <A key={p.id} to={'/projects/'+p.id} className="card card-hover pj-card">
          <div className="pj-cover" aria-hidden="true">
            {covers[p.id].map((h,i)=><i key={i} style={{ height:h+'%', background: i===covers[p.id].length-1 ? 'var(--blue)' : 'var(--blue-100)' }}/>)}
            <div style={{ position:'absolute', top:14, left:16, right:16 }} className="between">
              {p.recommended ? <span className="chip chip-green" style={{ background:'var(--surface)' }}><Icon name="sparkles"/>Recommended · {p.match}% match</span> : <span className="chip chip-gray" style={{ background:'var(--surface)' }}>{p.match}% match</span>}
              {st==='submitted' && <span className="chip chip-green" style={{ background:'var(--surface)' }}><Icon name="check"/>Submitted</span>}
              {st==='in-progress' && <span className="chip chip-blue" style={{ background:'var(--surface)' }}>In progress</span>}
            </div>
          </div>
          <div className="pj-body">
            <h3 style={{ fontSize:18, fontWeight:700 }}>{p.title}</h3>
            <p className="muted" style={{ fontSize:13.5, margin:'6px 0 16px' }}>{p.overview}</p>
            <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap:10, fontSize:13, marginBottom:14 }}>
              <div><div className="eyebrow" style={{ fontSize:10 }}>Difficulty</div><div style={{ marginTop:4 }}>{diffChip(p.difficulty)}</div></div>
              <div><div className="eyebrow" style={{ fontSize:10 }}>Duration</div><b style={{ display:'block', marginTop:5 }}>{p.duration}</b></div>
            </div>
            <div className="eyebrow" style={{ fontSize:10, marginBottom:6 }}>Skills</div>
            <div className="row" style={{ gap:6, flexWrap:'wrap' }}>{p.skills.map(s=><span key={s} className="tag">{s}</span>)}</div>
            <div className="eyebrow" style={{ fontSize:10, margin:'16px 0 6px' }}>What you’ll learn</div>
            {p.learn.slice(0,3).map(l=><div key={l} className="row" style={{ gap:8, fontSize:13, padding:'2px 0' }}><Icon name="check" size={14} style={{ color:'var(--green)' }}/>{l}</div>)}
            <div style={{ flex:1, minHeight:18 }}/>
            <span className="btn btn-secondary btn-block">View Project<Icon name="arrow-right"/></span>
          </div>
        </A>);})}
    </div>
    <div className="card-head" style={{ marginTop:36 }}><h2 className="card-title" style={{ fontSize:17 }}>Completed</h2></div>
    <div className="card" style={{ overflow:'hidden' }}>
      {[...(state.project.status==='submitted'?[{title:'Student Performance Analytics',skills:['SQL','Excel'],date:'Oct 2026',score:'Submitted · In review'}]:[]), ...D.completedProjects].map((c,i)=>(
        <div key={c.title} className="between" style={{ padding:'16px 20px', borderTop:i?'1px solid var(--line-2)':0, flexWrap:'wrap' }}>
          <div className="row"><div className="icon-tile green"><Icon name="folder-check"/></div><div><b>{c.title}</b><div className="faint" style={{ fontSize:12.5 }}>{c.skills.join(' · ')} · {c.date}</div></div></div>
          <span className="chip chip-gray">{c.score}</span>
        </div>
      ))}
    </div>
  </>);
}

/* ================= PROJECT DETAIL ================= */
function ProjectDetail({ id }){
  const { state, update, notify } = useStore();
  const p = D.projects.find(x=>x.id===id);
  const [submitting, setSubmitting] = useState(false);
  const [link, setLink] = useState('');
  const [local, setLocal] = useState({ status:'not-started', done:[] });
  if (!p) return <NotFound/>;
  const main = p.id==='student-performance-analytics';
  const proj = main ? state.project : local;
  const setProj = v => main ? update({ project:v }) : setLocal(v);
  const started = proj.status !== 'not-started';
  const allDone = proj.done.length === p.milestones.length;
  const toggle = i => {
    if (!started || proj.status==='submitted') return;
    const done = proj.done.includes(i) ? proj.done.filter(x=>x!==i) : [...proj.done, i];
    setProj({ ...proj, done });
  };
  const submit = () => {
    setSubmitting(true);
    setTimeout(()=>{ setProj({ ...proj, status:'submitted' }); setSubmitting(false); notify('Project submitted for review'); window.scrollTo({ top:0, behavior:'smooth' }); }, 1400);
  };
  const pct = Math.round(proj.done.length/p.milestones.length*100);
  return (<>
    <S2Style/>
    <PageHead crumbs={[{label:'Projects',to:'/projects'},{label:p.title}]} title={p.title}
      sub={p.overview}
      right={<>{diffChip(p.difficulty)}<span className="chip chip-gray"><Icon name="clock"/>{p.duration}</span></>}/>
    {proj.status==='submitted' && (
      <div className="card card-pad reveal" style={{ marginBottom:20, background:'var(--green-50)', borderColor:'var(--green-100)' }}>
        <div className="row" style={{ alignItems:'flex-start', flexWrap:'wrap' }}>
          <div className="icon-tile green" style={{ background:'var(--surface)' }}><Icon name="party-popper"/></div>
          <div style={{ flex:1, minWidth:220 }}><b style={{ fontSize:16 }}>Project submitted</b><p className="muted" style={{ fontSize:14, marginTop:2 }}>A mentor will review it within 48 hours. Your Projects score has been updated in Career Readiness.</p></div>
          <A to="/career-readiness" className="btn btn-success">See Career Readiness<Icon name="arrow-right"/></A>
        </div>
      </div>
    )}
    <div className="pd-wrap">
      <div>
        <div className="card card-pad">
          <div className="eyebrow">Problem statement</div>
          <p style={{ fontSize:15.5, lineHeight:1.65, marginTop:10 }}>{p.problem}</p>
          <div className="divider"/>
          <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:20 }}>
            <div><div className="eyebrow" style={{ marginBottom:8 }}>Expected outcome</div><p className="muted" style={{ fontSize:14 }}>{p.outcome}</p></div>
            <div><div className="eyebrow" style={{ marginBottom:8 }}>Dataset</div><p style={{ fontSize:13, fontFamily:'var(--mono)', color:'var(--ink-2)' }}>{p.dataset}</p></div>
          </div>
        </div>
        <div className="card card-pad" style={{ marginTop:20 }}>
          <div className="card-head"><div><h3 className="card-title">Milestones</h3><div className="faint" style={{ fontSize:13 }}>{started ? `${proj.done.length} of ${p.milestones.length} complete` : 'Start the project to track milestones'}</div></div>
            {started && <b className="num">{pct}%</b>}</div>
          {started && <Bar value={pct} tone={allDone?'green':''} style={{ marginBottom:10 }}/>}
          {p.milestones.map((m,i)=>{ const on = proj.done.includes(i); return (
            <div key={m.t} className="ms">
              <button className={`ms-check ${on?'on':''}`} onClick={()=>toggle(i)} disabled={!started||proj.status==='submitted'} aria-label={`Mark ${m.t} ${on?'incomplete':'complete'}`} aria-pressed={on}>{on && <Icon name="check" size={14} strokeWidth={3}/>}</button>
              <div style={{ flex:1 }}>
                <div className="row" style={{ gap:8 }}><span className="faint" style={{ fontFamily:'var(--mono)', fontSize:12 }}>{i+1}.</span><b style={{ fontSize:14.5, textDecoration:on?'line-through':'none', color:on?'var(--ink-3)':'var(--ink)' }}>{m.t}</b></div>
                <p className="faint" style={{ fontSize:13, marginTop:2 }}>{m.d}</p>
              </div>
            </div>);})}
          {started && proj.status!=='submitted' && <>
            <div className="divider"/>
            <label className="label" htmlFor="sub-link">Submission link</label>
            <input id="sub-link" className="input" placeholder="https://github.com/anshuman/student-performance" value={link} onChange={e=>setLink(e.target.value)}/>
            <p className="hint">{allDone ? 'All milestones done — you can submit now.' : `Complete all ${p.milestones.length} milestones to submit.`}</p>
          </>}
        </div>
      </div>
      <div style={{ position:'sticky', top:84 }}>
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom:10 }}>Skills practiced</div>
          <div className="row" style={{ gap:6, flexWrap:'wrap' }}>{p.skills.map(s=><span key={s} className="tag" style={{ height:30, fontSize:13 }}>{s}</span>)}</div>
          <div className="eyebrow" style={{ margin:'18px 0 8px' }}>What you’ll learn</div>
          {p.learn.map(l=><div key={l} className="row" style={{ gap:8, fontSize:13.5, padding:'4px 0' }}><Icon name="check" size={15} style={{ color:'var(--green)' }}/>{l}</div>)}
          <div className="divider"/>
          <div className="between" style={{ fontSize:13, marginBottom:8 }}><span className="muted">Estimated time</span><b>{p.duration}</b></div>
          <div className="between" style={{ fontSize:13, marginBottom:18 }}><span className="muted">Readiness impact</span><b style={{ color:'var(--green)' }}>+4 to +6 pts</b></div>
          {proj.status==='not-started' && <button className="btn btn-primary btn-block btn-lg" onClick={()=>{ setProj({ status:'in-progress', done:[] }); notify('Project started · milestones unlocked'); }}>Start Project<Icon name="arrow-right"/></button>}
          {proj.status==='in-progress' && <>
            <button className="btn btn-primary btn-block btn-lg" disabled={!allDone||submitting} onClick={submit}>{submitting?<><Icon name="loader-2" className="spin"/>Submitting…</>:<><Icon name="send"/>Submit Project</>}</button>
            {!allDone && <button className="btn btn-ghost btn-block btn-sm" style={{ marginTop:8 }} onClick={()=>setProj({ ...proj, done:p.milestones.map((_,i)=>i) })}>Mark all milestones done (demo)</button>}
          </>}
          {proj.status==='submitted' && <div className="row" style={{ color:'var(--green)', fontWeight:700 }}><Icon name="check-circle-2"/>Submitted · In review</div>}
        </div>
      </div>
    </div>
  </>);
}

/* ================= ASSESSMENT ================= */
function Assessment(){
  const { state, update, notify } = useStore();
  const Q = D.questions;
  const [phase, setPhase] = useState(state.assessment ? 'result' : 'intro');
  const [i, setI] = useState(3);  // spec: opens on Question 4 of 10
  const [ans, setAns] = useState(() => ({ 0:Q[0].a, 1:Q[1].a, 2:Q[2].a })); // first three answered
  const [busy, setBusy] = useState(false);
  const answered = Object.keys(ans).length;

  const submit = () => {
    setBusy(true);
    setTimeout(()=>{
      // Deterministic demo: score = correct answers, clamped to 8 for the scripted demo if user answers everything correctly or randomly
      const score = 8; // scripted demo outcome keeps the story coherent
      update({ assessment:{ score, answers:ans }, sqlLevel:2 });
      setBusy(false); setPhase('result'); window.scrollTo(0,0);
    }, 1200);
  };
  const retake = () => { update({ assessment:null, sqlLevel:1 }); setAns({}); setI(0); setPhase('quiz'); };

  if (phase==='intro') return (<>
    <S2Style/>
    <div className="qz">
      <Crumbs items={[{label:'Assessments'},{label:'SQL Fundamentals'}]}/>
      <div className="card" style={{ padding:36 }}>
        <div className="icon-tile" style={{ width:48, height:48 }}><Icon name="database"/></div>
        <h1 style={{ fontSize:28, fontWeight:800, margin:'18px 0 6px' }}>SQL Fundamentals Assessment</h1>
        <p className="muted">Validate your SQL level. Passing moves you from Beginner to Intermediate and updates your career readiness.</p>
        <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12, margin:'24px 0' }}>
          {[['10 Questions','list-ordered'],['~15 minutes','clock'],['Pass: 7/10','target'],['Multiple choice','circle-dot']].map(([t,ic])=>(
            <div key={t} className="row" style={{ padding:14, borderRadius:10, background:'var(--bg)', border:'1px solid var(--line)', gap:10, fontWeight:600, fontSize:13.5 }}><Icon name={ic} size={17} className="faint"/>{t}</div>
          ))}
        </div>
        <div className="row" style={{ flexWrap:'wrap' }}>
          <button className="btn btn-primary btn-lg" onClick={()=>setPhase('quiz')}>{answered?'Resume Assessment':'Start Assessment'}<Icon name="arrow-right"/></button>
          <A to="/learning/sql" className="btn btn-ghost btn-lg">Review SQL first</A>
        </div>
        {answered>0 && <p className="hint" style={{ marginTop:14 }}>You’ve answered {answered} of 10 — you’ll resume at question {i+1}.</p>}
      </div>
    </div>
  </>);

  if (phase==='result'){ const score = state.assessment?.score ?? 8; return (<>
    <S2Style/>
    <div className="qz reveal">
      <Crumbs items={[{label:'Assessments'},{label:'SQL Fundamentals'},{label:'Result'}]}/>
      <div className="card" style={{ padding:36, textAlign:'center' }}>
        <span className="chip chip-green" style={{ height:30, padding:'0 12px', fontSize:13 }}><Icon name="badge-check"/>Skill Validated ✓</span>
        <div className="num" style={{ fontSize:72, fontWeight:800, letterSpacing:'-.05em', lineHeight:1, margin:'22px 0 6px' }}>{score}<span style={{ color:'var(--ink-3)', fontSize:40 }}>/10</span></div>
        <p className="muted">SQL Fundamentals Assessment · Passed</p>
        <div className="divider" style={{ margin:'28px 0' }}/>
        <div className="eyebrow" style={{ marginBottom:16 }}>SQL skill level</div>
        <LevelJump/>
        <div className="grid" style={{ gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:28, textAlign:'left' }}>
          {[['JOINs','3/3','green'],['Aggregation','3/3','green'],['Functions & keys','2/4','amber']].map(([t,s,c])=>(
            <div key={t} style={{ padding:14, borderRadius:10, border:'1px solid var(--line)' }}><div className="faint" style={{ fontSize:12 }}>{t}</div><b style={{ color:`var(--${c})` }}>{s}</b></div>
          ))}
        </div>
      </div>
      <div className="card card-pad" style={{ marginTop:16 }}>
        <div className="between" style={{ flexWrap:'wrap' }}>
          <div className="row"><div className="icon-tile green"><Icon name="trending-up"/></div><div><b>Career readiness updated</b><div className="faint" style={{ fontSize:13 }}>Skills and assessment scores went up.</div></div></div>
          <div className="row" style={{ flexWrap:'wrap' }}><button className="btn btn-ghost btn-sm" onClick={retake}>Retake</button><A to="/career-readiness" className="btn btn-primary">View Career Readiness<Icon name="arrow-right"/></A></div>
        </div>
      </div>
    </div>
  </>);}

  const q = Q[i];
  return (<>
    <S2Style/>
    <div className="qz">
      <div className="between" style={{ marginBottom:14, flexWrap:'wrap' }}>
        <div><div className="eyebrow">SQL Fundamentals Assessment</div><b style={{ fontSize:18 }}>Question {i+1} of {Q.length}</b></div>
        <div className="row"><span className="chip chip-gray"><Icon name="clock"/>11:24 left</span><button className="btn btn-ghost btn-sm" onClick={()=>setPhase('intro')}>Save & exit</button></div>
      </div>
      <div className="qdots" style={{ marginBottom:24 }}>{Q.map((_,k)=><button key={k} className={k===i?'cur':ans[k]!=null?'ans':''} onClick={()=>setI(k)} aria-label={`Go to question ${k+1}`}/>)}</div>
      <div className="card" style={{ padding:'30px 32px' }} key={i}>
        <div className="reveal">
          <h2 style={{ fontSize:21, fontWeight:700, lineHeight:1.4, marginBottom:22 }}>{q.q}</h2>
          <div role="radiogroup" aria-label="Answer options">
            {q.o.map((o,k)=>(
              <button key={k} role="radio" aria-checked={ans[i]===k} className={`opt-q ${ans[i]===k?'on':''}`} onClick={()=>setAns({ ...ans, [i]:k })}>
                <span className="k">{'ABCD'[k]}</span><span style={/SELECT|FROM/.test(o)?{ fontFamily:'var(--mono)', fontSize:13.5 }:null}>{o}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="between" style={{ marginTop:20, paddingTop:18, borderTop:'1px solid var(--line-2)' }}>
          <button className="btn btn-ghost" disabled={i===0} onClick={()=>setI(i-1)}><Icon name="arrow-left"/>Previous</button>
          <span className="faint hide-sm" style={{ fontSize:13 }}>{answered} answered</span>
          {i<Q.length-1
            ? <button className="btn btn-primary" onClick={()=>setI(i+1)} disabled={ans[i]==null}>Next<Icon name="arrow-right"/></button>
            : <button className="btn btn-success" onClick={submit} disabled={answered<Q.length||busy}>{busy?<><Icon name="loader-2" className="spin"/>Scoring…</>:<>Submit<Icon name="check"/></>}</button>}
        </div>
      </div>
      {i===Q.length-1 && answered<Q.length && <p className="hint" style={{ textAlign:'center', marginTop:12 }}>Answer all questions to submit · {Q.length-answered} remaining</p>}
      <div style={{ textAlign:'center', marginTop:16 }}><button className="link" style={{ fontSize:12.5, color:'var(--ink-3)' }} onClick={()=>{ const a={}; Q.forEach((qq,k)=>a[k]= k===5||k===9 ? (qq.a+1)%4 : qq.a); setAns(a); setI(Q.length-1); }}>Fill remaining answers (demo)</button></div>
    </div>
  </>);
}
function LevelJump(){
  const m = useMounted(300);
  return (
    <div style={{ maxWidth:440, margin:'0 auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
        {D.LEVELS.map((l,k)=>{ const prev = k<=1, cur = k<=2; return (
          <div key={l}>
            <div style={{ height:10, borderRadius:4, background: cur ? (k===2 ? (m?'var(--green)':'var(--line-2)') : 'var(--blue)') : 'var(--line-2)', transition:'background .6s .2s' }}/>
            <div style={{ fontSize:12, marginTop:8, fontWeight:k===1||k===2?700:500, color:k===2?'var(--green)':k===1?'var(--ink-2)':'var(--ink-3)' }}>{l}</div>
          </div>);})}
      </div>
      <div className="row" style={{ justifyContent:'center', marginTop:18, gap:14 }}>
        <div style={{ textAlign:'right' }}><div className="faint" style={{ fontSize:12 }}>Previous</div><b>Beginner</b></div>
        <Icon name="arrow-right" style={{ color:'var(--green)' }}/>
        <div style={{ textAlign:'left' }}><div className="faint" style={{ fontSize:12 }}>Current</div><b style={{ color:'var(--green)' }}>Intermediate</b></div>
      </div>
    </div>
  );
}

/* ================= CAREER READINESS ================= */
function CareerReadiness(){
  const { state, role, comp, readiness, sqlValidated, projectDone } = useStore();
  const before = state.readinessBefore;
  const hist = [ {m:'Jul',v:42},{m:'Aug',v:51},{m:'Sep',v:63},{m:'Oct',v:68} ];
  if (readiness>68) hist.push({ m:'Now', v:readiness });
  const comps = [
    { k:'skills', t:'Skills', i:'layers', d:'Level vs. role requirement' },
    { k:'learning', t:'Learning', i:'book-open', d:'Roadmap completion' },
    { k:'projects', t:'Projects', i:'folder-kanban', d:'Applied, reviewed work' },
    { k:'assessments', t:'Assessments', i:'clipboard-check', d:'Validated skill scores' },
  ];
  const blockers = [
    !sqlValidated && { t:'SQL', d:'Validate SQL at Intermediate level', to:'/assessment', cta:'Take assessment' },
    { t:'Power BI', d:'Missing skill · required at Intermediate', to:'/learning/powerbi', cta:'Start' },
    { t:'Statistics', d:'Beginner → Intermediate needed', to:'/learning/statistics', cta:'Start' },
    !projectDone && { t:'One practical project', d:'Student Performance Analytics fits best', to:'/projects/student-performance-analytics', cta:'View project' },
  ].filter(Boolean).slice(0,3);
  const maxV = 100;
  return (<>
    <S2Style/>
    <PageHead crumbs={[{label:'Dashboard',to:'/dashboard'},{label:'Career Readiness'}]} title="Career Readiness"
      sub={`How prepared you are for an entry-level ${role.title} role today, based on validated evidence.`}/>
    <div className="cr-top">
      <div className="card card-pad" style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:32 }}>
        <Ring value={readiness} size={200} stroke={14} color="var(--green)" label="Career readiness">
          <div><div className="num" style={{ fontSize:56, fontWeight:800, letterSpacing:'-.05em', lineHeight:1 }}>{readiness}<span style={{ fontSize:26, color:'var(--ink-3)' }}>%</span></div><div className="faint" style={{ fontSize:12.5, fontWeight:600, marginTop:6 }}>{role.title}</div></div>
        </Ring>
        <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap:10, width:'100%', marginTop:24 }}>
          <div style={{ padding:14, borderRadius:10, background:'var(--bg)', border:'1px solid var(--line)' }}><div className="eyebrow">Before</div><b className="num" style={{ fontSize:24 }}>{before}%</b><div className="faint" style={{ fontSize:12 }}>July 2026</div></div>
          <div style={{ padding:14, borderRadius:10, background:'var(--green-50)', border:'1px solid var(--green-100)' }}><div className="eyebrow" style={{ color:'var(--green)' }}>Current</div><b className="num" style={{ fontSize:24, color:'var(--green)' }}>{readiness}%</b><div style={{ fontSize:12, color:'var(--green)', fontWeight:600 }}>+{readiness-before} pts</div></div>
        </div>
      </div>
      <div className="card card-pad">
        <div className="card-head"><div><h3 className="card-title">Progress over time</h3><div className="faint" style={{ fontSize:13 }}>Readiness score by month</div></div><span className="chip chip-green"><Icon name="trending-up"/>+{readiness-before} pts</span></div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:14, height:200, paddingTop:20, borderBottom:'1px solid var(--line)' }}>
          {hist.map((h,k)=>{ const last = k===hist.length-1; return (
            <div key={h.m} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%' }}>
              <b className="num" style={{ fontSize:13, marginBottom:6, color:last?'var(--green)':'var(--ink-2)' }}>{h.v}%</b>
              <GrowBar h={h.v/maxV*100} color={last?'var(--green)':k===0?'#C9D2E3':'var(--blue-200)'} delay={k*80}/>
            </div>);})}
        </div>
        <div style={{ display:'flex', gap:14, marginTop:8 }}>{hist.map(h=><div key={h.m} className="faint" style={{ flex:1, textAlign:'center', fontSize:12 }}>{h.m}</div>)}</div>
        <div className="divider"/>
        <div className="row" style={{ fontSize:13.5, flexWrap:'wrap', gap:'6px 18px' }}>
          <span className="muted"><b style={{ color:'var(--ink)' }}>Next milestone:</b> 75% — “Interview ready”</span>
          <span className="muted">{readiness>=75?'Reached':`${75-readiness} pts to go`}</span>
        </div>
      </div>
    </div>

    <div className="cr-comp" style={{ marginTop:20 }}>
      {comps.map(c=>(
        <div key={c.k} className="card card-pad" style={{ padding:20 }}>
          <div className="between"><div className="icon-tile" style={{ width:34, height:34 }}><Icon name={c.i}/></div><b className="num" style={{ fontSize:26, letterSpacing:'-.03em' }}>{comp[c.k]}%</b></div>
          <b style={{ display:'block', marginTop:14 }}>{c.t}</b>
          <div className="faint" style={{ fontSize:12.5, marginBottom:12 }}>{c.d}</div>
          <Bar value={comp[c.k]} tone={comp[c.k]>=75?'green':''} size="sm"/>
        </div>
      ))}
    </div>

    <div className="cr-2">
      <div className="card card-pad">
        <h3 className="card-title" style={{ fontSize:18 }}>What’s holding you back?</h3>
        <p className="faint" style={{ fontSize:13, margin:'4px 0 16px' }}>Closing these three would bring you to roughly {Math.min(90,readiness+14)}%.</p>
        {blockers.map((b,k)=>(
          <div key={b.t} className="between" style={{ padding:'14px 0', borderTop:'1px solid var(--line-2)', flexWrap:'wrap' }}>
            <div className="row"><span style={{ width:28, height:28, borderRadius:8, background:'var(--amber-50)', color:'var(--amber)', display:'grid', placeItems:'center', fontWeight:800, fontSize:13, fontFamily:'var(--mono)' }}>{k+1}</span><div><b>{b.t}</b><div className="faint" style={{ fontSize:12.5 }}>{b.d}</div></div></div>
            <A to={b.to} className="btn btn-secondary btn-sm">{b.cta}<Icon name="arrow-right"/></A>
          </div>
        ))}
        <A to="/learning" className="btn btn-primary btn-lg" style={{ marginTop:16 }}>Continue My Roadmap<Icon name="arrow-right"/></A>
      </div>
      <div className="card card-pad">
        <h3 className="card-title">How we calculate this</h3>
        <p className="muted" style={{ fontSize:13.5, margin:'6px 0 16px' }}>A weighted score using evidence, not self-reported claims.</p>
        {[['Skills','30%'],['Learning','30%'],['Projects','25%'],['Assessments','15%']].map(([t,w])=>(
          <div key={t} className="between" style={{ padding:'10px 0', borderTop:'1px solid var(--line-2)', fontSize:13.5 }}><span>{t}</span><b className="num">{w}</b></div>
        ))}
        <div className="divider"/>
        <button className="link" onClick={()=>window.dispatchEvent(new CustomEvent('sm:ask'))}>Ask SkillMitra what to do next<Icon name="arrow-right"/></button>
      </div>
    </div>
  </>);
}
function GrowBar({ h, color, delay }){
  const m = useMounted(80+delay);
  return <div style={{ width:'100%', maxWidth:56, height:(m?h:0)+'%', background:color, borderRadius:'6px 6px 0 0', transition:'height .9s cubic-bezier(.2,.7,.2,1)' }}/>;
}

/* ================= INDUSTRY SKILLS ================= */
function IndustrySkills(){
  const { state, update, notify, levels } = useStore();
  const [sel, setSel] = useState(state.goal);
  const r = D.roles[sel];
  return (<>
    <S2Style/>
    <PageHead crumbs={[{label:'Dashboard',to:'/dashboard'},{label:'Industry Skills'}]} title="Industry Skill Requirements"
      sub="Explore what entry-level roles expect. Requirements are curated by our team with industry partners and reviewed every quarter."/>
    <div className="role-grid">
      {Object.values(D.roles).map(x=>(
        <button key={x.id} className={`role-card ${sel===x.id?'on':''}`} onClick={()=>setSel(x.id)} aria-pressed={sel===x.id}>
          <div className="between"><div className={`icon-tile ${sel===x.id?'':'gray'}`}><Icon name={x.icon}/></div>{state.goal===x.id && <span className="chip chip-blue">Your goal</span>}</div>
          <b style={{ display:'block', fontSize:16, marginTop:14 }}>{x.title}</b>
          <span className="faint" style={{ fontSize:12.5 }}>{x.demand} · {x.entry}</span>
        </button>
      ))}
    </div>
    <div className="card card-pad reveal" key={sel} style={{ marginTop:20 }}>
      <div className="between" style={{ alignItems:'flex-start', flexWrap:'wrap', gap:16 }}>
        <div style={{ maxWidth:560 }}><h2 style={{ fontSize:24, fontWeight:800 }}>{r.title}</h2><p className="muted" style={{ marginTop:6 }}>{r.summary}</p></div>
        <div className="row" style={{ flexWrap:'wrap', gap:8 }}><span className="tag">{r.openings}</span><span className="tag">{r.entry}</span></div>
      </div>
      <div className="divider"/>
      <div className="eyebrow" style={{ marginBottom:4 }}>Required skills</div>
      <table className="tbl tbl-resp" style={{ marginTop:8 }}>
        <thead><tr><th>Skill</th><th>Priority</th><th>Expected level</th><th>Why it matters</th>{sel===state.goal && <th>You</th>}</tr></thead>
        <tbody>{r.required.map(s=>{ const cur = levels[s.skill] ?? 0; const ok = cur>=s.level; return (
          <tr key={s.skill}>
            <td className="full" data-l="Skill"><b style={{ fontSize:15 }}>{s.skill}</b></td>
            <td data-l="Priority"><span className={`chip ${s.weight==='Core'?'chip-blue':'chip-gray'}`}>{s.weight}</span></td>
            <td data-l="Level"><div style={{ fontWeight:600, fontSize:13.5, marginBottom:3 }}>{D.LEVELS[s.level]}</div><LevelPips level={s.level}/></td>
            <td className="full" data-l="Why" style={{ color:'var(--ink-2)', fontSize:13.5, maxWidth:360 }}>{s.why}</td>
            {sel===state.goal && <td data-l="You">{ok?<span className="chip chip-green"><Icon name="check"/>{D.LEVELS[cur]}</span>:<span className={`chip ${cur===0?'chip-red':'chip-amber'}`}>{D.LEVELS[cur]}</span>}</td>}
          </tr>);})}</tbody>
      </table>
      <div className="divider"/>
      <div className="between" style={{ flexWrap:'wrap' }}>
        <div className="row" style={{ gap:6, flexWrap:'wrap' }}><span className="faint" style={{ fontSize:13, marginRight:4 }}>Common tools:</span>{r.tools.map(t=><span key={t} className="tag">{t}</span>)}</div>
        {sel===state.goal ? <A to="/skill-gaps" className="btn btn-primary">Compare with my skills<Icon name="arrow-right"/></A>
          : <button className="btn btn-secondary" onClick={()=>{ update({ goal:sel }); notify(`Career goal set to ${r.title}`); }}>Set as my career goal</button>}
      </div>
    </div>
  </>);
}

/* ================= PROFILE & SETTINGS ================= */
function Profile({ tab='profile' }){
  const { state, update, notify, role, readiness, reset, theme, toggleTheme } = useStore();
  const [p, setP] = useState(state.profile);
  const [prefs, setPrefs] = useState({ weekly:true, reminders:true, projects:true, share:false });
  const save = () => { update({ profile:p }); notify('Profile saved'); };
  return (<>
    <S2Style/>
    <PageHead title="Profile & Settings" sub="Keep your profile current — it shapes your analysis and roadmap."/>
    <div className="tabs" role="tablist">
      <button role="tab" aria-selected={tab==='profile'} className={tab==='profile'?'on':''} onClick={()=>go('/profile')}>Profile</button>
      <button role="tab" aria-selected={tab==='settings'} className={tab==='settings'?'on':''} onClick={()=>go('/settings')}>Settings</button>
    </div>
    {tab==='profile' ? (
    <div className="prof">
      <div className="card card-pad" style={{ textAlign:'center' }}>
        <span className="avatar lg" style={{ margin:'0 auto' }}>{p.initials}</span>
        <b style={{ display:'block', fontSize:18, marginTop:14 }}>{p.fullName}</b>
        <span className="faint" style={{ fontSize:13 }}>{p.degree} {p.branch} · Sem {p.semester}</span>
        <div className="divider"/>
        <div className="between" style={{ fontSize:13, marginBottom:8 }}><span className="muted">Career goal</span><b>{role.title}</b></div>
        <div className="between" style={{ fontSize:13, marginBottom:8 }}><span className="muted">Readiness</span><b>{readiness}%</b></div>
        <div className="between" style={{ fontSize:13 }}><span className="muted">Member since</span><b>{p.joined}</b></div>
        <div className="divider"/>
        <div className="row" style={{ textAlign:'left', padding:12, background:'var(--bg)', borderRadius:10, border:'1px solid var(--line)' }}>
          <Icon name="file-text" className="faint"/><div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:13, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis' }}>{p.resume}</div><div className="faint" style={{ fontSize:12 }}>Processed</div></div>
          <A to="/onboarding" className="link" style={{ fontSize:12.5 }}>Update</A>
        </div>
      </div>
      <div className="card card-pad">
        <h3 className="card-title" style={{ marginBottom:18 }}>Academic profile</h3>
        <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'0 16px' }}>
          <div className="field"><label className="label" htmlFor="p-n">Full name</label><input id="p-n" className="input" value={p.fullName} onChange={e=>setP({ ...p, fullName:e.target.value, name:e.target.value.split(' ')[0] })}/></div>
          <div className="field"><label className="label" htmlFor="p-e">Email</label><input id="p-e" className="input" value={p.email} onChange={e=>setP({ ...p, email:e.target.value })}/></div>
          <div className="field"><label className="label" htmlFor="p-c">College</label><input id="p-c" className="input" value={p.college} onChange={e=>setP({ ...p, college:e.target.value })}/></div>
          <div className="field"><label className="label" htmlFor="p-b">Branch</label><input id="p-b" className="input" value={p.branch} onChange={e=>setP({ ...p, branch:e.target.value })}/></div>
        </div>
        <div className="eyebrow" style={{ margin:'6px 0 10px' }}>Skills</div>
        <div className="row" style={{ gap:6, flexWrap:'wrap' }}>{p.skills.map(s=><span key={s} className="tag" style={{ height:30 }}>{s}</span>)}<A to="/onboarding" className="link" style={{ marginLeft:6 }}>Edit</A></div>
        <div className="eyebrow" style={{ margin:'18px 0 10px' }}>Interests</div>
        <div className="row" style={{ gap:6, flexWrap:'wrap' }}>{p.interests.map(s=><span key={s} className="tag" style={{ height:30 }}>{s}</span>)}</div>
        <div className="divider"/>
        <div className="row" style={{ justifyContent:'flex-end' }}><button className="btn btn-ghost" onClick={()=>setP(state.profile)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save changes</button></div>
      </div>
    </div>) : (
    <div className="card card-pad" style={{ maxWidth:720 }}>
      <h3 className="card-title" style={{ marginBottom:6 }}>Appearance</h3>
      <div className="between" style={{ padding:'14px 0', borderTop:'1px solid var(--line-2)' }}>
        <div><b style={{ fontSize:14 }}>Dark mode theme</b><div className="faint" style={{ fontSize:12.5 }}>Deep obsidian surfaces with luminous accents</div></div>
        <button className={`toggle ${theme==='dark'?'on':''}`} role="switch" aria-checked={theme==='dark'} aria-label="Toggle dark mode" onClick={()=>{ toggleTheme(); notify(theme==='dark'?'Switched to light theme':'Switched to dark theme'); }}/>
      </div>
      <div className="divider"/>
      <h3 className="card-title" style={{ marginBottom:6 }}>Notifications</h3>
      {[['weekly','Weekly progress summary','Every Monday, by email'],['reminders','Learning reminders','A nudge if you miss 3 days'],['projects','New project matches','When a project fits your gaps'],['share','Share readiness with my institution','Your placement cell can see your score']].map(([k,t,d])=>(
        <div key={k} className="between" style={{ padding:'14px 0', borderTop:'1px solid var(--line-2)' }}>
          <div><b style={{ fontSize:14 }}>{t}</b><div className="faint" style={{ fontSize:12.5 }}>{d}</div></div>
          <button className={`toggle ${prefs[k]?'on':''}`} role="switch" aria-checked={prefs[k]} aria-label={t} onClick={()=>{ setPrefs({ ...prefs, [k]:!prefs[k] }); notify('Preference saved'); }}/>
        </div>
      ))}
      <div className="divider"/>
      <h3 className="card-title" style={{ marginBottom:6 }}>Demo data</h3>
      <div className="between" style={{ flexWrap:'wrap' }}><p className="muted" style={{ fontSize:13.5 }}>Reset Anshuman’s progress to replay the full demo journey.</p><button className="btn btn-secondary" onClick={()=>{ reset(); setTimeout(()=>{ update({ auth:'student' }); notify('Demo data reset'); go('/dashboard'); }, 0); }}><Icon name="rotate-ccw"/>Reset demo</button></div>
    </div>)}
  </>);
}

Object.assign(window, { Projects, ProjectDetail, Assessment, CareerReadiness, IndustrySkills, Profile });
