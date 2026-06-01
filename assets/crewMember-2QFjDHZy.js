import{w as _,s as c}from"./index-C0OhLhnV.js";function u(e){return Array.isArray(e)?e[0]??null:e}function o(e){return Array.isArray(e)?e[0]??null:e}async function w(e){return _(async()=>{const{data:a,error:t}=await c.from("crew_member").select(`
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
      `).eq("crew_id",e).order("created_at",{ascending:!1});if(t)throw t;return(a??[]).map(r=>{const n=u(r.profile);return{id:r.id,crewId:r.crew_id,userId:r.user_id,role:r.role,yearlyFeePaid:r.yearly_fee_paid??!1,createdAt:r.created_at,nickname:(n==null?void 0:n.nickname)??null,fullName:(n==null?void 0:n.full_name)??null,provider:(n==null?void 0:n.provider)??"unknown"}})})}async function f(e){return _(async()=>{const{data:a,error:t}=await c.rpc("get_my_crew_member_crew_ids");if(!t)return(a??[]).map(i=>typeof i=="string"?i:i.crew_id);const{data:r,error:n}=await c.from("crew_member").select("crew_id").eq("user_id",e);if(n)throw n;return(r??[]).map(i=>i.crew_id)})}async function y(e){return _(async()=>{const{data:a,error:t}=await c.from("crew_member").select("crew_id,yearly_fee_paid").eq("user_id",e);if(t)throw t;return(a??[]).map(r=>({crewId:r.crew_id,yearlyFeePaid:r.yearly_fee_paid??!1}))})}async function p(e){return _(async()=>{const{data:a,error:t}=await c.from("crew_member").select("crew_id").eq("user_id",e).in("role",["leader","owner"]);if(t)throw t;return(a??[]).map(r=>r.crew_id)})}async function l(e){return _(async()=>{const{data:a,error:t}=await c.rpc("get_crew_member_count",{p_crew_id:e});if(t)throw t;return Number(a??0)})}async function b(e){return _(async()=>{const{data:a,error:t}=await c.from("crew_meetup_attendance").select(`
        user_id,
        meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey!inner (
          crew_id,
          meetup_at
        )
      `).eq("attendance_status","attend").eq("meetup.crew_id",e);if(t)throw t;return(a??[]).reduce((r,n)=>{const i=r[n.user_id]??{attendCount:0,lastAttendAt:null},s=o(n.meetup),d=(s==null?void 0:s.meetup_at)??null;return i.attendCount+=1,d&&(!i.lastAttendAt||new Date(d).getTime()>new Date(i.lastAttendAt).getTime())&&(i.lastAttendAt=d),r[n.user_id]=i,r},{})})}async function h(e,a,t="member"){return _(async()=>{const{error:r}=await c.from("crew_member").upsert({crew_id:e,user_id:a,role:t},{onConflict:"crew_id,user_id"});if(r)throw r})}async function A(e,a){return _(async()=>{const{error:t}=await c.rpc("revoke_crew_member",{p_crew_id:e,p_user_id:a});if(!t)return;if(t.code!=="PGRST202")throw t;const{error:r}=await c.from("crew_member").delete().eq("crew_id",e).eq("user_id",a);if(r)throw r})}async function C(e,a){return _(async()=>{const{error:t}=await c.rpc("update_crew_member_yearly_fee_paid",{p_crew_member_id:e,p_yearly_fee_paid:a});if(!t)return;if(t.code!=="PGRST202")throw t;const{error:r}=await c.from("crew_member").update({yearly_fee_paid:a}).eq("id",e);if(r)throw r})}export{f as a,l as b,w as c,p as d,b as e,y as f,h as g,A as r,C as u};
