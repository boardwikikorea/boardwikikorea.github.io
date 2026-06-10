import{w as i,d as u}from"./index-D2HPn0E5.js";function p(r){return Array.isArray(r)?r[0]??null:r}function y(r){return Array.isArray(r)?r[0]??null:r}async function b(r){return i(async()=>{const{data:n,error:t}=await u.from("crew_member").select(`
        id,
        crew_id,
        user_id,
        role,
        yearly_fee_paid,
        created_at,
        profile:profile!crew_member_user_id_fkey (
          nickname,
          full_name,
          provider
        )
      `).eq("crew_id",r).order("created_at",{ascending:!1});if(t)throw t;return(n??[]).map(e=>{const a=p(e.profile);return{id:e.id,crewId:e.crew_id,userId:e.user_id,role:e.role,yearlyFeePaid:e.yearly_fee_paid??!1,createdAt:e.created_at,nickname:(a==null?void 0:a.nickname)??null,fullName:(a==null?void 0:a.full_name)??null,provider:(a==null?void 0:a.provider)??"unknown"}})})}async function C(r){return i(async()=>{const{data:n,error:t}=await u.rpc("get_my_crew_member_crew_ids");if(!t)return(n??[]).map(d=>typeof d=="string"?d:d.crew_id);const{data:e,error:a}=await u.from("crew_member").select("crew_id").eq("user_id",r);if(a)throw a;return(e??[]).map(d=>d.crew_id)})}async function h(r){return i(async()=>{const{data:n,error:t}=await u.from("crew_member").select("crew_id,yearly_fee_paid").eq("user_id",r);if(t)throw t;return(n??[]).map(e=>({crewId:e.crew_id,yearlyFeePaid:e.yearly_fee_paid??!1}))})}async function k(r){return i(async()=>{const{data:n,error:t}=await u.from("crew_member").select("crew_id").eq("user_id",r).in("role",["leader","owner"]);if(t)throw t;return(n??[]).map(e=>e.crew_id)})}async function q(r){return i(async()=>{const{data:n,error:t}=await u.rpc("get_crew_member_count",{p_crew_id:r});if(t)throw t;return Number(n??0)})}async function g(r,n={}){return i(async()=>{let t=u.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",r);n.from&&(t=t.gte("meetup.meetup_at",n.from)),n.to&&(t=t.lt("meetup.meetup_at",n.to));const{data:e,error:a}=await t;if(a)throw a;return(e??[]).reduce((d,o)=>{const s=d[o.user_id]??{attendCount:0,lastAttendAt:null},_=y(o.meetup),c=(_==null?void 0:_.meetup_at)??null;return s.attendCount+=1,c&&(!s.lastAttendAt||new Date(c).getTime()>new Date(s.lastAttendAt).getTime())&&(s.lastAttendAt=c),d[o.user_id]=s,d},{})})}async function M(r,n={},t=10){return i(async()=>{let e=u.from("crew_meetup_attendance").select(`
        user_id,
        profile:profile!crew_meetup_attendance_user_id_fkey (
          nickname,
          full_name,
          provider
        ),
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          meetup_at
        )
      `).eq("attendance_status","attend");r&&(e=e.eq("meetup.crew_id",r)),n.from&&(e=e.gte("meetup.meetup_at",n.from)),n.to&&(e=e.lt("meetup.meetup_at",n.to));const{data:a,error:d}=await e;if(d)throw d;const o=(a??[]).reduce((_,c)=>{const m=p(c.profile),f=_[c.user_id]??{userId:c.user_id,attendCount:0,lastAttendAt:null,nickname:(m==null?void 0:m.nickname)??null,fullName:(m==null?void 0:m.full_name)??null},w=y(c.meetup),l=(w==null?void 0:w.meetup_at)??null;return f.attendCount+=1,l&&(!f.lastAttendAt||new Date(l).getTime()>new Date(f.lastAttendAt).getTime())&&(f.lastAttendAt=l),_[c.user_id]=f,_},{}),s=Object.values(o).sort((_,c)=>_.attendCount!==c.attendCount?c.attendCount-_.attendCount:(c.lastAttendAt??"").localeCompare(_.lastAttendAt??""));return typeof t=="number"?s.slice(0,t):s})}async function T(r,n,t="member"){return i(async()=>{const{error:e}=await u.from("crew_member").upsert({crew_id:r,user_id:n,role:t},{onConflict:"crew_id,user_id"});if(e)throw e})}async function v(r,n){return i(async()=>{const{error:t}=await u.rpc("revoke_crew_member",{p_crew_id:r,p_user_id:n});if(!t)return;if(t.code!=="PGRST202")throw t;const{error:e}=await u.from("crew_member").delete().eq("crew_id",r).eq("user_id",n);if(e)throw e})}async function D(r,n){return i(async()=>{const{error:t}=await u.rpc("update_crew_member_yearly_fee_paid",{p_crew_member_id:r,p_yearly_fee_paid:n});if(!t)return;if(t.code!=="PGRST202")throw t;const{error:e}=await u.from("crew_member").update({yearly_fee_paid:n}).eq("id",r);if(e)throw e})}export{M as a,b,C as c,q as d,k as e,h as f,T as g,g as h,v as r,D as u};
