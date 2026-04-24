import{w as s,s as c}from"./index-DZSsd85T.js";function w(e){return Array.isArray(e)?e[0]??null:e}function _(e){const r=w(e.profile);return{id:e.id,crewId:e.crew_id,userId:e.user_id,status:e.status,message:e.message,reviewedBy:e.reviewed_by,reviewedAt:e.reviewed_at,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(r==null?void 0:r.nickname)??null,fullName:(r==null?void 0:r.full_name)??null,provider:(r==null?void 0:r.provider)??"unknown"}}const o=`
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
`;async function l(e){return s(async()=>{const{data:r,error:t}=await c.from("crew_application").select(o).eq("crew_id",e).order("created_at",{ascending:!1});if(t)throw t;return(r??[]).map(_)})}async function y(e){return s(async()=>{const{data:r,error:t}=await c.from("crew_application").select(o).eq("user_id",e).order("created_at",{ascending:!1});if(t)throw t;return(r??[]).map(_)})}async function A(e,r,t){return s(async()=>{const{error:n}=await c.from("crew_application").insert({crew_id:e,user_id:r,status:"pending",message:(t==null?void 0:t.trim())||null});if(n)throw n})}async function b(e){return s(async()=>{const{error:r}=await c.rpc("approve_crew_application",{p_application_id:e});if(r)throw r})}async function h(e){return s(async()=>{const{error:r}=await c.rpc("reject_crew_application",{p_application_id:e});if(r)throw r})}function p(e){return Array.isArray(e)?e[0]??null:e}function m(e){return Array.isArray(e)?e[0]??null:e}async function C(e){return s(async()=>{const{data:r,error:t}=await c.from("crew_member").select(`
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
      `).eq("crew_id",e).order("created_at",{ascending:!1});if(t)throw t;return(r??[]).map(n=>{const a=p(n.profile);return{id:n.id,crewId:n.crew_id,userId:n.user_id,role:n.role,createdAt:n.created_at,nickname:(a==null?void 0:a.nickname)??null,fullName:(a==null?void 0:a.full_name)??null,provider:(a==null?void 0:a.provider)??"unknown"}})})}async function v(e){return s(async()=>{const{data:r,error:t}=await c.rpc("get_my_crew_member_crew_ids");if(!t)return(r??[]).map(i=>typeof i=="string"?i:i.crew_id);const{data:n,error:a}=await c.from("crew_member").select("crew_id").eq("user_id",e);if(a)throw a;return(n??[]).map(i=>i.crew_id)})}async function k(e){return s(async()=>{const{data:r,error:t}=await c.rpc("get_crew_member_count",{p_crew_id:e});if(t)throw t;return Number(r??0)})}async function g(e){return s(async()=>{const{data:r,error:t}=await c.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",e);if(t)throw t;return(r??[]).reduce((n,a)=>{const i=n[a.user_id]??{attendCount:0,lastAttendAt:null},u=m(a.meetup),d=(u==null?void 0:u.meetup_at)??null;return i.attendCount+=1,d&&(!i.lastAttendAt||new Date(d).getTime()>new Date(i.lastAttendAt).getTime())&&(i.lastAttendAt=d),n[a.user_id]=i,n},{})})}async function q(e,r,t="member"){return s(async()=>{const{error:n}=await c.from("crew_member").upsert({crew_id:e,user_id:r,role:t},{onConflict:"crew_id,user_id"});if(n)throw n})}async function M(e,r){return s(async()=>{const{error:t}=await c.from("crew_member").delete().eq("crew_id",e).eq("user_id",r);if(t)throw t})}export{y as a,k as b,A as c,C as d,l as e,v as f,q as g,g as h,b as i,h as j,M as r};
