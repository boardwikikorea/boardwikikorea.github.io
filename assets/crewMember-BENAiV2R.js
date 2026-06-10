import{w as i,d as _}from"./index-Bpt69V_z.js";function A(e){return Array.isArray(e)?e[0]??null:e}function C(e){return Array.isArray(e)?e[0]??null:e}async function k(e){return i(async()=>{const{data:a,error:r}=await _.from("crew_member").select(`
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
      `).eq("crew_id",e).order("created_at",{ascending:!1});if(r)throw r;return(a??[]).map(t=>{const n=A(t.profile);return{id:t.id,crewId:t.crew_id,userId:t.user_id,role:t.role,yearlyFeePaid:t.yearly_fee_paid??!1,createdAt:t.created_at,nickname:(n==null?void 0:n.nickname)??null,fullName:(n==null?void 0:n.full_name)??null,provider:(n==null?void 0:n.provider)??"unknown"}})})}async function q(e){return i(async()=>{const{data:a,error:r}=await _.rpc("get_my_crew_member_crew_ids");if(!r)return(a??[]).map(d=>typeof d=="string"?d:d.crew_id);const{data:t,error:n}=await _.from("crew_member").select("crew_id").eq("user_id",e);if(n)throw n;return(t??[]).map(d=>d.crew_id)})}async function g(e){return i(async()=>{const{data:a,error:r}=await _.from("crew_member").select("crew_id,yearly_fee_paid").eq("user_id",e);if(r)throw r;return(a??[]).map(t=>({crewId:t.crew_id,yearlyFeePaid:t.yearly_fee_paid??!1}))})}async function M(e){return i(async()=>{const{data:a,error:r}=await _.from("crew_member").select("crew_id").eq("user_id",e).in("role",["leader","owner"]);if(r)throw r;return(a??[]).map(t=>t.crew_id)})}async function D(e){return i(async()=>{const{data:a,error:r}=await _.rpc("get_crew_member_count",{p_crew_id:e});if(r)throw r;return Number(a??0)})}async function I(e,a={}){return i(async()=>{const r=new Date().toISOString();let t=_.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          is_canceled,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",e).eq("meetup.is_canceled",!1).lte("meetup.meetup_at",r);a.from&&(t=t.gte("meetup.meetup_at",a.from)),a.to&&(t=t.lt("meetup.meetup_at",a.to));const{data:n,error:d}=await t;if(d)throw d;return(n??[]).reduce((c,f)=>{const m=c[f.user_id]??{attendCount:0,lastAttendAt:null},w=C(f.meetup),o=(w==null?void 0:w.meetup_at)??null;return m.attendCount+=1,o&&(!m.lastAttendAt||new Date(o).getTime()>new Date(m.lastAttendAt).getTime())&&(m.lastAttendAt=o),c[f.user_id]=m,c},{})})}async function S(e,a={},r=10){return i(async()=>{const t=new Date().toISOString(),{data:n,error:d}=await _.rpc("public_get_crew_attendance_leaderboard",{p_crew_id:e,p_from:a.from??null,p_to:a.to??null});if(!d){const s=(n??[]).map(u=>({userId:u.user_id,attendCount:Number(u.attend_count)||0,lastAttendAt:u.last_attend_at,nickname:u.nickname,fullName:u.full_name}));return typeof r=="number"?s.slice(0,r):s}let c=_.from("crew_meetup_attendance").select(`
        user_id,
        profile:profile!crew_meetup_attendance_user_id_fkey (
          nickname,
          full_name,
          provider
        ),
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          is_canceled,
          meetup_at
        )
      `).eq("attendance_status","attend");e&&(c=c.eq("meetup.crew_id",e)),c=c.eq("meetup.is_canceled",!1),c=c.lte("meetup.meetup_at",t),a.from&&(c=c.gte("meetup.meetup_at",a.from)),a.to&&(c=c.lt("meetup.meetup_at",a.to));const{data:f,error:m}=await c;if(m)throw m;const w=(f??[]).reduce((s,u)=>{const l=A(u.profile),p=s[u.user_id]??{userId:u.user_id,attendCount:0,lastAttendAt:null,nickname:(l==null?void 0:l.nickname)??null,fullName:(l==null?void 0:l.full_name)??null},y=C(u.meetup),b=(y==null?void 0:y.meetup_at)??null;return p.attendCount+=1,b&&(!p.lastAttendAt||new Date(b).getTime()>new Date(p.lastAttendAt).getTime())&&(p.lastAttendAt=b),s[u.user_id]=p,s},{}),o=Object.values(w).sort((s,u)=>s.attendCount!==u.attendCount?u.attendCount-s.attendCount:(u.lastAttendAt??"").localeCompare(s.lastAttendAt??""));return typeof r=="number"?o.slice(0,r):o})}async function T(e,a,r="member"){return i(async()=>{const{error:t}=await _.from("crew_member").upsert({crew_id:e,user_id:a,role:r},{onConflict:"crew_id,user_id"});if(t)throw t})}async function v(e,a){return i(async()=>{const{error:r}=await _.rpc("revoke_crew_member",{p_crew_id:e,p_user_id:a});if(!r)return;if(r.code!=="PGRST202")throw r;const{error:t}=await _.from("crew_member").delete().eq("crew_id",e).eq("user_id",a);if(t)throw t})}async function N(e,a){return i(async()=>{const{error:r}=await _.rpc("update_crew_member_yearly_fee_paid",{p_crew_member_id:e,p_yearly_fee_paid:a});if(!r)return;if(r.code!=="PGRST202")throw r;const{error:t}=await _.from("crew_member").update({yearly_fee_paid:a}).eq("id",e);if(t)throw t})}export{S as a,k as b,q as c,D as d,M as e,g as f,T as g,I as h,v as r,N as u};
