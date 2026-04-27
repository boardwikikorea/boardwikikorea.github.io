import{w as n,s as a}from"./index-CHMhTo8l.js";function m(e){return Array.isArray(e)?e[0]??null:e}function o(e){return Array.isArray(e)?e[0]??null:e}function _(e){const t=o(e.spot),r=o((t==null?void 0:t.location)??null);return{id:e.id,crewId:e.crew_id,title:e.title,meetupAt:e.meetup_at,spotId:e.spot_id,spotName:(r==null?void 0:r.name)??null,spotAddress:[r==null?void 0:r.address,r==null?void 0:r.address_detail].filter(Boolean).join(" ")||null,location:e.location,description:e.description,guestParticipationUse:e.guest_participation_use,boardRentalUse:e.board_rental_use,lessonRequestUse:e.lesson_request_use,recurrenceRule:e.recurrence_rule,createdAt:e.created_at,updatedAt:e.updated_at}}function l(e){const t=m(e.profile);return{id:e.id,meetupId:e.meetup_id,userId:e.user_id,attendanceStatus:e.attendance_status,guestParticipation:e.guest_participation,boardRental:e.board_rental,lessonRequest:e.lesson_request,memo:e.memo,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(t==null?void 0:t.nickname)??null,fullName:(t==null?void 0:t.full_name)??null,provider:(t==null?void 0:t.provider)??"unknown"}}const p=`
  id,
  crew_id,
  title,
  meetup_at,
  spot_id,
  location,
  description,
  guest_participation_use,
  board_rental_use,
  lesson_request_use,
  recurrence_rule,
  created_at,
  updated_at,
  spot:spot_info!crew_meetup_spot_id_fkey (
    id,
    location:location!spot_info_id_fkey (
      name,
      address,
      address_detail
    )
  )
`;function f(){return{thisMonth:0,thisYear:0,total:0}}function w(e,t=new Date){const r=t.getFullYear(),i=t.getMonth(),s={};return e.forEach(u=>{const c=new Date(u.meetup_at);if(Number.isNaN(c.getTime()))return;const d=s[u.crew_id]??f();d.total+=1,c.getFullYear()===r&&(d.thisYear+=1,c.getMonth()===i&&(d.thisMonth+=1)),s[u.crew_id]=d}),s}async function g(e){return n(async()=>{const{data:t,error:r}=await a.from("crew_meetup").select(p).eq("crew_id",e).order("meetup_at",{ascending:!1});if(r)throw r;return(t??[]).map(_)})}async function M(){return n(async()=>{const{data:e,error:t}=await a.from("crew_meetup").select(p).gte("meetup_at",new Date().toISOString()).order("meetup_at",{ascending:!0});if(t)throw t;return(e??[]).map(_)})}async function q(e){return e.length===0?{}:n(async()=>{const{data:t,error:r}=await a.from("crew_meetup").select("crew_id, meetup_at").in("crew_id",e);if(r)throw r;return w(t??[])})}async function A(e,t){return n(async()=>{var s,u,c;const{data:r,error:i}=await a.from("crew_meetup").insert({crew_id:e,title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((s=t.location)==null?void 0:s.trim())||null,description:((u=t.description)==null?void 0:u.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((c=t.recurrenceRule)==null?void 0:c.trim())||null}).select("id").single();if(i)throw i;return r.id})}async function b(e,t){return n(async()=>{var i,s,u;const{error:r}=await a.from("crew_meetup").update({title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((i=t.location)==null?void 0:i.trim())||null,description:((s=t.description)==null?void 0:s.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((u=t.recurrenceRule)==null?void 0:u.trim())||null}).eq("id",e);if(r)throw r})}async function C(e){return n(async()=>{const{error:t}=await a.from("crew_meetup").delete().eq("id",e);if(t)throw t})}async function R(e){return n(async()=>{const{data:t,error:r}=await a.from("crew_meetup_attendance").select(`
        id,
        meetup_id,
        user_id,
        attendance_status,
        guest_participation,
        board_rental,
        lesson_request,
        memo,
        created_at,
        updated_at,
        profile:profile!crew_meetup_attendance_user_id_fkey (
          nickname,
          full_name,
          provider
        )
      `).eq("meetup_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(l)})}async function U(e){return n(async()=>{const{data:t,error:r}=await a.from("crew_meetup_attendance").select(`
        id,
        meetup_id,
        user_id,
        attendance_status,
        guest_participation,
        board_rental,
        lesson_request,
        memo,
        created_at,
        updated_at,
        profile:profile!crew_meetup_attendance_user_id_fkey (
          nickname,
          full_name,
          provider
        )
      `).eq("user_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(l)})}async function h(e,t){return n(async()=>{const{error:r}=await a.from("crew_meetup_attendance").update({attendance_status:t}).eq("id",e);if(r)throw r})}async function k(e){return n(async()=>{var r;const{error:t}=await a.rpc("upsert_crew_meetup_attendance",{p_meetup_id:e.meetupId,p_attendance_status:e.attendanceStatus,p_board_rental:e.boardRental,p_lesson_request:e.lessonRequest,p_memo:((r=e.memo)==null?void 0:r.trim())||null});if(t)throw t})}async function I(e){return n(async()=>{const{error:t}=await a.rpc("cancel_crew_meetup_attendance",{p_meetup_id:e});if(t)throw t})}export{U as a,g as b,I as c,q as d,b as e,M as f,A as g,C as h,R as i,h as j,k as u};
