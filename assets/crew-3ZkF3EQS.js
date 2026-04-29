import{w as c,s as o}from"./index-BOYeQM9X.js";import{t as k}from"./imageBucket-BkpcUuff.js";const A=["instagram","youtube","facebook","homepage","x","tiktok","etc"];function l(t){if(!t)return 0;const e=new Date(t).getTime();return Number.isFinite(e)?e:0}function _(t){return Array.isArray(t)?t[0]??null:t}function m(t){return A.includes(t)}function v(t){return t.map(e=>({type:m(e.type)?e.type:"etc",url:e.url.trim()})).filter(e=>e.url.length>0)}function g(t){return[...t??[]].sort((e,r)=>{const i=(e.sort_order??0)-(r.sort_order??0);return i!==0?i:l(e.created_at)-l(r.created_at)}).map((e,r)=>({id:e.id,type:m(e.type)?e.type:"etc",url:e.url,sortOrder:e.sort_order??r}))}function d(t){const e=_(t.primary_spot),r=_((e==null?void 0:e.location)??null);return{id:t.id,name:t.name,activityArea:t.activity_area??null,countryCode:t.country_code??null,primarySpotId:t.primary_spot_id??null,primarySpotName:(r==null?void 0:r.name)??null,primarySpotAddress:[r==null?void 0:r.address,r==null?void 0:r.address_detail].filter(Boolean).join(" ")||null,chatLink:t.chat_link??null,socialLinks:g(t.social_links),content:t.content??null,logoUrl:t.logo_url?k(t.logo_url):null,isActive:t.is_active??!0,createdAt:t.created_at??null,updatedAt:t.updated_at??null}}const y=`
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
`,f=`
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
  ${f},
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
`;async function w(t,e){const r=v(e),{error:i}=await o.from("crew_social_link").delete().eq("crew_id",t);if(i)throw i;if(r.length===0)return;const{error:n}=await o.from("crew_social_link").insert(r.map((a,s)=>({crew_id:t,type:a.type,url:a.url,sort_order:s})));if(n)throw n}async function L(){return c(async()=>{const{data:t,error:e}=await o.from("crew").select(y);if(e)throw e;return(t??[]).map(d).sort((r,i)=>{const n=l(i.updatedAt??i.createdAt),a=l(r.updatedAt??r.createdAt),s=n-a;return s!==0?s:r.name.localeCompare(i.name)})})}async function h(t={}){return c(async()=>{const e=t.includePrimarySpot?p:f,{data:r,error:i}=await o.from("crew").select(e).eq("is_active",!0);if(i)throw i;return(r??[]).map(d).sort((n,a)=>{const s=l(a.updatedAt??a.createdAt),C=l(n.updatedAt??n.createdAt),u=s-C;return u!==0?u:n.name.localeCompare(a.name)})})}async function I(t){return c(async()=>{const{data:e,error:r}=await o.from("crew").select(y).eq("id",t).maybeSingle();if(r)throw r;return e?d(e):null})}async function T(t){return c(async()=>{const{data:e,error:r}=await o.from("crew").select(p).eq("id",t).eq("is_active",!0).maybeSingle();if(r)throw r;return e?d(e):null})}async function q(t){return c(async()=>{var i,n,a;const{data:e,error:r}=await o.from("crew").insert({name:t.name.trim(),activity_area:((i=t.activityArea)==null?void 0:i.trim())||null,country_code:t.countryCode,primary_spot_id:t.primarySpotId,chat_link:((n=t.chatLink)==null?void 0:n.trim())||null,content:((a=t.content)==null?void 0:a.trim())||null,logo_url:t.logoUrl,is_active:t.isActive}).select("id").single();if(r)throw r;return await w(e.id,t.socialLinks),e.id})}async function B(t,e){return c(async()=>{var i,n,a;const{error:r}=await o.from("crew").update({name:e.name.trim(),activity_area:((i=e.activityArea)==null?void 0:i.trim())||null,country_code:e.countryCode,primary_spot_id:e.primarySpotId,chat_link:((n=e.chatLink)==null?void 0:n.trim())||null,content:((a=e.content)==null?void 0:a.trim())||null,logo_url:e.logoUrl,is_active:e.isActive}).eq("id",t);if(r)throw r;await w(t,e.socialLinks)})}async function P(t,e){return c(async()=>{const{error:r}=await o.from("crew").update({is_active:e}).eq("id",t);if(r)throw r})}export{A as C,T as a,L as b,I as c,q as d,B as e,h as f,P as u};
