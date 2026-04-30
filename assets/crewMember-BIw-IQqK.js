import{w as o,s as c}from"./index-C9-_amc4.js";import{t as A}from"./imageBucket-BkpcUuff.js";const k=["instagram","youtube","facebook","homepage","x","tiktok","etc"];function d(e){if(!e)return 0;const r=new Date(e).getTime();return Number.isFinite(r)?r:0}function m(e){return Array.isArray(e)?e[0]??null:e}function f(e){return k.includes(e)}function g(e){return e.map(r=>({type:f(r.type)?r.type:"etc",url:r.url.trim()})).filter(r=>r.url.length>0)}function h(e){return[...e??[]].sort((r,t)=>{const n=(r.sort_order??0)-(t.sort_order??0);return n!==0?n:d(r.created_at)-d(t.created_at)}).map((r,t)=>({id:r.id,type:f(r.type)?r.type:"etc",url:r.url,sortOrder:r.sort_order??t}))}function _(e){const r=m(e.primary_spot),t=m((r==null?void 0:r.location)??null);return{id:e.id,name:e.name,activityArea:e.activity_area??null,countryCode:e.country_code??null,primarySpotId:e.primary_spot_id??null,primarySpotName:(t==null?void 0:t.name)??null,primarySpotAddress:[t==null?void 0:t.address,t==null?void 0:t.address_detail].filter(Boolean).join(" ")||null,chatLink:e.chat_link??null,socialLinks:h(e.social_links),content:e.content??null,logoUrl:e.logo_url?A(e.logo_url):null,isActive:e.is_active??!0,createdAt:e.created_at??null,updatedAt:e.updated_at??null}}const y=`
  id,
  name,
  activity_area,
  country_code,
  primary_spot_id,
  chat_link,
  content,
  logo_url,
  is_active,
  created_at,
  updated_at,
  primary_spot:spot_info!crew_primary_spot_id_fkey (
    id,
    location:location!spot_info_id_fkey (
      name,
      address,
      address_detail
    )
  ),
  social_links:crew_social_link (
    id,
    crew_id,
    type,
    url,
    sort_order,
    created_at,
    updated_at
  )
`,w=`
  id,
  name,
  activity_area,
  country_code,
  chat_link,
  content,
  logo_url,
  is_active,
  created_at,
  updated_at
`,p=`
  ${w},
  primary_spot_id,
  social_links:crew_social_link (
    id,
    crew_id,
    type,
    url,
    sort_order,
    created_at,
    updated_at
  ),
  primary_spot:spot_info!crew_primary_spot_id_fkey (
    id,
    location:location!spot_info_id_fkey (
      name,
      address,
      address_detail
    )
  )
`;async function C(e,r){const t=g(r),{error:n}=await c.from("crew_social_link").delete().eq("crew_id",e);if(n)throw n;if(t.length===0)return;const{error:a}=await c.from("crew_social_link").insert(t.map((i,s)=>({crew_id:e,type:i.type,url:i.url,sort_order:s})));if(a)throw a}async function E(){return o(async()=>{const{data:e,error:r}=await c.from("crew").select(y);if(r)throw r;return(e??[]).map(_).sort((t,n)=>{const a=d(n.updatedAt??n.createdAt),i=d(t.updatedAt??t.createdAt),s=a-i;return s!==0?s:t.name.localeCompare(n.name)})})}async function L(e={}){return o(async()=>{const r=e.includePrimarySpot?p:w,{data:t,error:n}=await c.from("crew").select(r).eq("is_active",!0);if(n)throw n;return(t??[]).map(_).sort((a,i)=>{const s=d(i.updatedAt??i.createdAt),u=d(a.updatedAt??a.createdAt),l=s-u;return l!==0?l:a.name.localeCompare(i.name)})})}async function I(e){return o(async()=>{const{data:r,error:t}=await c.from("crew").select(y).eq("id",e).maybeSingle();if(t)throw t;return r?_(r):null})}async function T(e){return o(async()=>{const{data:r,error:t}=await c.from("crew").select(p).eq("id",e).eq("is_active",!0).maybeSingle();if(t)throw t;return r?_(r):null})}async function M(e){return o(async()=>{var n,a,i;const{data:r,error:t}=await c.from("crew").insert({name:e.name.trim(),activity_area:((n=e.activityArea)==null?void 0:n.trim())||null,country_code:e.countryCode,primary_spot_id:e.primarySpotId,chat_link:((a=e.chatLink)==null?void 0:a.trim())||null,content:((i=e.content)==null?void 0:i.trim())||null,logo_url:e.logoUrl,is_active:e.isActive}).select("id").single();if(t)throw t;return await C(r.id,e.socialLinks),r.id})}async function D(e,r){return o(async()=>{var n,a,i;const{error:t}=await c.from("crew").update({name:r.name.trim(),activity_area:((n=r.activityArea)==null?void 0:n.trim())||null,country_code:r.countryCode,primary_spot_id:r.primarySpotId,chat_link:((a=r.chatLink)==null?void 0:a.trim())||null,content:((i=r.content)==null?void 0:i.trim())||null,logo_url:r.logoUrl,is_active:r.isActive}).eq("id",e);if(t)throw t;await C(e,r.socialLinks)})}async function P(e,r){return o(async()=>{const{error:t}=await c.from("crew").update({is_active:r}).eq("id",e);if(t)throw t})}function b(e){return Array.isArray(e)?e[0]??null:e}function v(e){return Array.isArray(e)?e[0]??null:e}async function B(e){return o(async()=>{const{data:r,error:t}=await c.from("crew_member").select(`
        id,
        crew_id,
        user_id,
        role,
        created_at,
        profile:profile!crew_member_user_id_fkey (
          nickname,
          full_name,
          provider
        )
      `).eq("crew_id",e).order("created_at",{ascending:!1});if(t)throw t;return(r??[]).map(n=>{const a=b(n.profile);return{id:n.id,crewId:n.crew_id,userId:n.user_id,role:n.role,createdAt:n.created_at,nickname:(a==null?void 0:a.nickname)??null,fullName:(a==null?void 0:a.full_name)??null,provider:(a==null?void 0:a.provider)??"unknown"}})})}async function U(e){return o(async()=>{const{data:r,error:t}=await c.rpc("get_my_crew_member_crew_ids");if(!t)return(r??[]).map(i=>typeof i=="string"?i:i.crew_id);const{data:n,error:a}=await c.from("crew_member").select("crew_id").eq("user_id",e);if(a)throw a;return(n??[]).map(i=>i.crew_id)})}async function N(e){return o(async()=>{const{data:r,error:t}=await c.from("crew_member").select("crew_id").eq("user_id",e).eq("role","leader");if(t)throw t;return(r??[]).map(n=>n.crew_id)})}async function O(e){return o(async()=>{const{data:r,error:t}=await c.rpc("get_crew_member_count",{p_crew_id:e});if(t)throw t;return Number(r??0)})}async function W(e){return o(async()=>{const{data:r,error:t}=await c.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",e);if(t)throw t;return(r??[]).reduce((n,a)=>{const i=n[a.user_id]??{attendCount:0,lastAttendAt:null},s=v(a.meetup),u=(s==null?void 0:s.meetup_at)??null;return i.attendCount+=1,u&&(!i.lastAttendAt||new Date(u).getTime()>new Date(i.lastAttendAt).getTime())&&(i.lastAttendAt=u),n[a.user_id]=i,n},{})})}async function R(e,r,t="member"){return o(async()=>{const{error:n}=await c.from("crew_member").upsert({crew_id:e,user_id:r,role:t},{onConflict:"crew_id,user_id"});if(n)throw n})}async function j(e,r){return o(async()=>{const{error:t}=await c.from("crew_member").delete().eq("crew_id",e).eq("user_id",r);if(t)throw t})}export{k as C,U as a,T as b,O as c,B as d,N as e,L as f,E as g,R as h,W as i,I as j,M as k,D as l,j as r,P as u};
