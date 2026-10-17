(function(){
const C = window.SOS_CONFIG || {};
const $ = id => document.getElementById(id);
const esc = s => String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const FLAG={us:"🇺🇸",jp:"🇯🇵",other:"🌐"};
const AUD={jp:"日本",us:"美国",global:"全球"};
const TAGS={cheat:"浮気",ldr:"遠距離",ghost:"既読無視",family:"家族",money:"お金",marriage:"結婚",spark:"冷めた",jeal:"嫉妬",other:"その他"};
const DAY=864e5;
const sb = window.supabase.createClient(C.supabaseUrl, C.supabaseAnonKey, {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});

function toast(msg){const d=document.createElement("div");d.className="toast";d.textContent=msg;document.body.appendChild(d);setTimeout(()=>d.remove(),2200)}
function dayKey(ms){const d=new Date(ms);return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
function colsHTML(vals,cls){const max=Math.max(1,...vals);return `<div class="cols ${cls}">${vals.map(v=>`<div class="col">${v||""}<i style="height:${Math.round(v/max*85)}%"></i></div>`).join("")}</div>`}
async function all(table, cols){
  const out=[]; let from=0; const size=1000;
  for(;;){ const {data,error}=await sb.from(table).select(cols).range(from,from+size-1); if(error) throw error; out.push(...data); if(data.length<size) break; from+=size; if(from>=50000) break; }
  return out;
}

async function start(){
  const {data:{session}} = await sb.auth.getSession();
  const isReal = session && session.user && !session.user.is_anonymous && session.user.email;
  $("login").hidden = !!isReal; $("signOut").hidden = !isReal;
  if(!isReal){ $("adminBody").innerHTML=""; $("refresh").hidden=true; return; }
  const {data:ok} = await sb.rpc("is_admin");
  if(!ok){
    $("notAdmin").hidden=false;
    $("notAdmin").innerHTML = `已登录为 <b>${esc(session.user.email)}</b>，但这个账号还不是管理员。<br><br>在 Supabase → SQL Editor 运行下面这行，然后刷新本页：<br><code style="user-select:all;display:block;margin-top:8px;padding:8px;background:var(--surface2);overflow-wrap:anywhere;font-family:var(--f-mono)">insert into public.admins (user_id) values ('${esc(session.user.id)}');</code>`;
    return;
  }
  $("notAdmin").hidden=true; $("refresh").hidden=false;
  render();
}

async function render(){
  const box=$("adminBody");
  box.innerHTML=`<p class="muted">加载中…</p>`;
  let profiles,posts,votes,reports;
  try{
    [profiles,posts,votes,reports] = await Promise.all([
      all("profiles","user_id,region,lang,first_seen,last_seen"),
      all("posts","id,text,tags,lang,region,aud,author,hidden,created_at"),
      all("votes","post_id,user_id,choice,region,comment,created_at"),
      all("reports","post_id,created_at")
    ]);
    const {data:sids}=await sb.rpc("seed_ids");
    var seedSet=new Set(sids||[]);
  }catch(e){ box.innerHTML=`<div class="notice">读取失败：${esc(e.message)}</div>`; return; }
  const now=Date.now(), ts=x=>new Date(x).getTime();
  const realPosts=posts.filter(p=>!seedSet.has(p.id));
  const seedLeft={jp:0,us:0,global:0}; posts.forEach(p=>{ if(seedSet.has(p.id)) seedLeft[p.aud]=(seedLeft[p.aud]||0)+1; });
  const act24=profiles.filter(a=>now-ts(a.last_seen)<DAY).length, act7=profiles.filter(a=>now-ts(a.last_seen)<7*DAY).length;
  const new7=profiles.filter(a=>now-ts(a.first_seen)<7*DAY).length;
  const askers=new Set(posts.filter(p=>p.author).map(p=>p.author)).size;
  const voters=new Set(votes.map(v=>v.user_id)).size;
  const brk=votes.filter(v=>v.choice==="break").length, cms=votes.filter(v=>v.comment).length;
  const reg={us:0,jp:0,other:0}; profiles.forEach(a=>{reg[a.region]!=null?reg[a.region]++:reg.other++});
  const regSplit=r=>{const vs=votes.filter(v=>v.region===r);return vs.length?Math.round(vs.filter(v=>v.choice==="break").length/vs.length*100)+"%":"–"};
  const langs={en:posts.filter(p=>p.lang==="en").length, ja:posts.filter(p=>p.lang==="ja").length};
  const aud={jp:0,us:0,global:0}; posts.forEach(p=>aud[p.aud]=(aud[p.aud]||0)+1);
  const tagCount={}; posts.forEach(p=>(p.tags||[]).forEach(k=>tagCount[k]=(tagCount[k]||0)+1));
  const days=[...Array(14)].map((_,i)=>{const d=new Date(now-(13-i)*DAY);return {k:dayKey(d),l:(d.getMonth()+1)+"/"+d.getDate()}});
  const qd=days.map(d=>realPosts.filter(p=>dayKey(ts(p.created_at))===d.k).length);
  const vd=days.map(d=>votes.filter(v=>dayKey(ts(v.created_at))===d.k).length);
  const ud=days.map(d=>profiles.filter(p=>dayKey(ts(p.first_seen))===d.k).length);
  const dayRow=`<div class="days">${days.map((d,i)=>`<span>${i%2?"":d.l}</span>`).join("")}</div>`;
  const kpi=(n,l)=>`<div class="kpi"><b>${Number(n).toLocaleString()}</b><span>${l}</span></div>`;
  const repCount={}; reports.forEach(r=>repCount[r.post_id]=(repCount[r.post_id]||0)+1);
  const vByPost={}; votes.forEach(v=>(vByPost[v.post_id]=vByPost[v.post_id]||[]).push(v));
  const flagged=posts.filter(p=>repCount[p.id]||p.hidden).sort((a,b)=>(repCount[b.id]||0)-(repCount[a.id]||0));
  const row=p=>{const vs=vByPost[p.id]||[], n=vs.length, b=vs.filter(v=>v.choice==="break").length;
    return `<div class="arow"><div class="txt">${esc(p.text)}</div>
      <div class="m"><span>${FLAG[p.region]||"🌐"} → ${AUD[p.aud]||"全球"} · ${new Date(p.created_at).toLocaleString("zh-CN",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})} · ${n}票${n?" · "+Math.round(b/n*100)+"%💔":""}${seedSet.has(p.id)?` · <b style="color:var(--acid)">预置</b>`:""}${repCount[p.id]?` · <b style="color:var(--brk)">${repCount[p.id]}次举报</b>`:""}${p.hidden?` · <b style="color:var(--brk)">已隐藏</b>`:""}</span>
      <span class="row"><button class="btn danger" type="button" data-hide="${esc(p.id)}" data-v="${p.hidden?0:1}">${p.hidden?"恢复显示":"隐藏"}</button><button class="btn danger" type="button" data-del="${esc(p.id)}">删除</button></span></div></div>`};
  box.innerHTML = `
    <div class="kpis">
      ${kpi(act24,"24小时活跃用户")}${kpi(act7,"7天活跃用户")}
      ${kpi(profiles.length,"累计用户")}${kpi(new7,"7天新用户")}
      ${kpi(askers,"提问用户")}${kpi(voters,"投票用户")}
      ${kpi(realPosts.length,"真人提问数")}${kpi(votes.length,"投票总数")}
      ${kpi(seedSet.size,"预置问题剩余")}${kpi(cms,"评论数")}
    </div>
    <div class="panel"><h3>预置问题替换进度</h3>
      <p class="small muted" style="margin:0">每有一个真人发帖，就自动删除一条同地区、票数最少的预置问题。真人提问不会被删除。</p>
      <div class="kv"><span>🇯🇵 日本</span><b>剩 ${seedLeft.jp||0} 条</b></div>
      <div class="kv"><span>🇺🇸 美国</span><b>剩 ${seedLeft.us||0} 条</b></div>
      <div class="kv"><span>🌐 全球</span><b>剩 ${seedLeft.global||0} 条</b></div>
    </div>
    <div class="panel"><h3>每日新用户（近14天）</h3>${colsHTML(ud,"v")}${dayRow}</div>
    <div class="panel"><h3>每日新提问（近14天）</h3>${colsHTML(qd,"q")}${dayRow}</div>
    <div class="panel"><h3>每日投票（近14天）</h3>${colsHTML(vd,"v")}${dayRow}</div>
    <div class="panel"><h3>结构</h3>
      <div class="kv"><span>整体劝分比例</span><b>${votes.length?Math.round(brk/votes.length*100):0}% 💔</b></div>
      <div class="kv"><span>劝分比例 美国 vs 日本</span><b>🇺🇸 ${regSplit("us")} · 🇯🇵 ${regSplit("jp")}</b></div>
      <div class="kv"><span>平均每题票数</span><b>${posts.length?(votes.length/posts.length).toFixed(1):0}</b></div>
      <div class="kv"><span>评论数</span><b>${cms}</b></div>
      <div class="kv"><span>用户地区</span><b>🇺🇸 ${reg.us} · 🇯🇵 ${reg.jp} · 🌐 ${reg.other}</b></div>
      <div class="kv"><span>问题公开范围</span><b>日本 ${aud.jp} · 美国 ${aud.us} · 全球 ${aud.global}</b></div>
      <div class="kv"><span>问题语言</span><b>EN ${langs.en} · 日本語 ${langs.ja}</b></div>
      <div class="kv"><span>热门标签</span><b>${Object.entries(tagCount).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k,n])=>esc(TAGS[k]||k)+" "+n).join(" · ")||"–"}</b></div>
    </div>
    <div class="panel"><h3>待处理：被举报或已隐藏（${flagged.length}）</h3>
      <p class="small muted" style="margin:0">被 3 个不同用户举报的问题会自动隐藏，等你来决定恢复还是删除。</p>
      ${flagged.length?flagged.map(row).join(""):`<p class="muted small" style="margin:0">没有待处理的内容。</p>`}
    </div>
    <div class="panel"><h3>最新真人提问</h3>
      ${realPosts.length?[...realPosts].sort((a,b)=>ts(b.created_at)-ts(a.created_at)).slice(0,40).map(row).join(""):`<p class="muted small" style="margin:0">还没有真人提问。</p>`}
    </div>
    <div class="panel"><h3>预置问题（最近 20 条）</h3>
      ${[...posts].filter(p=>seedSet.has(p.id)).sort((a,b)=>ts(b.created_at)-ts(a.created_at)).slice(0,20).map(row).join("")||`<p class="muted small" style="margin:0">预置问题已全部替换完。</p>`}
    </div>`;
  box.querySelectorAll("[data-del]").forEach(b=>b.onclick=async()=>{
    if(b.dataset.armed!=="1"){ b.dataset.armed="1"; b.textContent="确认删除？"; return; }
    b.disabled=true;
    const {error}=await sb.from("posts").delete().eq("id",b.dataset.del);
    if(error){ toast("删除失败："+error.message); b.disabled=false; } else { toast("已删除"); render(); }
  });
  box.querySelectorAll("[data-hide]").forEach(b=>b.onclick=async()=>{
    b.disabled=true;
    const {error}=await sb.from("posts").update({hidden:b.dataset.v==="1"}).eq("id",b.dataset.hide);
    if(error){ toast("操作失败："+error.message); b.disabled=false; } else render();
  });
}

$("login").addEventListener("submit",async e=>{
  e.preventDefault();
  const email=$("email").value.trim(); if(!email) return;
  const {error}=await sb.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin+"/admin.html",shouldCreateUser:true}});
  $("loginMsg").innerHTML = error ? `<div class="notice">发送失败：${esc(error.message)}</div>` : `<div class="notice">登录链接已发到 ${esc(email)}，请在这台设备上打开邮件里的链接。</div>`;
});
$("signOut").onclick=async()=>{ await sb.auth.signOut(); location.reload(); };
$("refresh").onclick=render;
sb.auth.onAuthStateChange((ev)=>{ if(ev==="SIGNED_IN") start(); });
start();
})();
