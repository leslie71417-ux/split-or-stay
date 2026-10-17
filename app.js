(function(){
const C = window.SOS_CONFIG || {};
const T = {
  en:{h1a:"Split?",h1b:"Or stay?",tagline:"Post your relationship dilemma anonymously. Strangers in the US and Tokyo vote. You decide.",
    judgeBtn:"Judge others",judgeSub:"Swipe through real dilemmas",askBtn:"Ask the crowd",askSub:"Anonymous, no sign-up",
    statQ:"people are waiting for your verdict",statMine:"people you've helped decide",
    audLabel:"Who can judge it?",audHint:"Only people in the region you pick will see your question.",aud:{jp:"🇯🇵 Japan",us:"🇺🇸 US",global:"🌐 Global"},howL:"Swipe left: break up",howR:"Swipe right: stay together",howU:"Swipe up: skip",
    judgeTitle:"Judging",poolLocal:"English only",poolGlobal:"🌐 All languages",brk:"Break up",stay:"Stay",skip:"Skip",
    hint:"Swipe ← break up · → stay · ↑ skip",readonly:"You can browse, but your access level doesn't allow voting or posting. Ask the page owner for Contributor access.",
    askTitle:"What's going on?",qLabel:"Your situation",qPh:"e.g. We've been together 3 years. He wants to move to Osaka for work and expects me to quit my job…",
    tagsLabel:"Tags (optional)",lenLabel:"How long together?",privacy:"Stay anonymous: don't include real names, workplaces, schools or social handles. Emails, phone numbers, links and @handles are hidden automatically.",
    post:"Post anonymously",posted:"Posted. It's now in the judging pool.",tooShort:"Write at least 30 characters so people can judge fairly.",
    mineTitle:"My questions",refresh:"Refresh",mineEmpty:"You haven't asked anything yet.",askNow:"Ask the crowd",
    votes:"votes",saidBrk:"said break up",saidStay:"said stay",noVotes:"No votes yet. Check back soon.",
    followPh:"Add an update (what did you decide?)",followSave:"Save update",update:"Update",copy:"Copy result",copied:"Copied",
    youSaid:"You said",agree:"agree with you",of:"of",comments:"Comments",commentPh:"Leave a comment (optional)",send:"Send",next:"Skip →",
    exNote:"Example card — votes on examples aren't saved.",ex:"Example",doneTitle:"Congrats! You've helped everyone torn about love in this region",doneBody:"Try switching to another region.",pickScope:"Switch region",waitingShort:"waiting",
    first:"Be the first to vote",commentSaved:"Comment added",
    exWhy:"This was an example card, so nothing was saved. Examples only appear while nobody has posted a real question yet. As soon as a real question is posted, every vote and comment is saved and counted.",askFirst:"Post the first real question →",
    safetyTitle:"This sounds like it could involve your safety",safetyBody:"We didn't post it. A crowd vote isn't the right tool for this, and you deserve real support. These services are free and confidential:",
    back:"Back to edit",ageTitle:"18+ only",ageBody:"Split or Stay is for adults. Posts are anonymous and judged by strangers.",ageYes:"I'm 18 or older",
    tHome:"Home",splitWord:"Split",vsTitle:"US vs Japan",nameUS:"US",nameJP:"Japan",nameOther:"Other regions",noRegionVotes:"No votes yet",totalVotes:"votes in total",yourComment:"Your comment",report:"⚑ Report",reportArm:"⚑ Tap again to report",reported:"Reported. Thanks, we'll review it.",terms:"Terms",privacy:"Privacy",contact:"Contact",connecting:"Connecting…",rateLimited:"You're going a bit fast. Try again in a little while.",netErr:"Can't reach the server. Check your connection and refresh.",agree:"By posting you agree to the <a href=\"/terms.html\">Terms</a> and <a href=\"/privacy.html\">Privacy Policy</a>.",ageBodyHtml:"Split or Stay is for adults. Posts are anonymous and judged by strangers. By continuing you agree to the <a href=\"/terms.html\">Terms</a> and <a href=\"/privacy.html\">Privacy Policy</a>.",shareTail:"Judge mine:",tJudge:"Judge",tAsk:"Ask",tMine:"Mine",regionUS:"🇺🇸 US",regionJP:"🇯🇵 Tokyo/JP",regionOther:"🌐 Other",
    offline:"Live data isn't available in this view, so you're seeing example cards only.",err:"Something went wrong saving that. Try again.",
    lens:{a:"Under 6 months",b:"6–12 months",c:"1–3 years",d:"3+ years",m:"Married"},
    tags:{cheat:"Cheating",ldr:"Long distance",ghost:"Left on read",family:"Family",money:"Money",marriage:"Marriage timing",spark:"Spark is gone",jeal:"Jealousy",other:"Other"}},
  ja:{h1a:"別れる？",h1b:"別れない？",tagline:"恋愛の悩みを匿名で投稿。アメリカと東京の見知らぬ誰かが判定します。決めるのはあなた。",
    judgeBtn:"判定する",judgeSub:"リアルな悩みをスワイプ",askBtn:"相談する",askSub:"匿名・登録なし",
    statQ:"人があなたの判定を待っています",statMine:"人の決断を手伝いました",
    audLabel:"公開範囲",audHint:"選んだ地域のユーザーだけがこの相談を見られます。",aud:{jp:"🇯🇵 日本",us:"🇺🇸 アメリカ",global:"🌐 全世界"},howL:"左スワイプ：別れる",howR:"右スワイプ：別れない",howU:"上スワイプ：スキップ",
    judgeTitle:"判定中",poolLocal:"日本語のみ",poolGlobal:"🌐 すべての言語",brk:"別れる",stay:"別れない",skip:"スキップ",
    hint:"← 別れる ・ → 別れない ・ ↑ スキップ",readonly:"閲覧はできますが、現在の権限では投票・投稿ができません。オーナーに「Contributor」権限を依頼してください。",
    askTitle:"何があったの？",qLabel:"あなたの状況",qPh:"例：付き合って3年。彼が大阪転勤になり、私に仕事を辞めてついてきてほしいと言っています…",
    tagsLabel:"タグ（任意）",lenLabel:"交際期間",privacy:"匿名を守るため、実名・会社名・学校名・SNSアカウントは書かないでください。メール・電話番号・リンク・@IDは自動で非表示になります。",
    post:"匿名で投稿",posted:"投稿しました。判定プールに入りました。",tooShort:"公平に判定してもらうため、30文字以上書いてください。",
    mineTitle:"わたしの相談",refresh:"更新",mineEmpty:"まだ相談していません。",askNow:"相談する",
    votes:"票",saidBrk:"が別れる派",saidStay:"が別れない派",noVotes:"まだ票がありません。少し待ってみてください。",
    followPh:"その後を追記（どうしましたか？）",followSave:"追記を保存",update:"その後",copy:"結果をコピー",copied:"コピーしました",
    youSaid:"あなたの判定",agree:"があなたと同じ意見",of:"/",comments:"コメント",commentPh:"コメントを残す（任意）",send:"送信",next:"スキップ →",
    exNote:"サンプルカードです。投票は保存されません。",ex:"サンプル",doneTitle:"おめでとう！この地域で恋に悩むすべての人を助けました",doneBody:"範囲を変えてみましょう。",pickScope:"地域を切り替える",waitingShort:"人が待っています",
    first:"最初の判定者になろう",commentSaved:"コメントしました",
    exWhy:"これはサンプルカードなので、投票は保存されていません。サンプルは本物の相談がまだ1件もないときだけ表示されます。本物の相談が投稿されると、投票とコメントはすべて保存・集計されます。",askFirst:"最初の相談を投稿する →",
    safetyTitle:"あなたの安全に関わる内容かもしれません",safetyBody:"この投稿は公開していません。これは投票で決めることではなく、きちんとしたサポートを受けてほしい内容です。無料・秘密厳守の相談窓口：",
    back:"編集に戻る",ageTitle:"18歳以上限定",ageBody:"Split or Stay は大人向けのサービスです。投稿は匿名で、見知らぬ人が判定します。",ageYes:"18歳以上です",
    tHome:"ホーム",splitWord:"別れる",vsTitle:"アメリカ vs 日本",nameUS:"アメリカ",nameJP:"日本",nameOther:"その他の地域",noRegionVotes:"まだ票がありません",totalVotes:"票（合計）",yourComment:"あなたのコメント",report:"⚑ 通報",reportArm:"⚑ もう一度タップで通報",reported:"通報しました。確認します。",terms:"利用規約",privacy:"プライバシー",contact:"お問い合わせ",connecting:"接続中…",rateLimited:"操作が速すぎます。少し時間をおいて試してください。",netErr:"サーバーに接続できません。通信環境を確認して再読み込みしてください。",agree:"投稿すると<a href=\"/terms.html\">利用規約</a>と<a href=\"/privacy.html\">プライバシーポリシー</a>に同意したものとみなされます。",ageBodyHtml:"Split or Stay は大人向けのサービスです。投稿は匿名で、見知らぬ人が判定します。続けることで<a href=\"/terms.html\">利用規約</a>と<a href=\"/privacy.html\">プライバシーポリシー</a>に同意したものとみなされます。",shareTail:"判定してね：",tJudge:"判定",tAsk:"相談",tMine:"マイ",regionUS:"🇺🇸 アメリカ",regionJP:"🇯🇵 東京/日本",regionOther:"🌐 その他",
    offline:"この画面ではライブデータを使えないため、サンプルカードのみ表示しています。",err:"保存できませんでした。もう一度お試しください。",
    lens:{a:"6ヶ月未満",b:"6ヶ月〜1年",c:"1〜3年",d:"3年以上",m:"結婚している"},
    tags:{cheat:"浮気",ldr:"遠距離",ghost:"既読無視",family:"家族の反対",money:"お金",marriage:"結婚のタイミング",spark:"冷めた",jeal:"嫉妬",other:"その他"}}
};
const TAGS=["cheat","ldr","ghost","family","money","marriage","spark","jeal","other"];
const LENS=["a","b","c","d","m"];
const FLAG={us:"🇺🇸",jp:"🇯🇵",other:"🌐"};
const SCOPES=["jp","us","global"];

const ls={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let lang = ls.get("sos_lang", (navigator.language||"en").toLowerCase().startsWith("ja")?"ja":"en");
let region = ls.get("sos_region", lang==="ja"?"jp":((navigator.language||"").toLowerCase()==="en-us"?"us":"other"));
let scope = ls.get("sos_scope", region==="other"?"global":region);
let audSel = region==="other" ? "global" : region;
const t = k => T[lang][k];
const nv = n => n.toLocaleString()+" "+(lang==="en"&&n===1?"vote":t("votes"));
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const inScope = p => (p.aud||"global")===scope;

let sb=null, uid=null, live=false;
let posts=[], postsAt=0, voted={}, seen=new Set(), current=null, mode="boot", tagsSel=new Set();
let profileAt=0;

function errMsg(e){ const m=(e&&(e.message||e.error_description))||""; return /rate_limited/.test(m)?t("rateLimited"):/fetch|network/i.test(m)?t("netErr"):t("err"); }

/* ---------- i18n ---------- */
function applyText(){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach(el=>{el.textContent=t(el.dataset.t)});
  $("langBtn").textContent = lang==="ja"?"EN":"日本語";
  $("regionBtn").textContent = "📍 "+t(region==="us"?"regionUS":region==="jp"?"regionJP":"regionOther").replace(/^\S+\s/,"");
  $("poolBtn").textContent = t("aud")[scope]+" ▾";
  $("qText").placeholder = t("qPh");
  $("agreeNote").innerHTML = t("agree");
  $("ageBody").innerHTML = t("ageBodyHtml");
  document.querySelectorAll(".contact-email").forEach(el=>el.textContent=C.contactEmail);
  const lenSel=$("qLen"), cur=lenSel.value||"c";
  lenSel.innerHTML = LENS.map(k=>`<option value="${k}">${esc(t("lens")[k])}</option>`).join("");
  lenSel.value=cur;
  $("audSeg").innerHTML = SCOPES.map(k=>`<button type="button" data-aud="${k}" aria-pressed="${audSel===k}">${esc(t("aud")[k])}</button>`).join("");
  $("tagChips").innerHTML = TAGS.map(k=>`<button type="button" class="tagbtn" data-tag="${k}" aria-pressed="${tagsSel.has(k)}">${esc(t("tags")[k])}</button>`).join("");
  updateStats();
}

/* ---------- navigation ---------- */
let view="home";
function go(v){
  view=v;
  document.documentElement.classList.toggle("judging", v==="judge");
  ["home","judge","ask","mine"].forEach(n=>$("v-"+n).hidden = n!==v);
  document.querySelectorAll("nav.tabs button").forEach(b=>b.setAttribute("aria-current", b.dataset.go===v?"page":"false"));
  if(v==="judge"){ if(live && Date.now()-postsAt>60e3) loadPosts().then(()=>{ if(mode!=="result"&&mode!=="flying") nextCard(); }); else if(!current||mode==="done") nextCard(); }
  if(v==="mine") renderMine();
  window.scrollTo(0,0);
}
document.addEventListener("click",e=>{
  const g=e.target.closest("[data-go]"); if(g){go(g.dataset.go);return}
  const au=e.target.closest("[data-aud]"); if(au){audSel=au.dataset.aud; document.querySelectorAll("[data-aud]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.aud===audSel)); return}
  const tg=e.target.closest("[data-tag]"); if(tg){const k=tg.dataset.tag; tagsSel.has(k)?tagsSel.delete(k):tagsSel.add(k); tg.setAttribute("aria-pressed",tagsSel.has(k));}
});
$("logo").onclick=()=>go("home");
$("langBtn").onclick=()=>{lang=lang==="ja"?"en":"ja";ls.set("sos_lang",lang);applyText();if(view==="judge"&&mode==="card"){seen.delete(current&&current.id);nextCard()} if(view==="mine")renderMine()};
$("regionBtn").onclick=()=>{region=region==="us"?"jp":region==="jp"?"other":"us";ls.set("sos_region",region);applyText();touchProfile(true)};
function setScope(k){scope=k;ls.set("sos_scope",k);seen.clear();applyText();current=null;if(view==="judge")nextCard()}
$("poolBtn").onclick=()=>setScope(SCOPES[(SCOPES.indexOf(scope)+1)%3]);

function toast(msg){const d=document.createElement("div");d.className="toast";d.textContent=msg;document.body.appendChild(d);setTimeout(()=>d.remove(),2200)}
function waitingCount(k){ return ((C.coldStartBase||{})[k]||0) + posts.filter(p=>p.author!==uid && !voted[p.id] && (p.aud||"global")===k).length; }
function updateStats(){
  $("statQ").textContent = waitingCount(scope).toLocaleString();
  $("statMine").textContent = Object.keys(voted).length.toLocaleString();
}
function setEnabled(){ $("postBtn").disabled = !live; }

/* ---------- data ---------- */
async function loadPosts(){
  const {data,error}=await sb.from("posts").select("id,text,tags,len,lang,region,aud,author,followup,created_at").eq("hidden",false).order("created_at",{ascending:false}).limit(500);
  if(error){ toast(errMsg(error)); return; }
  posts=data||[]; postsAt=Date.now(); updateStats();
}
async function loadMyVotes(){
  const {data}=await sb.from("votes").select("post_id,choice").eq("user_id",uid).limit(5000);
  voted={}; (data||[]).forEach(v=>voted[v.post_id]=v.choice);
}
async function fetchVotes(ids){
  if(!ids.length) return [];
  const {data}=await sb.from("vote_feed").select("post_id,choice,region,comment,updated_at").in("post_id",ids).limit(10000);
  return data||[];
}
function touchProfile(force){
  if(!live) return;
  const now=Date.now(); if(!force && now-profileAt<5*60e3) return; profileAt=now;
  sb.from("profiles").upsert({user_id:uid,region,lang,last_seen:new Date().toISOString()},{onConflict:"user_id"}).then(()=>{});
}

/* ---------- deck ---------- */
function pickNext(){
  return posts.find(p=>p.author!==uid && !voted[p.id] && !seen.has(p.id) && inScope(p)) || null;
}
function cardHTML(p, back){
  const L=T[p.lang]||T[lang];
  const lensTxt = L.lens[p.len] || "";
  const tagTxt = (p.tags||[]).map(k=>`<span class="chip">${esc(L.tags[k]||k)}</span>`).join("");
  return `<div class="card${back?" back":""}">
    ${back?"":`<div class="stamp brk">${esc(t("brk"))}</div><div class="stamp stay">${esc(t("stay"))}</div>`}
    <div class="meta"><span class="chip">${FLAG[p.region]||"🌐"}</span>${lensTxt?`<span class="chip">${esc(lensTxt)}</span>`:""}${tagTxt}</div>
    <div class="body">${esc(p.text)}</div>
    <div class="foot"><span>#${esc(String(p.id).slice(0,5))}</span>${back?"":`<button class="rep" type="button" id="repBtn">${esc(t("report"))}</button>`}</div>
  </div>`;
}
function nextCard(){
  const deck=$("deck");
  if(!live){ mode="boot"; setActions(false); return; }
  current = pickNext();
  $("actions").hidden=false; document.querySelector("#v-judge .hint").hidden=false;
  if(!current){
    mode="done";
    const others = SCOPES.filter(k=>k!==scope);
    deck.innerHTML = `<div class="empty"><h2>${esc(t("doneTitle"))}</h2><p class="muted" style="margin:0">${esc(t("doneBody"))}</p>
      <span class="label">${esc(t("pickScope"))}</span>
      <div class="scopepick">${others.map(k=>`<button type="button" data-scope="${k}"><b>${esc(t("aud")[k])}</b><span>${waitingCount(k).toLocaleString()} ${esc(t("waitingShort"))}</span></button>`).join("")}</div>
      <button class="btn ghost" type="button" data-go="ask">${esc(t("askNow"))}</button></div>`;
    deck.querySelectorAll("[data-scope]").forEach(b=>b.onclick=()=>setScope(b.dataset.scope));
    setActions(false); $("actions").hidden=true; document.querySelector("#v-judge .hint").hidden=true; return;
  }
  mode="card";
  seen.add(current.id);
  const peek = pickNext();
  deck.innerHTML = (peek?cardHTML(peek,true):"") + cardHTML(current,false);
  setActions(true);
  const card=deck.querySelector(".card:not(.back)");
  bindDrag(card);
  const rb=$("repBtn");
  rb.addEventListener("pointerdown",e=>e.stopPropagation());
  rb.onclick=async e=>{
    e.stopPropagation();
    if(rb.dataset.armed!=="1"){ rb.dataset.armed="1"; rb.textContent=t("reportArm"); return; }
    rb.disabled=true;
    const {error}=await sb.from("reports").insert({post_id:current.id,user_id:uid});
    if(error && error.code!=="23505"){ toast(errMsg(error)); rb.disabled=false; return; }
    toast(t("reported")); fly("skip");
  };
}
function setActions(on){ $("bBrk").disabled=!on; $("bStay").disabled=!on; $("bSkip").disabled=!on; }
function bindDrag(card){
  let sx=0,sy=0,dx=0,dy=0,drag=false;
  const sB=card.querySelector(".stamp.brk"), sS=card.querySelector(".stamp.stay");
  card.addEventListener("touchmove",e=>e.preventDefault(),{passive:false});
  card.addEventListener("pointerdown",e=>{drag=true;sx=e.clientX;sy=e.clientY;dx=dy=0;card.setPointerCapture(e.pointerId);card.style.transition="none"});
  card.addEventListener("pointermove",e=>{
    if(!drag)return; dx=e.clientX-sx; dy=e.clientY-sy;
    card.style.transform=`translate(${dx}px,${dy}px) rotate(${dx/18}deg)`;
    sB.style.opacity=Math.max(0,Math.min(1,-dx/100)); sS.style.opacity=Math.max(0,Math.min(1,dx/100));
  });
  const end=()=>{
    if(!drag)return; drag=false;
    if(dx<-100) fly("break"); else if(dx>100) fly("stay"); else if(dy<-110 && Math.abs(dx)<90) fly("skip");
    else {card.style.transition="transform .25s";card.style.transform="";sB.style.opacity=0;sS.style.opacity=0}
  };
  card.addEventListener("pointerup",end); card.addEventListener("pointercancel",end);
}
function fly(choice){
  if(mode!=="card"||!current)return;
  const card=$("deck").querySelector(".card:not(.back)"); if(!card)return;
  mode="flying"; setActions(false);
  const x = choice==="break"?-1.4:choice==="stay"?1.4:0, y = choice==="skip"?-1.3:0;
  card.style.transition="transform .28s ease-in";
  card.style.transform=`translate(${x*100}vw,${y*100}vh) rotate(${x*20}deg)`;
  setTimeout(()=>{ choice==="skip" ? nextCard() : castVote(choice) },280);
}
$("bBrk").onclick=()=>fly("break"); $("bStay").onclick=()=>fly("stay"); $("bSkip").onclick=()=>fly("skip");
document.addEventListener("keydown",e=>{
  if(view!=="judge"||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;
  if(mode==="card"){ if(e.key==="ArrowLeft")fly("break"); if(e.key==="ArrowRight")fly("stay"); if(e.key==="ArrowUp")fly("skip"); }
  else if(mode==="result" && (e.key==="ArrowRight"||e.key==="Enter")) nextCard();
});

/* ---------- votes ---------- */
function tally(list){
  const out={n:0,b:0,s:0,reg:{us:{b:0,s:0},jp:{b:0,s:0},other:{b:0,s:0}},cms:[]};
  list.forEach(v=>{ const k=v.choice==="break"?"b":"s"; out.n++; out[k]++; (out.reg[v.region]||out.reg.other)[k]++; if(v.comment) out.cms.push(v); });
  out.cms.sort((a,b)=>String(b.updated_at).localeCompare(String(a.updated_at)));
  return out;
}
async function castVote(choice){
  const p=current;
  voted[p.id]=choice; updateStats();
  const {error}=await sb.from("votes").upsert({post_id:p.id,user_id:uid,choice,region},{onConflict:"post_id,user_id"});
  if(error){ delete voted[p.id]; updateStats(); toast(errMsg(error)); }
  touchProfile(false);
  renderResult(p,choice,tally(await fetchVotes([p.id])));
}
function barHTML(b,s){
  const n=b+s, bp=n?Math.round(b/n*100):50;
  return `<div class="bar" role="img" aria-label="${bp}% ${esc(t("brk"))}, ${100-bp}% ${esc(t("stay"))}"><div class="b" style="width:${bp}%"></div><div class="s" style="width:${100-bp}%"></div></div>`;
}
function regionsHTML(tl){
  return `<div class="regions">${["us","jp","other"].map(r=>{const x=tl.reg[r],n=x.b+x.s; if(!n)return""; const bp=Math.round(x.b/n*100);
    return `<div class="region"><span>${FLAG[r]}</span>${barHTML(x.b,x.s)}<span class="muted">${bp}% 💔 · ${n}</span></div>`}).join("")}</div>`;
}
function commentsHTML(cms,max){
  if(!cms.length) return "";
  return `<div class="comments"><span class="label">${esc(t("comments"))}</span>${cms.slice(0,max).map(c=>`<div class="cm"><span class="who">${FLAG[c.region]||"🌐"} · ${c.choice==="break"?"💔 "+esc(t("brk")):"❤️ "+esc(t("stay"))}</span>${esc(c.comment)}</div>`).join("")}</div>`;
}
function compareHTML(tl){
  const tile=(r,name)=>{const x=tl.reg[r],n=x.b+x.s; return `<div class="cmp-tile ${r}">
      <span class="cmp-name">${FLAG[r]} ${esc(name)}</span>
      ${n?`<b>${Math.round(x.b/n*100)}%</b><span class="cmp-sub">${esc(t("splitWord"))} · ${esc(nv(n))}</span>`:`<b class="none">—</b><span class="cmp-sub">${esc(t("noRegionVotes"))}</span>`}
    </div>`};
  const o=tl.reg.other, on=o.b+o.s;
  return `<div class="cmp"><span class="label">${esc(t("vsTitle"))}</span>
    <div class="cmp-grid">${tile("us",t("nameUS"))}${tile("jp",t("nameJP"))}</div>
    ${on?`<div class="small muted">🌐 ${esc(t("nameOther"))}: ${Math.round(o.b/on*100)}% ${esc(t("splitWord"))} · ${esc(nv(on))}</div>`:""}</div>`;
}
function splitHTML(tl){
  const bp=tl.n?Math.round(tl.b/tl.n*100):0, spct=tl.n?100-bp:0;
  return `<div class="split2"><div class="sb"><span>💔 ${esc(t("brk"))}</span><b>${bp}%</b></div><div class="ss"><span>❤️ ${esc(t("stay"))}</span><b>${spct}%</b></div></div>
    ${barHTML(tl.b,tl.s)}<div class="small muted total-votes">${tl.n.toLocaleString()} ${esc(lang==="en"&&tl.n===1?"vote in total":t("totalVotes"))}</div>`;
}
function renderResult(p,choice,tl){
  mode="result";
  const deck=$("deck");
  deck.innerHTML = `<div class="result">
    <div class="verdict">${esc(t("youSaid"))} <b class="${choice==="break"?"brk":"stay"}">${choice==="break"?"💔 "+esc(t("brk")):"❤️ "+esc(t("stay"))}</b></div>
    ${splitHTML(tl)}
    ${compareHTML(tl)}
    ${commentsHTML(tl.cms,5)}
    <div class="field"><span class="label">${esc(t("yourComment"))}</span><div class="row"><input type="text" id="cmIn" maxlength="280" placeholder="${esc(t("commentPh"))}"><button class="btn ghost" type="button" id="cmSend">${esc(t("send"))}</button></div></div>
    <button class="btn wide" type="button" id="nextBtn">${esc(t("next"))}</button>
  </div>`;
  $("nextBtn").onclick=nextCard;
  const send=$("cmSend");
  const doSend=async()=>{ const v=mask($("cmIn").value.trim()); if(!v)return; send.disabled=true;
    const {error}=await sb.from("votes").update({comment:v.slice(0,280)}).eq("post_id",p.id).eq("user_id",uid);
    if(error){ toast(errMsg(error)); send.disabled=false; return; }
    toast(t("commentSaved")); renderResult(p,choice,tally(await fetchVotes([p.id])));
  };
  send.onclick=doSend; $("cmIn").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();doSend()}});
  const r=deck.querySelector(".result"); let sx=null;
  r.addEventListener("pointerdown",e=>{ if(e.target.closest("input,button"))return; sx=e.clientX });
  r.addEventListener("pointerup",e=>{ if(sx!=null && Math.abs(e.clientX-sx)>80) nextCard(); sx=null });
  setActions(false);
  $("actions").hidden=true; document.querySelector("#v-judge .hint").hidden=true;
}

/* ---------- ask ---------- */
function mask(s){
  return s.replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g,"[email]")
          .replace(/https?:\/\/\S+|www\.\S+/gi,"[link]")
          .replace(/@[A-Za-z0-9_.]{2,}/g,"@[id]")
          .replace(/\+?\d[\d\s\-()]{8,}\d/g,"[phone]");
}
const CRISIS=[/suicid|kill myself|end my life|want to die|self[- ]?harm|hurt myself|\bhits me\b|\bhit me(?! up)\b|\bbeats? me\b|\babus(e|ed|ive)\b|threaten(s|ed)? (to|me)|chok(e|ed|es) me|\brape/i,
  /死にたい|自殺|自傷|リスカ|殴られ|殴る|暴力|ＤＶ|\bDV\b|首を絞|脅され|消えたい/];
function safetyHTML(){
  const us=`<div>🇺🇸 988 Suicide & Crisis Lifeline (call or text)<b>988</b></div><div>🇺🇸 National Domestic Violence Hotline<b>1-800-799-7233</b></div>`;
  const jp=`<div>🇯🇵 DV相談ナビ<b>#8008</b></div><div>🇯🇵 よりそいホットライン（24時間）<b>0120-279-338</b></div>`;
  return `<div class="safety"><h2>${esc(t("safetyTitle"))}</h2><p style="margin:0">${esc(t("safetyBody"))}</p>
    <div class="res">${region==="jp"?jp+us:us+jp}</div>
    <button class="btn ghost" type="button" id="backEdit">${esc(t("back"))}</button></div>`;
}
$("qText").addEventListener("input",()=>{$("qCount").textContent=$("qText").value.length});
$("askForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const out=$("askOut"); const raw=$("qText").value.trim();
  if(raw.length<30){ out.innerHTML=`<div class="notice">${esc(t("tooShort"))}</div>`; return; }
  if(CRISIS.some(re=>re.test(raw))){ out.innerHTML=safetyHTML(); $("askForm").hidden=true;
    $("backEdit").onclick=()=>{$("askForm").hidden=false;out.innerHTML=""}; out.scrollIntoView({block:"start"}); return; }
  if(!live) return;
  $("postBtn").disabled=true;
  const row={text:mask(raw).slice(0,800),tags:[...tagsSel],len:$("qLen").value,lang:/[぀-ヿ一-鿿]/.test(raw)?"ja":"en",region,aud:audSel,author:uid};
  const {error}=await sb.from("posts").insert(row);
  if(error){ out.innerHTML=`<div class="notice">${esc(errMsg(error))}</div>`; }
  else{
    $("qText").value=""; $("qCount").textContent="0"; tagsSel.clear(); applyText(); touchProfile(true);
    out.innerHTML=`<div class="notice">${esc(t("posted"))} <button class="btn ghost" type="button" data-go="mine" style="margin-left:6px">${esc(t("tMine"))} →</button></div>`;
    loadPosts();
  }
  $("postBtn").disabled=!live;
});

/* ---------- mine ---------- */
async function renderMine(){
  const list=$("mineList");
  if(!live){ list.innerHTML=`<div class="notice">${esc(t("connecting"))}</div>`; return; }
  const {data:mine,error}=await sb.from("posts").select("*").eq("author",uid).order("created_at",{ascending:false});
  if(error){ list.innerHTML=`<div class="notice">${esc(errMsg(error))}</div>`; return; }
  if(!mine.length){ list.innerHTML=`<div class="empty" style="position:static;padding:32px 20px"><p class="muted" style="margin:0">${esc(t("mineEmpty"))}</p><button class="btn" type="button" data-go="ask">${esc(t("askNow"))}</button></div>`; return; }
  const all = await fetchVotes(mine.map(p=>p.id));
  const tallies = mine.map(p=>tally(all.filter(v=>v.post_id===p.id)));
  list.innerHTML = `<div style="display:grid;gap:14px">${mine.map((p,i)=>{ const tl=tallies[i]; const bp=tl.n?Math.round(tl.b/tl.n*100):0;
    return `<article class="qcard">
      <div class="meta" style="display:flex;gap:6px;flex-wrap:wrap"><span class="chip">${esc(t("aud")[p.aud||"global"])}</span>${(p.tags||[]).map(k=>`<span class="chip">${esc(T[lang].tags[k]||k)}</span>`).join("")}<span class="chip">${esc(new Date(p.created_at).toLocaleDateString(lang))}</span>${p.hidden?`<span class="chip" style="color:var(--brk)">hidden</span>`:""}</div>
      <div class="q">${esc(p.text)}</div>
      ${tl.n?`${splitHTML(tl)}${compareHTML(tl)}${commentsHTML(tl.cms,20)}
        <button class="btn ghost" type="button" data-copy="${i}">${esc(t("copy"))}</button>`:`<p class="muted small" style="margin:0">${esc(t("noVotes"))}</p>`}
      ${p.followup?`<div class="followup"><b>${esc(t("update"))}:</b> ${esc(p.followup)}</div>`:""}
      <div class="row"><input type="text" id="fu-${i}" maxlength="300" placeholder="${esc(t("followPh"))}"><button class="btn ghost" type="button" data-fu="${i}">${esc(t("followSave"))}</button></div>
    </article>`}).join("")}</div>`;
  list.querySelectorAll("[data-copy]").forEach(b=>b.onclick=()=>{
    const tl=tallies[+b.dataset.copy], bp=Math.round(tl.b/tl.n*100);
    const reg=["us","jp"].map(r=>{const x=tl.reg[r],n=x.b+x.s;return n?`${FLAG[r]} ${Math.round(x.b/n*100)}% ${lang==="ja"?"別れる":"Split"}`:""}).filter(Boolean).join(" vs ");
    const url=location.origin+"/";
    const txt = lang==="ja" ? `Split or Stay：${bp}%の人が「別れる」💔${reg?`（${reg}）`:""} ${tl.n}票\n${t("shareTail")} ${url}` : `Split or Stay: ${bp}% said break up 💔${reg?` (${reg})`:""} · ${tl.n} votes\n${t("shareTail")} ${url}`;
    (navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>toast(t("copied"))).catch(()=>toast(txt));
  });
  list.querySelectorAll("[data-fu]").forEach(b=>b.onclick=async()=>{
    const p=mine[+b.dataset.fu], v=mask($("fu-"+b.dataset.fu).value.trim()); if(!v)return; b.disabled=true;
    const {error}=await sb.from("posts").update({followup:v.slice(0,300)}).eq("id",p.id);
    if(error){ toast(errMsg(error)); b.disabled=false; } else renderMine();
  });
}
$("refreshMine").onclick=renderMine;

/* ---------- age gate ---------- */
if(!ls.get("sos_age",false)) $("ageGate").hidden=false;
$("ageYes").onclick=()=>{ls.set("sos_age",true);$("ageGate").hidden=true};

/* ---------- boot ---------- */
applyText(); setEnabled(); go("home");

function turnstileToken(){
  return new Promise(resolve=>{
    if(!C.turnstileSiteKey) return resolve(undefined);
    const s=document.createElement("script");
    s.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.onload=()=>{ const box=document.createElement("div"); box.style.cssText="position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:70"; document.body.appendChild(box);
      window.turnstile.render(box,{sitekey:C.turnstileSiteKey,appearance:"interaction-only",callback:tok=>{resolve(tok); setTimeout(()=>box.remove(),500)},"error-callback":()=>resolve(undefined)}); };
    s.onerror=()=>resolve(undefined);
    document.head.appendChild(s);
  });
}
(async function connect(){
  try{
    sb = window.supabase.createClient(C.supabaseUrl, C.supabaseAnonKey, {auth:{persistSession:true,autoRefreshToken:true}});
    let {data:{session}} = await sb.auth.getSession();
    if(!session){
      const captchaToken = await turnstileToken();
      const r = await sb.auth.signInAnonymously(captchaToken?{options:{captchaToken}}:undefined);
      if(r.error) throw r.error;
      session = r.data.session;
    }
    uid = session.user.id; live = true; setEnabled();
    await Promise.all([loadMyVotes(), loadPosts()]);
    touchProfile(true);
    if(view==="judge" && mode!=="result") { seen.clear(); nextCard(); }
    if(view==="mine") renderMine();
  }catch(e){
    console.error(e);
    $("deck").innerHTML=`<div class="boot"><b>OFFLINE</b><span>${esc(t("netErr"))}</span></div>`;
  }
})();
})();
