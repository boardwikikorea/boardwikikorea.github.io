import{w as l,s as i}from"./index-LjS2ZyhT.js";import{a as d,g as _}from"./imageBucket-aR76qrBV.js";function p(r){return Array.isArray(r)?r[0]??null:r}function m(r){if(!r)return 0;const t=new Date(r).getTime();return Number.isFinite(t)?t:0}function c(r){const t=p(r.location);return{id:r.id,name:(t==null?void 0:t.name)??r.id,address:(t==null?void 0:t.address)??null,addressDetail:(t==null?void 0:t.address_detail)??null,googleMapUrl:(t==null?void 0:t.google_map_url)??null,description:(t==null?void 0:t.description)??null,thumbnailUrl:t!=null&&t.thumbnail_url?d(t.thumbnail_url):null,status:(t==null?void 0:t.status)??null,type:(t==null?void 0:t.type)??null,lat:(t==null?void 0:t.lat)??null,lon:(t==null?void 0:t.lon)??null,createdAt:(t==null?void 0:t.created_at)??null,updatedAt:(t==null?void 0:t.updated_at)??null,floor:r.floor??null,light:r.light??null,parking:r.parking??null,toilet:r.toilet??null,roof:r.roof??!1}}function f(r){const t=(r??"").trim();if(!t)return null;try{const e=new URL(t),o="/storage/v1/object/public/",s=e.pathname.indexOf(o);if(s>=0)return e.pathname.slice(s+o.length).split("/").filter(Boolean).slice(1).join("/")}catch{}const a=t.replace(/^\/+/,""),n=`${_()}/`;return a.startsWith(n)?a.slice(n.length):a}function y(r,t){return{id:r.id,spotId:r.related_id,imagePath:r.image_url,thumbnailPath:r.thumbnail_url,imageLink:d(r.image_url),thumbnailLink:d(r.thumbnail_url),isPrimary:f(r.thumbnail_url)===f(t)}}const g=`
  id,
  floor,
  light,
  parking,
  toilet,
  roof,
  location:location!spot_info_id_fkey (
    id,
    name,
    address,
    address_detail,
    google_map_url,
    description,
    thumbnail_url,
    status,
    type,
    lat,
    lon,
    created_at,
    updated_at
  )
`;async function S(){return l(async()=>{const{data:r,error:t}=await i.from("spot_info").select(g);if(t)throw t;return(r??[]).map(c).sort((n,e)=>{const o=m(e.updatedAt??e.createdAt),s=m(n.updatedAt??n.createdAt),u=o-s;return u!==0?u:n.name.localeCompare(e.name)})})}async function k(r){return l(async()=>{const{data:t,error:a}=await i.from("spot_info").select(g).eq("id",r).maybeSingle();if(a)throw a;return t?c(t):null})}async function q(r){return l(async()=>{var e;const{data:t,error:a}=await i.from("location").insert({name:r.name.trim(),address:r.address.trim(),address_detail:r.addressDetail.trim(),google_map_url:((e=r.googleMapUrl)==null?void 0:e.trim())||null,description:r.description.trim(),thumbnail_url:r.thumbnailUrl,status:r.status,type:"spot",lat:r.lat,lon:r.lon}).select("id").single();if(a)throw a;const{error:n}=await i.from("spot_info").upsert({id:t.id,floor:r.floor,light:r.light,parking:r.parking,toilet:r.toilet,roof:r.roof},{onConflict:"id"});if(n)throw n;return t.id})}async function E(r,t){return l(async()=>{var e;const{error:a}=await i.from("location").update({name:t.name.trim(),address:t.address.trim(),address_detail:t.addressDetail.trim(),google_map_url:((e=t.googleMapUrl)==null?void 0:e.trim())||null,description:t.description.trim(),thumbnail_url:t.thumbnailUrl,status:t.status,type:"spot",lat:t.lat,lon:t.lon}).eq("id",r);if(a)throw a;const{error:n}=await i.from("spot_info").update({floor:t.floor,light:t.light,parking:t.parking,toilet:t.toilet,roof:t.roof}).eq("id",r);if(n)throw n})}async function P(r,t){return l(async()=>{const{data:a,error:n}=await i.from("location").update({status:t}).eq("id",r).select("id,status");if(n)throw n;const e=(a??[])[0]??null;if(!e)throw new Error("Spot status was not updated. Check location row access or RLS policy.");return e.status})}async function A(r){return l(async()=>{const{data:t,error:a}=await i.from("location").select("id,thumbnail_url").eq("id",r).maybeSingle();if(a)throw a;const{data:n,error:e}=await i.from("image").select("id,related_id,image_url,thumbnail_url").eq("related_type","location").eq("related_id",r).order("created_at",{ascending:!1}).order("id",{ascending:!1});if(e)throw e;return(n??[]).map(o=>y(o,(t==null?void 0:t.thumbnail_url)??null))})}async function U(r,t){return l(async()=>{if(!t){const{error:o}=await i.from("location").update({thumbnail_url:null}).eq("id",r);if(o)throw o;return}const{data:a,error:n}=await i.from("image").select("id,related_id,thumbnail_url").eq("id",t).eq("related_type","location").eq("related_id",r).single();if(n)throw n;const{error:e}=await i.from("location").update({thumbnail_url:a.thumbnail_url}).eq("id",r);if(e)throw e})}async function L(r){return l(async()=>{const{error:t}=await i.from("image").delete().eq("id",r);if(t)throw t})}export{k as a,A as b,q as c,L as d,E as e,S as f,U as s,P as u};
