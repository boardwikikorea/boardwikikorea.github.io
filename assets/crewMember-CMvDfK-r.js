import{w as s,s as i}from"./index-CHs91-cc.js";import{t as p}from"./imageBucket-BkpcUuff.js";const w=["instagram","youtube","facebook","homepage","x","tiktok","etc"],C=["yearly","monthly"];function d(e){if(!e)return 0;const t=new Date(e).getTime();return Number.isFinite(t)?t:0}function f(e){return Array.isArray(e)?e[0]??null:e}function m(e){return w.includes(e)}function A(e){return C.includes(e)}function _(e){const t=(e==null?void 0:e.trim())??"";return t.length>0?t:null}function k(e){return e.map(t=>({type:m(t.type)?t.type:"etc",url:t.url.trim()})).filter(t=>t.url.length>0)}function g(e){return[...e??[]].sort((t,r)=>{const n=(t.sort_order??0)-(r.sort_order??0);return n!==0?n:d(t.created_at)-d(r.created_at)}).map((t,r)=>({id:t.id,type:m(t.type)?t.type:"etc",url:t.url,sortOrder:t.sort_order??r}))}function u(e){const t=f(e.primary_spot),r=f((t==null?void 0:t.location)??null);return{id:e.id,name:e.name,activityArea:e.activity_area??null,countryCode:e.country_code??null,primarySpotId:e.primary_spot_id??null,primarySpotName:(r==null?void 0:r.name)??null,primarySpotAddress:[r==null?void 0:r.address,r==null?void 0:r.address_detail].filter(Boolean).join(" ")||null,chatLink:e.chat_link??null,socialLinks:g(e.social_links),content:e.content??null,logoUrl:e.logo_url?p(e.logo_url):null,feeUse:e.fee_use??!1,feeType:e.fee_type&&A(e.fee_type)?e.fee_type:null,feeText:e.fee_text??null,isActive:e.is_active??!0,createdAt:e.created_at??null,updatedAt:e.updated_at??null}}const T=`
  id,
  name,
  activity_area,
  country_code,
  primary_spot_id,
  chat_link,
  content,
  logo_url,
  fee_use,
  fee_type,
  fee_text,
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
`,b=`
  id,
  name,
  activity_area,
  country_code,
  chat_link,
  content,
  logo_url,
  fee_use,
  fee_type,
  fee_text,
  is_active,
  created_at,
  updated_at
`,E=`
  ${b},
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
`,S=`
  id,
  name,
  activity_area,
  country_code,
  primary_spot_id,
  logo_url,
  fee_use,
  fee_type,
  fee_text,
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
  )
`,v=`
  id,
  name,
  activity_area,
  logo_url,
  fee_use,
  fee_type,
  is_active,
  created_at,
  updated_at
`;async function y(e,t){const r=k(t),{error:n}=await i.from("crew_social_link").delete().eq("crew_id",e);if(n)throw n;if(r.length===0)return;const{error:a}=await i.from("crew_social_link").insert(r.map((c,o)=>({crew_id:e,type:c.type,url:c.url,sort_order:o})));if(a)throw a}async function x(){return s(async()=>{const{data:e,error:t}=await i.from("crew").select(S).eq("is_active",!0);if(t)throw t;return(e??[]).map(u).sort((r,n)=>{const a=d(n.updatedAt??n.createdAt),c=d(r.updatedAt??r.createdAt),o=a-c;return o!==0?o:r.name.localeCompare(n.name)})})}async function U(){return s(async()=>{const{data:e,error:t}=await i.from("crew").select(v);if(t)throw t;return(e??[]).map(u).sort((r,n)=>{const a=d(n.updatedAt??n.createdAt),c=d(r.updatedAt??r.createdAt),o=a-c;return o!==0?o:r.name.localeCompare(n.name)})})}async function M(e){return s(async()=>{const{data:t,error:r}=await i.from("crew").select(T).eq("id",e).maybeSingle();if(r)throw r;return t?u(t):null})}async function P(e){return s(async()=>{const{data:t,error:r}=await i.from("crew").select(E).eq("id",e).eq("is_active",!0).maybeSingle();if(r)throw r;return t?u(t):null})}async function W(e){return s(async()=>{var n;const{data:t,error:r}=await i.from("crew").insert({name:e.name.trim(),activity_area:((n=e.activityArea)==null?void 0:n.trim())||null,country_code:e.countryCode,primary_spot_id:e.primarySpotId,chat_link:_(e.chatLink),content:_(e.content),logo_url:e.logoUrl,fee_use:e.feeUse,fee_type:e.feeUse?e.feeType:null,fee_text:e.feeUse?_(e.feeText):null,is_active:e.isActive}).select("id").single();if(r)throw r;return await y(t.id,e.socialLinks),t.id})}async function D(e,t){return s(async()=>{var n;const{error:r}=await i.from("crew").update({name:t.name.trim(),activity_area:((n=t.activityArea)==null?void 0:n.trim())||null,country_code:t.countryCode,primary_spot_id:t.primarySpotId,chat_link:_(t.chatLink),content:_(t.content),logo_url:t.logoUrl,fee_use:t.feeUse,fee_type:t.feeUse?t.feeType:null,fee_text:t.feeUse?_(t.feeText):null,is_active:t.isActive}).eq("id",e);if(r)throw r;await y(e,t.socialLinks)})}async function F(e,t){return s(async()=>{const{error:r}=await i.from("crew").update({is_active:t}).eq("id",e);if(r)throw r})}function L(e){return Array.isArray(e)?e[0]??null:e}function h(e){return Array.isArray(e)?e[0]??null:e}async function O(e){return s(async()=>{const{data:t,error:r}=await i.from("crew_member").select(`
        id,
        crew_id,
        user_id,
        role,
        yearly_fee_paid,
        created_at,
        profile:profile!crew_member_user_id_fkey (
          nickname,
          full_name,
          provider
        )
      `).eq("crew_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(n=>{const a=L(n.profile);return{id:n.id,crewId:n.crew_id,userId:n.user_id,role:n.role,yearlyFeePaid:n.yearly_fee_paid??!1,createdAt:n.created_at,nickname:(a==null?void 0:a.nickname)??null,fullName:(a==null?void 0:a.full_name)??null,provider:(a==null?void 0:a.provider)??"unknown"}})})}async function R(e){return s(async()=>{const{data:t,error:r}=await i.rpc("get_my_crew_member_crew_ids");if(!r)return(t??[]).map(c=>typeof c=="string"?c:c.crew_id);const{data:n,error:a}=await i.from("crew_member").select("crew_id").eq("user_id",e);if(a)throw a;return(n??[]).map(c=>c.crew_id)})}async function B(e){return s(async()=>{const{data:t,error:r}=await i.from("crew_member").select("crew_id,yearly_fee_paid").eq("user_id",e);if(r)throw r;return(t??[]).map(n=>({crewId:n.crew_id,yearlyFeePaid:n.yearly_fee_paid??!1}))})}async function N(e){return s(async()=>{const{data:t,error:r}=await i.from("crew_member").select("crew_id").eq("user_id",e).eq("role","leader");if(r)throw r;return(t??[]).map(n=>n.crew_id)})}async function z(e){return s(async()=>{const{data:t,error:r}=await i.rpc("get_crew_member_count",{p_crew_id:e});if(r)throw r;return Number(t??0)})}async function Y(e){return s(async()=>{const{data:t,error:r}=await i.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",e);if(r)throw r;return(t??[]).reduce((n,a)=>{const c=n[a.user_id]??{attendCount:0,lastAttendAt:null},o=h(a.meetup),l=(o==null?void 0:o.meetup_at)??null;return c.attendCount+=1,l&&(!c.lastAttendAt||new Date(l).getTime()>new Date(c.lastAttendAt).getTime())&&(c.lastAttendAt=l),n[a.user_id]=c,n},{})})}async function j(e,t,r="member"){return s(async()=>{const{error:n}=await i.from("crew_member").upsert({crew_id:e,user_id:t,role:r},{onConflict:"crew_id,user_id"});if(n)throw n})}async function H(e,t){return s(async()=>{const{error:r}=await i.from("crew_member").delete().eq("crew_id",e).eq("user_id",t);if(r)throw r})}async function $(e,t){return s(async()=>{const{error:r}=await i.from("crew_member").update({yearly_fee_paid:t}).eq("id",e);if(r)throw r})}export{w as C,B as a,P as b,R as c,z as d,O as e,x as f,N as g,U as h,j as i,Y as j,$ as k,C as l,M as m,W as n,D as o,H as r,F as u};
