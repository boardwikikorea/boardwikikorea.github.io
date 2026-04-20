import{w as s,s as o}from"./index-iN_xKbw6.js";import{t as d,g as p}from"./imageBucket-BkpcUuff.js";function y(r){return Array.isArray(r)?r[0]??null:r}function m(r){if(!r)return 0;const t=new Date(r).getTime();return Number.isFinite(t)?t:0}function f(r){const t=y(r.location);return{id:r.id,name:(t==null?void 0:t.name)??r.id,address:(t==null?void 0:t.address)??null,addressDetail:(t==null?void 0:t.address_detail)??null,description:(t==null?void 0:t.description)??null,thumbnailUrl:t!=null&&t.thumbnail_url?d(t.thumbnail_url):null,status:(t==null?void 0:t.status)??null,type:(t==null?void 0:t.type)??null,lat:(t==null?void 0:t.lat)??null,lon:(t==null?void 0:t.lon)??null,createdAt:(t==null?void 0:t.created_at)??null,updatedAt:(t==null?void 0:t.updated_at)??null,floor:r.floor??null,light:r.light??null,parking:r.parking??null,toilet:r.toilet??null,roof:r.roof??!1}}function c(r){const t=(r??"").trim();if(!t)return null;try{const a=new URL(t),i="/storage/v1/object/public/",l=a.pathname.indexOf(i);if(l>=0)return a.pathname.slice(l+i.length).split("/").filter(Boolean).slice(1).join("/")}catch{}const e=t.replace(/^\/+/,""),n=`${p()}/`;return e.startsWith(n)?e.slice(n.length):e}function g(r,t){return{id:r.id,spotId:r.related_id,imagePath:r.image_url,thumbnailPath:r.thumbnail_url,imageLink:d(r.image_url),thumbnailLink:d(r.thumbnail_url),isPrimary:c(r.thumbnail_url)===c(t)}}const _=`
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
    description,
    thumbnail_url,
    status,
    type,
    lat,
    lon,
    created_at,
    updated_at
  )
`;async function k(){return s(async()=>{const{data:r,error:t}=await o.from("spot_info").select(_);if(t)throw t;return(r??[]).map(f).sort((n,a)=>{const i=m(a.updatedAt??a.createdAt),l=m(n.updatedAt??n.createdAt),u=i-l;return u!==0?u:n.name.localeCompare(a.name)})})}async function q(r){return s(async()=>{const{data:t,error:e}=await o.from("spot_info").select(_).eq("id",r).maybeSingle();if(e)throw e;return t?f(t):null})}async function A(r){return s(async()=>{const{data:t,error:e}=await o.from("location").insert({name:r.name.trim(),address:r.address.trim(),address_detail:r.addressDetail.trim(),description:r.description.trim(),thumbnail_url:r.thumbnailUrl,status:r.status,type:"spot",lat:r.lat,lon:r.lon}).select("id").single();if(e)throw e;const{error:n}=await o.from("spot_info").upsert({id:t.id,floor:r.floor,light:r.light,parking:r.parking,toilet:r.toilet,roof:r.roof},{onConflict:"id"});if(n)throw n;return t.id})}async function P(r,t){return s(async()=>{const{error:e}=await o.from("location").update({name:t.name.trim(),address:t.address.trim(),address_detail:t.addressDetail.trim(),description:t.description.trim(),thumbnail_url:t.thumbnailUrl,status:t.status,type:"spot",lat:t.lat,lon:t.lon}).eq("id",r);if(e)throw e;const{error:n}=await o.from("spot_info").update({floor:t.floor,light:t.light,parking:t.parking,toilet:t.toilet,roof:t.roof}).eq("id",r);if(n)throw n})}async function E(r,t){return s(async()=>{const{data:e,error:n}=await o.from("location").update({status:t}).eq("id",r).select("id,status");if(n)throw n;const a=(e??[])[0]??null;if(!a)throw new Error("Spot status was not updated. Check location row access or RLS policy.");return a.status})}async function I(r){return s(async()=>{const{data:t,error:e}=await o.from("location").select("id,thumbnail_url").eq("id",r).maybeSingle();if(e)throw e;const{data:n,error:a}=await o.from("image").select("id,related_id,image_url,thumbnail_url").eq("related_type","location").eq("related_id",r).order("created_at",{ascending:!1}).order("id",{ascending:!1});if(a)throw a;return(n??[]).map(i=>g(i,(t==null?void 0:t.thumbnail_url)??null))})}async function L(r,t){return s(async()=>{if(!t){const{error:i}=await o.from("location").update({thumbnail_url:null}).eq("id",r);if(i)throw i;return}const{data:e,error:n}=await o.from("image").select("id,related_id,thumbnail_url").eq("id",t).eq("related_type","location").eq("related_id",r).single();if(n)throw n;const{error:a}=await o.from("location").update({thumbnail_url:e.thumbnail_url}).eq("id",r);if(a)throw a})}async function M(r){return s(async()=>{const{error:t}=await o.from("image").delete().eq("id",r);if(t)throw t})}function b(r){return Array.isArray(r)?r[0]??null:r}async function j(r){return s(async()=>{const{data:t,error:e}=await o.from("spot_member").select(`
        id,
        spot_id,
        user_id,
        role,
        created_at,
        profile:profile!spot_member_user_id_fkey (
          nickname,
          full_name,
          provider
        )
      `).eq("spot_id",r).order("created_at",{ascending:!1});if(e)throw e;return(t??[]).map(a=>{const i=b(a.profile);return{id:a.id,spotId:a.spot_id,userId:a.user_id,role:a.role,createdAt:a.created_at,nickname:(i==null?void 0:i.nickname)??null,fullName:(i==null?void 0:i.full_name)??null,provider:(i==null?void 0:i.provider)??"unknown"}})})}async function x(r){return s(async()=>{const{data:t,error:e}=await o.from("spot_member").select("spot_id").eq("user_id",r);if(e)throw e;return(t??[]).map(n=>n.spot_id)})}async function C(r,t){return s(async()=>{const{data:e,error:n}=await o.from("spot_member").select("id").eq("spot_id",r).eq("user_id",t).limit(1).maybeSingle();if(n)throw n;return!!e})}async function D(r,t,e="editor"){return s(async()=>{const{error:n}=await o.from("spot_member").upsert({spot_id:r,user_id:t,role:e},{onConflict:"spot_id,user_id"});if(n)throw n})}async function U(r,t){return s(async()=>{const{error:e}=await o.from("spot_member").delete().eq("spot_id",r).eq("user_id",t);if(e)throw e})}export{k as a,j as b,q as c,I as d,M as e,x as f,D as g,C as h,A as i,P as j,U as r,L as s,E as u};
