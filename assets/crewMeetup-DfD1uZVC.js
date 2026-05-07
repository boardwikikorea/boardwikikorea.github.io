import{w as s,s as a}from"./index-BJRYbB1v.js";function f(e){return Array.isArray(e)?e[0]??null:e}function o(e){return Array.isArray(e)?e[0]??null:e}function _(e){const t=o(e.spot),n=o((t==null?void 0:t.location)??null);return{id:e.id,crewId:e.crew_id,title:e.title,meetupAt:e.meetup_at,attendanceCount:0,spotId:e.spot_id,spotName:(n==null?void 0:n.name)??null,spotAddress:[n==null?void 0:n.address,n==null?void 0:n.address_detail].filter(Boolean).join(" ")||null,location:e.location,description:e.description,guestParticipationUse:e.guest_participation_use,boardRentalUse:e.board_rental_use,lessonRequestUse:e.lesson_request_use,recurrenceRule:e.recurrence_rule,createdAt:e.created_at,updatedAt:e.updated_at}}function l(e){const t=f(e.profile);return{id:e.id,meetupId:e.meetup_id,userId:e.user_id,attendanceStatus:e.attendance_status,guestParticipation:e.guest_participation,boardRental:e.board_rental,lessonRequest:e.lesson_request,memo:e.memo,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(t==null?void 0:t.nickname)??null,fullName:(t==null?void 0:t.full_name)??null,provider:(t==null?void 0:t.provider)??"unknown"}}const p=`
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
`;async function m(e){if(e.length===0)return e;const t=e.map(r=>r.id),n=new Map,{data:i,error:u}=await a.rpc("public_get_crew_meetup_attendance_counts",{p_meetup_ids:t});if(!u)(i??[]).forEach(r=>{n.set(r.meetup_id,Number(r.attendance_count)||0)});else{const{data:r,error:c}=await a.from("crew_meetup_attendance").select("meetup_id").in("meetup_id",t).eq("attendance_status","attend");if(c)throw c;(r??[]).forEach(d=>{n.set(d.meetup_id,(n.get(d.meetup_id)??0)+1)})}return e.map(r=>({...r,attendanceCount:n.get(r.id)??0}))}function w(){return{thisMonth:0,thisYear:0,total:0}}function y(e,t=new Date){const n=t.getFullYear(),i=t.getMonth(),u={};return e.forEach(r=>{const c=new Date(r.meetup_at);if(Number.isNaN(c.getTime()))return;const d=u[r.crew_id]??w();d.total+=1,c.getFullYear()===n&&(d.thisYear+=1,c.getMonth()===i&&(d.thisMonth+=1)),u[r.crew_id]=d}),u}async function M(e){return s(async()=>{const{data:t,error:n}=await a.from("crew_meetup").select(p).eq("crew_id",e).order("meetup_at",{ascending:!1});if(n)throw n;return m((t??[]).map(_))})}async function b(){return s(async()=>{const{data:e,error:t}=await a.from("crew_meetup").select(p).gte("meetup_at",new Date().toISOString()).order("meetup_at",{ascending:!0});if(t)throw t;return m((e??[]).map(_))})}async function C(e){return e.length===0?{}:s(async()=>{const{data:t,error:n}=await a.from("crew_meetup").select("crew_id, meetup_at").in("crew_id",e);if(n)throw n;return y(t??[])})}async function q(e,t){return s(async()=>{var u,r,c;const{data:n,error:i}=await a.from("crew_meetup").insert({crew_id:e,title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((u=t.location)==null?void 0:u.trim())||null,description:((r=t.description)==null?void 0:r.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((c=t.recurrenceRule)==null?void 0:c.trim())||null}).select("id").single();if(i)throw i;return n.id})}async function A(e,t){return s(async()=>{var i,u,r;const{error:n}=await a.from("crew_meetup").update({title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((i=t.location)==null?void 0:i.trim())||null,description:((u=t.description)==null?void 0:u.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((r=t.recurrenceRule)==null?void 0:r.trim())||null}).eq("id",e);if(n)throw n})}async function R(e){return s(async()=>{const{error:t}=await a.from("crew_meetup").delete().eq("id",e);if(t)throw t})}async function I(e){return s(async()=>{const{data:t,error:n}=await a.from("crew_meetup_attendance").select(`
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
      `).eq("meetup_id",e).order("created_at",{ascending:!1});if(n)throw n;return(t??[]).map(l)})}async function U(e){return s(async()=>{const{data:t,error:n}=await a.from("crew_meetup_attendance").select(`
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
      `).eq("user_id",e).order("created_at",{ascending:!1});if(n)throw n;return(t??[]).map(l)})}async function k(e,t){return s(async()=>{const{error:n}=await a.from("crew_meetup_attendance").update({attendance_status:t}).eq("id",e);if(n)throw n})}async function S(e){return s(async()=>{var n;const{error:t}=await a.rpc("upsert_crew_meetup_attendance",{p_meetup_id:e.meetupId,p_attendance_status:e.attendanceStatus,p_board_rental:e.boardRental,p_lesson_request:e.lessonRequest,p_memo:((n=e.memo)==null?void 0:n.trim())||null});if(t)throw t})}async function h(e){return s(async()=>{var n;const{error:t}=await a.from("crew_meetup_attendance").upsert({meetup_id:e.meetupId,user_id:e.userId,attendance_status:e.attendanceStatus,guest_participation:e.guestParticipation,board_rental:e.boardRental,lesson_request:e.lessonRequest,memo:((n=e.memo)==null?void 0:n.trim())||null},{onConflict:"meetup_id,user_id"});if(t)throw t})}async function E(e){return s(async()=>{const{error:t}=await a.rpc("cancel_crew_meetup_attendance",{p_meetup_id:e});if(t)throw t})}export{b as a,U as b,E as c,M as d,C as e,I as f,A as g,q as h,R as i,k as j,h as k,S as u};
