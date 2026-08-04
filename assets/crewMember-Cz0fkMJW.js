import{w as i,a as c}from"./index-C_IEX-OC.js";function w(r){return Array.isArray(r)?r[0]??null:r}function f(r){return Array.isArray(r)?r[0]??null:r}async function l(r){return i(async()=>{const{data:a,error:t}=await c.from("crew_member").select(`
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
      `).eq("crew_id",r).order("created_at",{ascending:!1});if(t)throw t;return(a??[]).map(e=>{const n=w(e.profile);return{id:e.id,crewId:e.crew_id,userId:e.user_id,role:e.role,yearlyFeePaid:e.yearly_fee_paid??!1,createdAt:e.created_at,nickname:(n==null?void 0:n.nickname)??null,fullName:(n==null?void 0:n.full_name)??null,provider:(n==null?void 0:n.provider)??"unknown"}})})}async function y(r){return i(async()=>{const{data:a,error:t}=await c.rpc("get_my_crew_member_crew_ids");if(!t)return(a??[]).map(_=>typeof _=="string"?_:_.crew_id);const{data:e,error:n}=await c.from("crew_member").select("crew_id").eq("user_id",r);if(n)throw n;return(e??[]).map(_=>_.crew_id)})}async function b(r){return i(async()=>{const{data:a,error:t}=await c.from("crew_member").select("crew_id,yearly_fee_paid").eq("user_id",r);if(t)throw t;return(a??[]).map(e=>({crewId:e.crew_id,yearlyFeePaid:e.yearly_fee_paid??!1}))})}async function h(r){return i(async()=>{const{data:a,error:t}=await c.from("crew_member").select("crew_id").eq("user_id",r).in("role",["leader","owner"]);if(t)throw t;return(a??[]).map(e=>e.crew_id)})}async function A(r){return i(async()=>{const{data:a,error:t}=await c.rpc("get_crew_member_count",{p_crew_id:r});if(t)throw t;return Number(a??0)})}async function C(r,a={}){return i(async()=>{const t=new Date().toISOString();let e=c.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          is_canceled,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",r).eq("meetup.is_canceled",!1).lte("meetup.meetup_at",t);a.from&&(e=e.gte("meetup.meetup_at",a.from)),a.to&&(e=e.lt("meetup.meetup_at",a.to));const{data:n,error:_}=await e;if(_)throw _;return(n??[]).reduce((s,d)=>{const u=s[d.user_id]??{attendCount:0,lastAttendAt:null},m=f(d.meetup),o=(m==null?void 0:m.meetup_at)??null;return u.attendCount+=1,o&&(!u.lastAttendAt||new Date(o).getTime()>new Date(u.lastAttendAt).getTime())&&(u.lastAttendAt=o),s[d.user_id]=u,s},{})})}async function q(r,a,t="member"){return i(async()=>{const{error:e}=await c.from("crew_member").upsert({crew_id:r,user_id:a,role:t},{onConflict:"crew_id,user_id"});if(e)throw e})}async function g(r,a){return i(async()=>{const{error:t}=await c.rpc("revoke_crew_member",{p_crew_id:r,p_user_id:a});if(!t)return;if(t.code!=="PGRST202")throw t;const{error:e}=await c.from("crew_member").delete().eq("crew_id",r).eq("user_id",a);if(e)throw e})}async function M(r,a){return i(async()=>{const{error:t}=await c.rpc("update_crew_member_yearly_fee_paid",{p_crew_member_id:r,p_yearly_fee_paid:a});if(!t)return;if(t.code!=="PGRST202")throw t;const{error:e}=await c.from("crew_member").update({yearly_fee_paid:a}).eq("id",r);if(e)throw e})}export{y as a,A as b,l as c,h as d,C as e,b as f,q as g,g as r,M as u};
