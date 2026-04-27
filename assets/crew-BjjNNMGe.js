import{w as i,s as o}from"./index-CTjzlHIC.js";import{t as f}from"./imageBucket-BkpcUuff.js";function u(t){if(!t)return 0;const r=new Date(t).getTime();return Number.isFinite(r)?r:0}function m(t){return Array.isArray(t)?t[0]??null:t}function d(t){const r=m(t.primary_spot),e=m((r==null?void 0:r.location)??null);return{id:t.id,name:t.name,activityArea:t.activity_area??null,countryCode:t.country_code??null,primarySpotId:t.primary_spot_id??null,primarySpotName:(e==null?void 0:e.name)??null,primarySpotAddress:[e==null?void 0:e.address,e==null?void 0:e.address_detail].filter(Boolean).join(" ")||null,content:t.content??null,logoUrl:t.logo_url?f(t.logo_url):null,isActive:t.is_active??!0,createdAt:t.created_at??null,updatedAt:t.updated_at??null}}const l=`
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
`,p=`
  id,
  name,
  activity_area,
  country_code,
  content,
  logo_url,
  is_active,
  created_at,
  updated_at
`;async function v(){return i(async()=>{const{data:t,error:r}=await o.from("crew").select(l);if(r)throw r;return(t??[]).map(d).sort((e,n)=>{const a=u(n.updatedAt??n.createdAt),c=u(e.updatedAt??e.createdAt),s=a-c;return s!==0?s:e.name.localeCompare(n.name)})})}async function C(t={}){return i(async()=>{const r=t.includePrimarySpot?l:p,{data:e,error:n}=await o.from("crew").select(r).eq("is_active",!0);if(n)throw n;return(e??[]).map(d).sort((a,c)=>{const s=u(c.updatedAt??c.createdAt),y=u(a.updatedAt??a.createdAt),_=s-y;return _!==0?_:a.name.localeCompare(c.name)})})}async function g(t){return i(async()=>{const{data:r,error:e}=await o.from("crew").select(l).eq("id",t).maybeSingle();if(e)throw e;return r?d(r):null})}async function S(t){return i(async()=>{const{data:r,error:e}=await o.from("crew").select(l).eq("id",t).eq("is_active",!0).maybeSingle();if(e)throw e;return r?d(r):null})}async function I(t){return i(async()=>{var n,a;const{data:r,error:e}=await o.from("crew").insert({name:t.name.trim(),activity_area:((n=t.activityArea)==null?void 0:n.trim())||null,country_code:t.countryCode,primary_spot_id:t.primarySpotId,content:((a=t.content)==null?void 0:a.trim())||null,logo_url:t.logoUrl,is_active:t.isActive}).select("id").single();if(e)throw e;return r.id})}async function q(t,r){return i(async()=>{var n,a;const{error:e}=await o.from("crew").update({name:r.name.trim(),activity_area:((n=r.activityArea)==null?void 0:n.trim())||null,country_code:r.countryCode,primary_spot_id:r.primarySpotId,content:((a=r.content)==null?void 0:a.trim())||null,logo_url:r.logoUrl,is_active:r.isActive}).eq("id",t);if(e)throw e})}async function E(t,r){return i(async()=>{const{error:e}=await o.from("crew").update({is_active:r}).eq("id",t);if(e)throw e})}export{S as a,v as b,g as c,I as d,q as e,C as f,E as u};
