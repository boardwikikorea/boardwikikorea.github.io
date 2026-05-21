import{w as o,s as i}from"./index-LjS2ZyhT.js";import{a as p}from"./imageBucket-aR76qrBV.js";const w=["instagram","youtube","facebook","homepage","x","tiktok","etc"],C=["yearly","monthly"];function d(e){if(!e)return 0;const r=new Date(e).getTime();return Number.isFinite(r)?r:0}function f(e){return Array.isArray(e)?e[0]??null:e}function m(e){return w.includes(e)}function A(e){return C.includes(e)}function s(e){const r=(e==null?void 0:e.trim())??"";return r.length>0?r:null}function g(e){return e.map(r=>({type:m(r.type)?r.type:"etc",url:r.url.trim()})).filter(r=>r.url.length>0)}function k(e){return[...e??[]].sort((r,t)=>{const n=(r.sort_order??0)-(t.sort_order??0);return n!==0?n:d(r.created_at)-d(t.created_at)}).map((r,t)=>({id:r.id,type:m(r.type)?r.type:"etc",url:r.url,sortOrder:r.sort_order??t}))}function u(e){const r=f(e.primary_spot),t=f((r==null?void 0:r.location)??null);return{id:e.id,name:e.name,activityArea:e.activity_area??null,countryCode:e.country_code??null,primarySpotId:e.primary_spot_id??null,primarySpotName:(t==null?void 0:t.name)??null,primarySpotAddress:[t==null?void 0:t.address,t==null?void 0:t.address_detail].filter(Boolean).join(" ")||null,primarySpotGoogleMapUrl:(t==null?void 0:t.google_map_url)??null,chatLink:e.chat_link??null,socialLinks:k(e.social_links),content:e.content??null,logoUrl:e.logo_url?p(e.logo_url):null,feeUse:e.fee_use??!1,feeType:e.fee_type&&A(e.fee_type)?e.fee_type:null,feeText:e.fee_text??null,isActive:e.is_active??!0,createdAt:e.created_at??null,updatedAt:e.updated_at??null}}const T=`
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
      address_detail,
      google_map_url
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
      address_detail,
      google_map_url
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
      address_detail,
      google_map_url
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
`;async function y(e,r){const t=g(r),{error:n}=await i.from("crew_social_link").delete().eq("crew_id",e);if(n)throw n;if(t.length===0)return;const{error:a}=await i.from("crew_social_link").insert(t.map((c,_)=>({crew_id:e,type:c.type,url:c.url,sort_order:_})));if(a)throw a}async function U(){return o(async()=>{const{data:e,error:r}=await i.from("crew").select(S).eq("is_active",!0);if(r)throw r;return(e??[]).map(u).sort((t,n)=>{const a=d(n.updatedAt??n.createdAt),c=d(t.updatedAt??t.createdAt),_=a-c;return _!==0?_:t.name.localeCompare(n.name)})})}async function x(){return o(async()=>{const{data:e,error:r}=await i.from("crew").select(v);if(r)throw r;return(e??[]).map(u).sort((t,n)=>{const a=d(n.updatedAt??n.createdAt),c=d(t.updatedAt??t.createdAt),_=a-c;return _!==0?_:t.name.localeCompare(n.name)})})}async function M(e){return o(async()=>{const{data:r,error:t}=await i.from("crew").select(T).eq("id",e).maybeSingle();if(t)throw t;return r?u(r):null})}async function P(e){return o(async()=>{const{data:r,error:t}=await i.from("crew").select(E).eq("id",e).eq("is_active",!0).maybeSingle();if(t)throw t;return r?u(r):null})}async function R(e){return o(async()=>{var n;const{data:r,error:t}=await i.from("crew").insert({name:e.name.trim(),activity_area:((n=e.activityArea)==null?void 0:n.trim())||null,country_code:e.countryCode,primary_spot_id:e.primarySpotId,chat_link:s(e.chatLink),content:s(e.content),logo_url:e.logoUrl,fee_use:e.feeUse,fee_type:e.feeUse?e.feeType:null,fee_text:e.feeUse?s(e.feeText):null,is_active:e.isActive}).select("id").single();if(t)throw t;return await y(r.id,e.socialLinks),r.id})}async function W(e,r){return o(async()=>{var n;const{error:t}=await i.from("crew").update({name:r.name.trim(),activity_area:((n=r.activityArea)==null?void 0:n.trim())||null,country_code:r.countryCode,primary_spot_id:r.primarySpotId,chat_link:s(r.chatLink),content:s(r.content),logo_url:r.logoUrl,fee_use:r.feeUse,fee_type:r.feeUse?r.feeType:null,fee_text:r.feeUse?s(r.feeText):null,is_active:r.isActive}).eq("id",e);if(t)throw t;await y(e,r.socialLinks)})}async function D(e,r){return o(async()=>{const{error:t}=await i.from("crew").update({is_active:r}).eq("id",e);if(t)throw t})}function h(e){return Array.isArray(e)?e[0]??null:e}function L(e){return Array.isArray(e)?e[0]??null:e}async function O(e){return o(async()=>{const{data:r,error:t}=await i.from("crew_member").select(`
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
      `).eq("crew_id",e).order("created_at",{ascending:!1});if(t)throw t;return(r??[]).map(n=>{const a=h(n.profile);return{id:n.id,crewId:n.crew_id,userId:n.user_id,role:n.role,yearlyFeePaid:n.yearly_fee_paid??!1,createdAt:n.created_at,nickname:(a==null?void 0:a.nickname)??null,fullName:(a==null?void 0:a.full_name)??null,provider:(a==null?void 0:a.provider)??"unknown"}})})}async function B(e){return o(async()=>{const{data:r,error:t}=await i.rpc("get_my_crew_member_crew_ids");if(!t)return(r??[]).map(c=>typeof c=="string"?c:c.crew_id);const{data:n,error:a}=await i.from("crew_member").select("crew_id").eq("user_id",e);if(a)throw a;return(n??[]).map(c=>c.crew_id)})}async function F(e){return o(async()=>{const{data:r,error:t}=await i.from("crew_member").select("crew_id,yearly_fee_paid").eq("user_id",e);if(t)throw t;return(r??[]).map(n=>({crewId:n.crew_id,yearlyFeePaid:n.yearly_fee_paid??!1}))})}async function N(e){return o(async()=>{const{data:r,error:t}=await i.from("crew_member").select("crew_id").eq("user_id",e).eq("role","leader");if(t)throw t;return(r??[]).map(n=>n.crew_id)})}async function z(e){return o(async()=>{const{data:r,error:t}=await i.rpc("get_crew_member_count",{p_crew_id:e});if(t)throw t;return Number(r??0)})}async function G(e){return o(async()=>{const{data:r,error:t}=await i.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",e);if(t)throw t;return(r??[]).reduce((n,a)=>{const c=n[a.user_id]??{attendCount:0,lastAttendAt:null},_=L(a.meetup),l=(_==null?void 0:_.meetup_at)??null;return c.attendCount+=1,l&&(!c.lastAttendAt||new Date(l).getTime()>new Date(c.lastAttendAt).getTime())&&(c.lastAttendAt=l),n[a.user_id]=c,n},{})})}async function Y(e,r,t="member"){return o(async()=>{const{error:n}=await i.from("crew_member").upsert({crew_id:e,user_id:r,role:t},{onConflict:"crew_id,user_id"});if(n)throw n})}async function j(e,r){return o(async()=>{const{error:t}=await i.rpc("revoke_crew_member",{p_crew_id:e,p_user_id:r});if(!t)return;if(t.code!=="PGRST202")throw t;const{error:n}=await i.from("crew_member").delete().eq("crew_id",e).eq("user_id",r);if(n)throw n})}async function H(e,r){return o(async()=>{const{error:t}=await i.rpc("update_crew_member_yearly_fee_paid",{p_crew_member_id:e,p_yearly_fee_paid:r});if(!t)return;if(t.code!=="PGRST202")throw t;const{error:n}=await i.from("crew_member").update({yearly_fee_paid:r}).eq("id",e);if(n)throw n})}export{w as C,F as a,P as b,B as c,z as d,O as e,U as f,N as g,x as h,Y as i,G as j,H as k,C as l,M as m,R as n,W as o,j as r,D as u};
