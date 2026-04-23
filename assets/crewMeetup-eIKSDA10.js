import{w as n,s as a}from"./index-CizPz24j.js";function p(e){return Array.isArray(e)?e[0]??null:e}function c(e){return Array.isArray(e)?e[0]??null:e}function _(e){const t=c(e.spot),r=c((t==null?void 0:t.location)??null);return{id:e.id,crewId:e.crew_id,title:e.title,meetupAt:e.meetup_at,spotId:e.spot_id,spotName:(r==null?void 0:r.name)??null,spotAddress:[r==null?void 0:r.address,r==null?void 0:r.address_detail].filter(Boolean).join(" ")||null,location:e.location,description:e.description,guestParticipationUse:e.guest_participation_use,boardRentalUse:e.board_rental_use,lessonRequestUse:e.lesson_request_use,recurrenceRule:e.recurrence_rule,createdAt:e.created_at,updatedAt:e.updated_at}}function o(e){const t=p(e.profile);return{id:e.id,meetupId:e.meetup_id,userId:e.user_id,attendanceStatus:e.attendance_status,guestParticipation:e.guest_participation,boardRental:e.board_rental,lessonRequest:e.lesson_request,memo:e.memo,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(t==null?void 0:t.nickname)??null,fullName:(t==null?void 0:t.full_name)??null,provider:(t==null?void 0:t.provider)??"unknown"}}const l=`
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
`;async function f(e){return n(async()=>{const{data:t,error:r}=await a.from("crew_meetup").select(l).eq("crew_id",e).order("meetup_at",{ascending:!1});if(r)throw r;return(t??[]).map(_)})}async function w(){return n(async()=>{const{data:e,error:t}=await a.from("crew_meetup").select(l).gte("meetup_at",new Date().toISOString()).order("meetup_at",{ascending:!0});if(t)throw t;return(e??[]).map(_)})}async function y(e,t){return n(async()=>{var u,i,d;const{data:r,error:s}=await a.from("crew_meetup").insert({crew_id:e,title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((u=t.location)==null?void 0:u.trim())||null,description:((i=t.description)==null?void 0:i.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((d=t.recurrenceRule)==null?void 0:d.trim())||null}).select("id").single();if(s)throw s;return r.id})}async function g(e,t){return n(async()=>{var s,u,i;const{error:r}=await a.from("crew_meetup").update({title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((s=t.location)==null?void 0:s.trim())||null,description:((u=t.description)==null?void 0:u.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((i=t.recurrenceRule)==null?void 0:i.trim())||null}).eq("id",e);if(r)throw r})}async function q(e){return n(async()=>{const{error:t}=await a.from("crew_meetup").delete().eq("id",e);if(t)throw t})}async function A(e){return n(async()=>{const{data:t,error:r}=await a.from("crew_meetup_attendance").select(`
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
      `).eq("meetup_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(o)})}async function b(e){return n(async()=>{const{data:t,error:r}=await a.from("crew_meetup_attendance").select(`
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
      `).eq("user_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(o)})}async function M(e,t){return n(async()=>{const{error:r}=await a.from("crew_meetup_attendance").update({attendance_status:t}).eq("id",e);if(r)throw r})}async function R(e){return n(async()=>{var r;const{error:t}=await a.rpc("upsert_crew_meetup_attendance",{p_meetup_id:e.meetupId,p_attendance_status:e.attendanceStatus,p_board_rental:e.boardRental,p_lesson_request:e.lessonRequest,p_memo:((r=e.memo)==null?void 0:r.trim())||null});if(t)throw t})}async function C(e){return n(async()=>{const{error:t}=await a.rpc("cancel_crew_meetup_attendance",{p_meetup_id:e});if(t)throw t})}export{b as a,f as b,C as c,g as d,y as e,w as f,q as g,A as h,M as i,R as u};
