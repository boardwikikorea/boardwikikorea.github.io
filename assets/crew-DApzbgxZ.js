import{w as c,s as o}from"./index-Dp5rKNGC.js";import{c as u}from"./clientCache-35gzWylM.js";import{b as A}from"./imageBucket-D0Wt4Y9e.js";const k=["instagram","youtube","facebook","homepage","x","tiktok","etc"],v=["yearly","monthly"];function s(e){if(!e)return 0;const t=new Date(e).getTime();return Number.isFinite(t)?t:0}function m(e){return Array.isArray(e)?e[0]??null:e}function y(e){return k.includes(e)}function T(e){return v.includes(e)}function l(e){const t=(e==null?void 0:e.trim())??"";return t.length>0?t:null}function E(e){return e.map(t=>({type:y(t.type)?t.type:"etc",url:t.url.trim()})).filter(t=>t.url.length>0)}function S(e){return[...e??[]].sort((t,r)=>{const i=(t.sort_order??0)-(r.sort_order??0);return i!==0?i:s(t.created_at)-s(r.created_at)}).map((t,r)=>({id:t.id,type:y(t.type)?t.type:"etc",url:t.url,sortOrder:t.sort_order??r}))}function d(e){const t=m(e.primary_spot),r=m((t==null?void 0:t.location)??null);return{id:e.id,name:e.name,activityArea:e.activity_area??null,countryCode:e.country_code??null,primarySpotId:e.primary_spot_id??null,primarySpotName:(r==null?void 0:r.name)??null,primarySpotAddress:[r==null?void 0:r.address,r==null?void 0:r.address_detail].filter(Boolean).join(" ")||null,primarySpotGoogleMapUrl:(r==null?void 0:r.google_map_url)??null,chatLink:e.chat_link??null,socialLinks:S(e.social_links),content:e.content??null,logoUrl:e.logo_url?A(e.logo_url):null,feeUse:e.fee_use??!1,feeType:e.fee_type&&T(e.fee_type)?e.fee_type:null,feeText:e.fee_text??null,isActive:e.is_active??!0,createdAt:e.created_at??null,updatedAt:e.updated_at??null}}const L=`
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
`,x=`
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
`,U=`
  ${x},
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
`,p=`
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
`,I=`
  id,
  name,
  activity_area,
  logo_url,
  fee_use,
  fee_type,
  is_active,
  created_at,
  updated_at
`;async function w(e,t){const r=E(t),{error:i}=await o.from("crew_social_link").delete().eq("crew_id",e);if(i)throw i;if(r.length===0)return;const{error:_}=await o.from("crew_social_link").insert(r.map((a,n)=>({crew_id:e,type:a.type,url:a.url,sort_order:n})));if(_)throw _}async function R(){return u("crew:active:list",6e4,()=>c(async()=>{const{data:e,error:t}=await o.from("crew").select(p).eq("is_active",!0);if(t)throw t;return(e??[]).map(d).sort((r,i)=>{const _=s(i.updatedAt??i.createdAt),a=s(r.updatedAt??r.createdAt),n=_-a;return n!==0?n:r.name.localeCompare(i.name)})}))}async function h(e=3){return u(`crew:active:list:summary:${e}`,6e4,()=>c(async()=>{const{data:t,error:r,count:i}=await o.from("crew").select(p,{count:"exact"}).eq("is_active",!0).limit(e);if(r)throw r;return{items:(t??[]).map(d).sort((a,n)=>{const C=s(n.updatedAt??n.createdAt),g=s(a.updatedAt??a.createdAt),f=C-g;return f!==0?f:a.name.localeCompare(n.name)}),count:i??(t==null?void 0:t.length)??0}}))}async function B(){return c(async()=>{const{data:e,error:t}=await o.from("crew").select(I);if(t)throw t;return(e??[]).map(d).sort((r,i)=>{const _=s(i.updatedAt??i.createdAt),a=s(r.updatedAt??r.createdAt),n=_-a;return n!==0?n:r.name.localeCompare(i.name)})})}async function D(e){return c(async()=>{const{data:t,error:r}=await o.from("crew").select(L).eq("id",e).maybeSingle();if(r)throw r;return t?d(t):null})}async function O(e){return u(`crew:active:id:${e}`,6e4,()=>c(async()=>{const{data:t,error:r}=await o.from("crew").select(U).eq("id",e).eq("is_active",!0).maybeSingle();if(r)throw r;return t?d(t):null}))}async function b(e){return c(async()=>{var i;const{data:t,error:r}=await o.from("crew").insert({name:e.name.trim(),activity_area:((i=e.activityArea)==null?void 0:i.trim())||null,country_code:e.countryCode,primary_spot_id:e.primarySpotId,chat_link:l(e.chatLink),content:l(e.content),logo_url:e.logoUrl,fee_use:e.feeUse,fee_type:e.feeUse?e.feeType:null,fee_text:e.feeUse?l(e.feeText):null,is_active:e.isActive}).select("id").single();if(r)throw r;return await w(t.id,e.socialLinks),t.id})}async function F(e,t){return c(async()=>{var i;const{error:r}=await o.from("crew").update({name:t.name.trim(),activity_area:((i=t.activityArea)==null?void 0:i.trim())||null,country_code:t.countryCode,primary_spot_id:t.primarySpotId,chat_link:l(t.chatLink),content:l(t.content),logo_url:t.logoUrl,fee_use:t.feeUse,fee_type:t.feeUse?t.feeType:null,fee_text:t.feeUse?l(t.feeText):null,is_active:t.isActive}).eq("id",e);if(r)throw r;await w(e,t.socialLinks)})}async function N(e,t){return c(async()=>{const{error:r}=await o.from("crew").update({is_active:t}).eq("id",e);if(r)throw r})}export{k as C,R as a,O as b,B as c,v as d,D as e,h as f,b as g,F as h,N as u};
