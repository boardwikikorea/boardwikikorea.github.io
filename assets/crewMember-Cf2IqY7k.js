import{w as n,s as c}from"./index-CQy1EWU6.js";function u(e){return Array.isArray(e)?e[0]??null:e}function s(e){const r=u(e.profile);return{id:e.id,crewId:e.crew_id,userId:e.user_id,status:e.status,message:e.message,reviewedBy:e.reviewed_by,reviewedAt:e.reviewed_at,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(r==null?void 0:r.nickname)??null,fullName:(r==null?void 0:r.full_name)??null,provider:(r==null?void 0:r.provider)??"unknown"}}const d=`
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
`;async function w(e){return n(async()=>{const{data:r,error:a}=await c.from("crew_application").select(d).eq("crew_id",e).order("created_at",{ascending:!1});if(a)throw a;return(r??[]).map(s)})}async function p(e){return n(async()=>{const{data:r,error:a}=await c.from("crew_application").select(d).eq("user_id",e).order("created_at",{ascending:!1});if(a)throw a;return(r??[]).map(s)})}async function m(e,r,a){return n(async()=>{const{error:t}=await c.from("crew_application").insert({crew_id:e,user_id:r,status:"pending",message:(a==null?void 0:a.trim())||null});if(t)throw t})}async function l(e){return n(async()=>{const{error:r}=await c.rpc("approve_crew_application",{p_application_id:e});if(r)throw r})}async function f(e){return n(async()=>{const{error:r}=await c.rpc("reject_crew_application",{p_application_id:e});if(r)throw r})}function o(e){return Array.isArray(e)?e[0]??null:e}async function y(e){return n(async()=>{const{data:r,error:a}=await c.from("crew_member").select(`
        id,
        crew_id,
        user_id,
        role,
        created_at,
        profile:profile!crew_member_user_id_fkey (
          nickname,
          full_name,
          provider
        )
      `).eq("crew_id",e).order("created_at",{ascending:!1});if(a)throw a;return(r??[]).map(t=>{const i=o(t.profile);return{id:t.id,crewId:t.crew_id,userId:t.user_id,role:t.role,createdAt:t.created_at,nickname:(i==null?void 0:i.nickname)??null,fullName:(i==null?void 0:i.full_name)??null,provider:(i==null?void 0:i.provider)??"unknown"}})})}async function b(e){return n(async()=>{const{data:r,error:a}=await c.from("crew_member").select("crew_id").eq("user_id",e);if(a)throw a;return(r??[]).map(t=>t.crew_id)})}async function h(e){return n(async()=>{const{data:r,error:a}=await c.rpc("get_crew_member_count",{p_crew_id:e});if(a)throw a;return Number(r??0)})}async function A(e,r,a="member"){return n(async()=>{const{error:t}=await c.from("crew_member").upsert({crew_id:e,user_id:r,role:a},{onConflict:"crew_id,user_id"});if(t)throw t})}async function v(e,r){return n(async()=>{const{error:a}=await c.from("crew_member").delete().eq("crew_id",e).eq("user_id",r);if(a)throw a})}export{p as a,h as b,m as c,y as d,w as e,b as f,A as g,l as h,f as i,v as r};
