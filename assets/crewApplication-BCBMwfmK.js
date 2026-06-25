import{w as t,d as n}from"./index-B65caQFI.js";function p(e){return Array.isArray(e)?e[0]??null:e}function c(e){const a=p(e.profile);return{id:e.id,crewId:e.crew_id,userId:e.user_id,status:e.status,message:e.message,reviewedBy:e.reviewed_by,reviewedAt:e.reviewed_at,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(a==null?void 0:a.nickname)??null,fullName:(a==null?void 0:a.full_name)??null,provider:(a==null?void 0:a.provider)??"unknown"}}const s=`
  id,
  crew_id,
  user_id,
  status,
  message,
  reviewed_by,
  reviewed_at,
  created_at,
  updated_at,
  profile:profile!crew_application_user_id_fkey (
    nickname,
    full_name,
    provider
  )
`;async function o(e){return t(async()=>{const{data:a,error:r}=await n.from("crew_application").select(s).eq("crew_id",e).order("created_at",{ascending:!1});if(r)throw r;return(a??[]).map(c)})}async function u(e){return t(async()=>{const{data:a,error:r}=await n.from("crew_application").select(s).eq("user_id",e).order("created_at",{ascending:!1});if(r)throw r;return(a??[]).map(c)})}async function _(e,a,r){return t(async()=>{const{error:i}=await n.from("crew_application").insert({crew_id:e,user_id:a,status:"pending",message:(r==null?void 0:r.trim())||null});if(i)throw i})}async function l(e,a){return t(async()=>{const{error:r}=await n.from("crew_application").delete().eq("id",e).eq("user_id",a).eq("status","pending");if(r)throw r})}async function w(e){return t(async()=>{const{error:a}=await n.rpc("approve_crew_application",{p_application_id:e});if(a)throw a})}async function f(e){return t(async()=>{const{error:a}=await n.rpc("reject_crew_application",{p_application_id:e});if(a)throw a})}export{l as a,w as b,_ as c,o as d,u as f,f as r};
