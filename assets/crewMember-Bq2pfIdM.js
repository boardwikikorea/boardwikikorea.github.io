import{w as i,s as c}from"./index-Cp0pT7o-.js";function w(e){return Array.isArray(e)?e[0]??null:e}function o(e){const r=w(e.profile);return{id:e.id,crewId:e.crew_id,userId:e.user_id,status:e.status,message:e.message,reviewedBy:e.reviewed_by,reviewedAt:e.reviewed_at,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(r==null?void 0:r.nickname)??null,fullName:(r==null?void 0:r.full_name)??null,provider:(r==null?void 0:r.provider)??"unknown"}}const _=`
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
`;async function f(e){return i(async()=>{const{data:r,error:t}=await c.from("crew_application").select(_).eq("crew_id",e).order("created_at",{ascending:!1});if(t)throw t;return(r??[]).map(o)})}async function y(e){return i(async()=>{const{data:r,error:t}=await c.from("crew_application").select(_).eq("user_id",e).order("created_at",{ascending:!1});if(t)throw t;return(r??[]).map(o)})}async function A(e,r,t){return i(async()=>{const{error:n}=await c.from("crew_application").insert({crew_id:e,user_id:r,status:"pending",message:(t==null?void 0:t.trim())||null});if(n)throw n})}async function h(e,r){return i(async()=>{const{error:t}=await c.from("crew_application").delete().eq("id",e).eq("user_id",r).eq("status","pending");if(t)throw t})}async function C(e){return i(async()=>{const{error:r}=await c.rpc("approve_crew_application",{p_application_id:e});if(r)throw r})}async function b(e){return i(async()=>{const{error:r}=await c.rpc("reject_crew_application",{p_application_id:e});if(r)throw r})}function p(e){return Array.isArray(e)?e[0]??null:e}function m(e){return Array.isArray(e)?e[0]??null:e}async function k(e){return i(async()=>{const{data:r,error:t}=await c.from("crew_member").select(`
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
      `).eq("crew_id",e).order("created_at",{ascending:!1});if(t)throw t;return(r??[]).map(n=>{const a=p(n.profile);return{id:n.id,crewId:n.crew_id,userId:n.user_id,role:n.role,createdAt:n.created_at,nickname:(a==null?void 0:a.nickname)??null,fullName:(a==null?void 0:a.full_name)??null,provider:(a==null?void 0:a.provider)??"unknown"}})})}async function q(e){return i(async()=>{const{data:r,error:t}=await c.rpc("get_my_crew_member_crew_ids");if(!t)return(r??[]).map(s=>typeof s=="string"?s:s.crew_id);const{data:n,error:a}=await c.from("crew_member").select("crew_id").eq("user_id",e);if(a)throw a;return(n??[]).map(s=>s.crew_id)})}async function v(e){return i(async()=>{const{data:r,error:t}=await c.from("crew_member").select("crew_id").eq("user_id",e).eq("role","leader");if(t)throw t;return(r??[]).map(n=>n.crew_id)})}async function g(e){return i(async()=>{const{data:r,error:t}=await c.rpc("get_crew_member_count",{p_crew_id:e});if(t)throw t;return Number(r??0)})}async function M(e){return i(async()=>{const{data:r,error:t}=await c.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",e);if(t)throw t;return(r??[]).reduce((n,a)=>{const s=n[a.user_id]??{attendCount:0,lastAttendAt:null},d=m(a.meetup),u=(d==null?void 0:d.meetup_at)??null;return s.attendCount+=1,u&&(!s.lastAttendAt||new Date(u).getTime()>new Date(s.lastAttendAt).getTime())&&(s.lastAttendAt=u),n[a.user_id]=s,n},{})})}async function I(e,r,t="member"){return i(async()=>{const{error:n}=await c.from("crew_member").upsert({crew_id:e,user_id:r,role:t},{onConflict:"crew_id,user_id"});if(n)throw n})}async function N(e,r){return i(async()=>{const{error:t}=await c.from("crew_member").delete().eq("crew_id",e).eq("user_id",r);if(t)throw t})}export{y as a,h as b,A as c,g as d,k as e,q as f,v as g,I as h,f as i,M as j,C as k,b as l,N as r};
