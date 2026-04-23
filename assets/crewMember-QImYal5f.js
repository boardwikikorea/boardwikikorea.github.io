import{w as c,s as i}from"./index-CQ_Nig6u.js";function w(e){return Array.isArray(e)?e[0]??null:e}function _(e){const r=w(e.profile);return{id:e.id,crewId:e.crew_id,userId:e.user_id,status:e.status,message:e.message,reviewedBy:e.reviewed_by,reviewedAt:e.reviewed_at,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(r==null?void 0:r.nickname)??null,fullName:(r==null?void 0:r.full_name)??null,provider:(r==null?void 0:r.provider)??"unknown"}}const o=`
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
`;async function f(e){return c(async()=>{const{data:r,error:t}=await i.from("crew_application").select(o).eq("crew_id",e).order("created_at",{ascending:!1});if(t)throw t;return(r??[]).map(_)})}async function y(e){return c(async()=>{const{data:r,error:t}=await i.from("crew_application").select(o).eq("user_id",e).order("created_at",{ascending:!1});if(t)throw t;return(r??[]).map(_)})}async function A(e,r,t){return c(async()=>{const{error:n}=await i.from("crew_application").insert({crew_id:e,user_id:r,status:"pending",message:(t==null?void 0:t.trim())||null});if(n)throw n})}async function h(e){return c(async()=>{const{error:r}=await i.rpc("approve_crew_application",{p_application_id:e});if(r)throw r})}async function b(e){return c(async()=>{const{error:r}=await i.rpc("reject_crew_application",{p_application_id:e});if(r)throw r})}function p(e){return Array.isArray(e)?e[0]??null:e}function m(e){return Array.isArray(e)?e[0]??null:e}async function C(e){return c(async()=>{const{data:r,error:t}=await i.from("crew_member").select(`
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
      `).eq("crew_id",e).order("created_at",{ascending:!1});if(t)throw t;return(r??[]).map(n=>{const a=p(n.profile);return{id:n.id,crewId:n.crew_id,userId:n.user_id,role:n.role,createdAt:n.created_at,nickname:(a==null?void 0:a.nickname)??null,fullName:(a==null?void 0:a.full_name)??null,provider:(a==null?void 0:a.provider)??"unknown"}})})}async function v(e){return c(async()=>{const{data:r,error:t}=await i.from("crew_member").select("crew_id").eq("user_id",e);if(t)throw t;return(r??[]).map(n=>n.crew_id)})}async function k(e){return c(async()=>{const{data:r,error:t}=await i.rpc("get_crew_member_count",{p_crew_id:e});if(t)throw t;return Number(r??0)})}async function g(e){return c(async()=>{const{data:r,error:t}=await i.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",e);if(t)throw t;return(r??[]).reduce((n,a)=>{const s=n[a.user_id]??{attendCount:0,lastAttendAt:null},u=m(a.meetup),d=(u==null?void 0:u.meetup_at)??null;return s.attendCount+=1,d&&(!s.lastAttendAt||new Date(d).getTime()>new Date(s.lastAttendAt).getTime())&&(s.lastAttendAt=d),n[a.user_id]=s,n},{})})}async function q(e,r,t="member"){return c(async()=>{const{error:n}=await i.from("crew_member").upsert({crew_id:e,user_id:r,role:t},{onConflict:"crew_id,user_id"});if(n)throw n})}async function M(e,r){return c(async()=>{const{error:t}=await i.from("crew_member").delete().eq("crew_id",e).eq("user_id",r);if(t)throw t})}export{y as a,k as b,A as c,C as d,f as e,v as f,q as g,g as h,h as i,b as j,M as r};
