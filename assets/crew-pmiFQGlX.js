import{i as f,w as o,d as n,l as p}from"./index-XK4mjZVO.js";const C=["instagram","youtube","facebook","homepage","x","tiktok","etc"],w=["yearly","monthly"];function l(e){if(!e)return 0;const t=new Date(e).getTime();return Number.isFinite(t)?t:0}function u(e){return Array.isArray(e)?e[0]??null:e}function y(e){return C.includes(e)}function g(e){return w.includes(e)}function c(e){const t=(e==null?void 0:e.trim())??"";return t.length>0?t:null}function k(e){return e.map(t=>({type:y(t.type)?t.type:"etc",url:t.url.trim()})).filter(t=>t.url.length>0)}function A(e){return[...e??[]].sort((t,r)=>{const i=(t.sort_order??0)-(r.sort_order??0);return i!==0?i:l(t.created_at)-l(r.created_at)}).map((t,r)=>({id:t.id,type:y(t.type)?t.type:"etc",url:t.url,sortOrder:t.sort_order??r}))}function d(e){const t=u(e.primary_spot),r=u((t==null?void 0:t.location)??null);return{id:e.id,name:e.name,activityArea:e.activity_area??null,countryCode:e.country_code??null,primarySpotId:e.primary_spot_id??null,primarySpotName:(r==null?void 0:r.name)??null,primarySpotAddress:[r==null?void 0:r.address,r==null?void 0:r.address_detail].filter(Boolean).join(" ")||null,primarySpotGoogleMapUrl:(r==null?void 0:r.google_map_url)??null,chatLink:e.chat_link??null,socialLinks:A(e.social_links),content:e.content??null,logoUrl:e.logo_url?p(e.logo_url):null,feeUse:e.fee_use??!1,feeType:e.fee_type&&g(e.fee_type)?e.fee_type:null,feeText:e.fee_text??null,isActive:e.is_active??!0,createdAt:e.created_at??null,updatedAt:e.updated_at??null}}const T=`
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
`,E=`
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
`,v=`
  ${E},
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
`,L=`
  id,
  name,
  activity_area,
  logo_url,
  fee_use,
  fee_type,
  is_active,
  created_at,
  updated_at
`;async function m(e,t){const r=k(t),{error:i}=await n.from("crew_social_link").delete().eq("crew_id",e);if(i)throw i;if(r.length===0)return;const{error:s}=await n.from("crew_social_link").insert(r.map((_,a)=>({crew_id:e,type:_.type,url:_.url,sort_order:a})));if(s)throw s}async function x(){return f("crew:active:list",6e4,()=>o(async()=>{const{data:e,error:t}=await n.from("crew").select(S).eq("is_active",!0);if(t)throw t;return(e??[]).map(d).sort((r,i)=>{const s=l(i.updatedAt??i.createdAt),_=l(r.updatedAt??r.createdAt),a=s-_;return a!==0?a:r.name.localeCompare(i.name)})}))}async function I(){return o(async()=>{const{data:e,error:t}=await n.from("crew").select(L);if(t)throw t;return(e??[]).map(d).sort((r,i)=>{const s=l(i.updatedAt??i.createdAt),_=l(r.updatedAt??r.createdAt),a=s-_;return a!==0?a:r.name.localeCompare(i.name)})})}async function W(e){return o(async()=>{const{data:t,error:r}=await n.from("crew").select(T).eq("id",e).maybeSingle();if(r)throw r;return t?d(t):null})}async function q(e){return f(`crew:active:id:${e}`,6e4,()=>o(async()=>{const{data:t,error:r}=await n.from("crew").select(v).eq("id",e).eq("is_active",!0).maybeSingle();if(r)throw r;return t?d(t):null}))}async function P(e){return o(async()=>{var i;const{data:t,error:r}=await n.from("crew").insert({name:e.name.trim(),activity_area:((i=e.activityArea)==null?void 0:i.trim())||null,country_code:e.countryCode,primary_spot_id:e.primarySpotId,chat_link:c(e.chatLink),content:c(e.content),logo_url:e.logoUrl,fee_use:e.feeUse,fee_type:e.feeUse?e.feeType:null,fee_text:e.feeUse?c(e.feeText):null,is_active:e.isActive}).select("id").single();if(r)throw r;return await m(t.id,e.socialLinks),t.id})}async function R(e,t){return o(async()=>{var i;const{error:r}=await n.from("crew").update({name:t.name.trim(),activity_area:((i=t.activityArea)==null?void 0:i.trim())||null,country_code:t.countryCode,primary_spot_id:t.primarySpotId,chat_link:c(t.chatLink),content:c(t.content),logo_url:t.logoUrl,fee_use:t.feeUse,fee_type:t.feeUse?t.feeType:null,fee_text:t.feeUse?c(t.feeText):null,is_active:t.isActive}).eq("id",e);if(r)throw r;await m(e,t.socialLinks)})}async function B(e,t){return o(async()=>{const{error:r}=await n.from("crew").update({is_active:t}).eq("id",e);if(r)throw r})}export{C,q as a,I as b,W as c,P as d,R as e,x as f,w as g,B as u};
