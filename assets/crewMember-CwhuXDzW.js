import{w as i,d as _}from"./index-KNfjx_GS.js";function b(t){return Array.isArray(t)?t[0]??null:t}function A(t){return Array.isArray(t)?t[0]??null:t}async function h(t){return i(async()=>{const{data:r,error:e}=await _.from("crew_member").select(`
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
      `).eq("crew_id",t).order("created_at",{ascending:!1});if(e)throw e;return(r??[]).map(a=>{const n=b(a.profile);return{id:a.id,crewId:a.crew_id,userId:a.user_id,role:a.role,yearlyFeePaid:a.yearly_fee_paid??!1,createdAt:a.created_at,nickname:(n==null?void 0:n.nickname)??null,fullName:(n==null?void 0:n.full_name)??null,provider:(n==null?void 0:n.provider)??"unknown"}})})}async function k(t){return i(async()=>{const{data:r,error:e}=await _.rpc("get_my_crew_member_crew_ids");if(!e)return(r??[]).map(c=>typeof c=="string"?c:c.crew_id);const{data:a,error:n}=await _.from("crew_member").select("crew_id").eq("user_id",t);if(n)throw n;return(a??[]).map(c=>c.crew_id)})}async function q(t){return i(async()=>{const{data:r,error:e}=await _.from("crew_member").select("crew_id,yearly_fee_paid").eq("user_id",t);if(e)throw e;return(r??[]).map(a=>({crewId:a.crew_id,yearlyFeePaid:a.yearly_fee_paid??!1}))})}async function g(t){return i(async()=>{const{data:r,error:e}=await _.from("crew_member").select("crew_id").eq("user_id",t).in("role",["leader","owner"]);if(e)throw e;return(r??[]).map(a=>a.crew_id)})}async function M(t){return i(async()=>{const{data:r,error:e}=await _.rpc("get_crew_member_count",{p_crew_id:t});if(e)throw e;return Number(r??0)})}async function D(t,r={}){return i(async()=>{let e=_.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",t);r.from&&(e=e.gte("meetup.meetup_at",r.from)),r.to&&(e=e.lt("meetup.meetup_at",r.to));const{data:a,error:n}=await e;if(n)throw n;return(a??[]).reduce((c,f)=>{const s=c[f.user_id]??{attendCount:0,lastAttendAt:null},l=A(f.meetup),m=(l==null?void 0:l.meetup_at)??null;return s.attendCount+=1,m&&(!s.lastAttendAt||new Date(m).getTime()>new Date(s.lastAttendAt).getTime())&&(s.lastAttendAt=m),c[f.user_id]=s,c},{})})}async function T(t,r={},e=10){return i(async()=>{const{data:a,error:n}=await _.rpc("public_get_crew_attendance_leaderboard",{p_crew_id:t,p_from:r.from??null,p_to:r.to??null});if(!n){const d=(a??[]).map(u=>({userId:u.user_id,attendCount:Number(u.attend_count)||0,lastAttendAt:u.last_attend_at,nickname:u.nickname,fullName:u.full_name}));return typeof e=="number"?d.slice(0,e):d}let c=_.from("crew_meetup_attendance").select(`
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
      `).eq("attendance_status","attend");t&&(c=c.eq("meetup.crew_id",t)),r.from&&(c=c.gte("meetup.meetup_at",r.from)),r.to&&(c=c.lt("meetup.meetup_at",r.to));const{data:f,error:s}=await c;if(s)throw s;const l=(f??[]).reduce((d,u)=>{const o=b(u.profile),w=d[u.user_id]??{userId:u.user_id,attendCount:0,lastAttendAt:null,nickname:(o==null?void 0:o.nickname)??null,fullName:(o==null?void 0:o.full_name)??null},p=A(u.meetup),y=(p==null?void 0:p.meetup_at)??null;return w.attendCount+=1,y&&(!w.lastAttendAt||new Date(y).getTime()>new Date(w.lastAttendAt).getTime())&&(w.lastAttendAt=y),d[u.user_id]=w,d},{}),m=Object.values(l).sort((d,u)=>d.attendCount!==u.attendCount?u.attendCount-d.attendCount:(u.lastAttendAt??"").localeCompare(d.lastAttendAt??""));return typeof e=="number"?m.slice(0,e):m})}async function v(t,r,e="member"){return i(async()=>{const{error:a}=await _.from("crew_member").upsert({crew_id:t,user_id:r,role:e},{onConflict:"crew_id,user_id"});if(a)throw a})}async function N(t,r){return i(async()=>{const{error:e}=await _.rpc("revoke_crew_member",{p_crew_id:t,p_user_id:r});if(!e)return;if(e.code!=="PGRST202")throw e;const{error:a}=await _.from("crew_member").delete().eq("crew_id",t).eq("user_id",r);if(a)throw a})}async function P(t,r){return i(async()=>{const{error:e}=await _.rpc("update_crew_member_yearly_fee_paid",{p_crew_member_id:t,p_yearly_fee_paid:r});if(!e)return;if(e.code!=="PGRST202")throw e;const{error:a}=await _.from("crew_member").update({yearly_fee_paid:r}).eq("id",t);if(a)throw a})}export{T as a,h as b,k as c,M as d,g as e,q as f,v as g,D as h,N as r,P as u};
