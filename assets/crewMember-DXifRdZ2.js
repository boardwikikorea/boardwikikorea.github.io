import{w as s,d as _}from"./index-QPD345sW.js";function A(e){return Array.isArray(e)?e[0]??null:e}function C(e){return Array.isArray(e)?e[0]??null:e}async function k(e){return s(async()=>{const{data:n,error:r}=await _.from("crew_member").select(`
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
      `).eq("crew_id",e).order("created_at",{ascending:!1});if(r)throw r;return(n??[]).map(t=>{const c=A(t.profile);return{id:t.id,crewId:t.crew_id,userId:t.user_id,role:t.role,yearlyFeePaid:t.yearly_fee_paid??!1,createdAt:t.created_at,nickname:(c==null?void 0:c.nickname)??null,fullName:(c==null?void 0:c.full_name)??null,provider:(c==null?void 0:c.provider)??"unknown"}})})}async function q(e){return s(async()=>{const{data:n,error:r}=await _.rpc("get_my_crew_member_crew_ids");if(!r)return(n??[]).map(d=>typeof d=="string"?d:d.crew_id);const{data:t,error:c}=await _.from("crew_member").select("crew_id").eq("user_id",e);if(c)throw c;return(t??[]).map(d=>d.crew_id)})}async function g(e){return s(async()=>{const{data:n,error:r}=await _.from("crew_member").select("crew_id,yearly_fee_paid").eq("user_id",e);if(r)throw r;return(n??[]).map(t=>({crewId:t.crew_id,yearlyFeePaid:t.yearly_fee_paid??!1}))})}async function M(e){return s(async()=>{const{data:n,error:r}=await _.from("crew_member").select("crew_id").eq("user_id",e).in("role",["leader","owner"]);if(r)throw r;return(n??[]).map(t=>t.crew_id)})}async function I(e){return s(async()=>{const{data:n,error:r}=await _.rpc("get_crew_member_count",{p_crew_id:e});if(r)throw r;return Number(n??0)})}async function D(e,n={}){return s(async()=>{const r=new Date().toISOString();let t=_.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          is_canceled,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",e).eq("meetup.is_canceled",!1).lte("meetup.meetup_at",r);n.from&&(t=t.gte("meetup.meetup_at",n.from)),n.to&&(t=t.lt("meetup.meetup_at",n.to));const{data:c,error:d}=await t;if(d)throw d;return(c??[]).reduce((u,f)=>{const m=u[f.user_id]??{attendCount:0,lastAttendAt:null},w=C(f.meetup),o=(w==null?void 0:w.meetup_at)??null;return m.attendCount+=1,o&&(!m.lastAttendAt||new Date(o).getTime()>new Date(m.lastAttendAt).getTime())&&(m.lastAttendAt=o),u[f.user_id]=m,u},{})})}async function N(e,n={},r=10){return s(async()=>{const t=new Date().toISOString(),{data:c,error:d}=await _.rpc("public_get_crew_attendance_leaderboard",{p_crew_id:e,p_from:n.from??null,p_to:n.to??null});if(!d){const i=(c??[]).map(a=>({userId:a.user_id,attendCount:Number(a.attend_count)||0,lastAttendAt:a.last_attend_at,nickname:a.nickname,fullName:a.full_name,crewId:a.crew_id??null,crewName:a.crew_name??null}));return typeof r=="number"?i.slice(0,r):i}let u=_.from("crew_meetup_attendance").select(`
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
      `).eq("attendance_status","attend");e&&(u=u.eq("meetup.crew_id",e)),u=u.eq("meetup.is_canceled",!1),u=u.lte("meetup.meetup_at",t),n.from&&(u=u.gte("meetup.meetup_at",n.from)),n.to&&(u=u.lt("meetup.meetup_at",n.to));const{data:f,error:m}=await u;if(m)throw m;const w=(f??[]).reduce((i,a)=>{const l=A(a.profile),p=i[a.user_id]??{userId:a.user_id,attendCount:0,lastAttendAt:null,nickname:(l==null?void 0:l.nickname)??null,fullName:(l==null?void 0:l.full_name)??null,crewId:null,crewName:null},y=C(a.meetup),b=(y==null?void 0:y.meetup_at)??null;return p.attendCount+=1,b&&(!p.lastAttendAt||new Date(b).getTime()>new Date(p.lastAttendAt).getTime())&&(p.lastAttendAt=b),i[a.user_id]=p,i},{}),o=Object.values(w).sort((i,a)=>i.attendCount!==a.attendCount?a.attendCount-i.attendCount:(a.lastAttendAt??"").localeCompare(i.lastAttendAt??""));return typeof r=="number"?o.slice(0,r):o})}async function S(e,n,r="member"){return s(async()=>{const{error:t}=await _.from("crew_member").upsert({crew_id:e,user_id:n,role:r},{onConflict:"crew_id,user_id"});if(t)throw t})}async function T(e,n){return s(async()=>{const{error:r}=await _.rpc("revoke_crew_member",{p_crew_id:e,p_user_id:n});if(!r)return;if(r.code!=="PGRST202")throw r;const{error:t}=await _.from("crew_member").delete().eq("crew_id",e).eq("user_id",n);if(t)throw t})}async function v(e,n){return s(async()=>{const{error:r}=await _.rpc("update_crew_member_yearly_fee_paid",{p_crew_member_id:e,p_yearly_fee_paid:n});if(!r)return;if(r.code!=="PGRST202")throw r;const{error:t}=await _.from("crew_member").update({yearly_fee_paid:n}).eq("id",e);if(t)throw t})}export{N as a,k as b,q as c,I as d,M as e,g as f,S as g,D as h,T as r,v as u};
