import{w as i,s as o}from"./index-CQy1EWU6.js";import{t as _}from"./imageBucket-BkpcUuff.js";function s(t){if(!t)return 0;const r=new Date(t).getTime();return Number.isFinite(r)?r:0}function m(t){return Array.isArray(t)?t[0]??null:t}function u(t){const r=m(t.primary_spot),e=m((r==null?void 0:r.location)??null);return{id:t.id,name:t.name,activityArea:t.activity_area??null,countryCode:t.country_code??null,primarySpotId:t.primary_spot_id??null,primarySpotName:(e==null?void 0:e.name)??null,primarySpotAddress:[e==null?void 0:e.address,e==null?void 0:e.address_detail].filter(Boolean).join(" ")||null,content:t.content??null,logoUrl:t.logo_url?_(t.logo_url):null,isActive:t.is_active??!0,createdAt:t.created_at??null,updatedAt:t.updated_at??null}}const d=`
  id,
  name,
  activity_area,
  country_code,
  primary_spot_id,
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
  )
`;async function p(){return i(async()=>{const{data:t,error:r}=await o.from("crew").select(d);if(r)throw r;return(t??[]).map(u).sort((e,n)=>{const a=s(n.updatedAt??n.createdAt),l=s(e.updatedAt??e.createdAt),c=a-l;return c!==0?c:e.name.localeCompare(n.name)})})}async function w(){return i(async()=>{const{data:t,error:r}=await o.from("crew").select(d).eq("is_active",!0);if(r)throw r;return(t??[]).map(u).sort((e,n)=>{const a=s(n.updatedAt??n.createdAt),l=s(e.updatedAt??e.createdAt),c=a-l;return c!==0?c:e.name.localeCompare(n.name)})})}async function A(t){return i(async()=>{const{data:r,error:e}=await o.from("crew").select(d).eq("id",t).maybeSingle();if(e)throw e;return r?u(r):null})}async function v(t){return i(async()=>{const{data:r,error:e}=await o.from("crew").select(d).eq("id",t).eq("is_active",!0).maybeSingle();if(e)throw e;return r?u(r):null})}async function C(t){return i(async()=>{var n,a;const{data:r,error:e}=await o.from("crew").insert({name:t.name.trim(),activity_area:((n=t.activityArea)==null?void 0:n.trim())||null,country_code:t.countryCode,primary_spot_id:t.primarySpotId,content:((a=t.content)==null?void 0:a.trim())||null,logo_url:t.logoUrl,is_active:t.isActive}).select("id").single();if(e)throw e;return r.id})}async function g(t,r){return i(async()=>{var n,a;const{error:e}=await o.from("crew").update({name:r.name.trim(),activity_area:((n=r.activityArea)==null?void 0:n.trim())||null,country_code:r.countryCode,primary_spot_id:r.primarySpotId,content:((a=r.content)==null?void 0:a.trim())||null,logo_url:r.logoUrl,is_active:r.isActive}).eq("id",t);if(e)throw e})}async function q(t,r){return i(async()=>{const{error:e}=await o.from("crew").update({is_active:r}).eq("id",t);if(e)throw e})}export{v as a,p as b,A as c,C as d,g as e,w as f,q as u};
