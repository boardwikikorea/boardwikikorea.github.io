import{w as u,s as a}from"./index-SX7yNxpm.js";function M(e){return Array.isArray(e)?e[0]??null:e}function l(e){return Array.isArray(e)?e[0]??null:e}function w(e){const t=l(e.spot),n=l((t==null?void 0:t.location)??null);return{id:e.id,crewId:e.crew_id,title:e.title,meetupAt:e.meetup_at,attendanceCount:0,spotId:e.spot_id,spotName:(n==null?void 0:n.name)??null,spotAddress:[n==null?void 0:n.address,n==null?void 0:n.address_detail].filter(Boolean).join(" ")||null,location:e.location,description:e.description,guestParticipationUse:e.guest_participation_use,boardRentalUse:e.board_rental_use,lessonRequestUse:e.lesson_request_use,recurrenceRule:e.recurrence_rule,createdAt:e.created_at,updatedAt:e.updated_at}}function y(e){const t=M(e.profile);return{id:e.id,meetupId:e.meetup_id,userId:e.user_id,attendanceStatus:e.attendance_status,guestParticipation:e.guest_participation,boardRental:e.board_rental,lessonRequest:e.lesson_request,memo:e.memo,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(t==null?void 0:t.nickname)??null,fullName:(t==null?void 0:t.full_name)??null,provider:(t==null?void 0:t.provider)??"unknown"}}const g=`
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
`;async function C(e){if(e.length===0)return e;const t=e.map(r=>r.id),n=new Map,{data:i,error:s}=await a.rpc("public_get_crew_meetup_attendance_counts",{p_meetup_ids:t});if(!s)(i??[]).forEach(r=>{n.set(r.meetup_id,Number(r.attendance_count)||0)});else{const{data:r,error:d}=await a.from("crew_meetup_attendance").select("meetup_id").in("meetup_id",t).eq("attendance_status","attend");if(d)throw d;(r??[]).forEach(o=>{n.set(o.meetup_id,(n.get(o.meetup_id)??0)+1)})}return e.map(r=>({...r,attendanceCount:n.get(r.id)??0}))}function b(){return{thisMonth:0,thisYear:0,total:0}}function p(){return{totalMeetups:0,totalAttendances:0}}function q(e,t=new Date){const n=t.getFullYear(),i=t.getMonth(),s={};return e.forEach(r=>{const d=new Date(r.meetup_at);if(Number.isNaN(d.getTime()))return;const o=s[r.crew_id]??b();o.total+=1,d.getFullYear()===n&&(o.thisYear+=1,d.getMonth()===i&&(o.thisMonth+=1)),s[r.crew_id]=o}),s}async function h(e){return u(async()=>{const{data:t,error:n}=await a.from("crew_meetup").select(g).eq("crew_id",e).order("meetup_at",{ascending:!1});if(n)throw n;return C((t??[]).map(w))})}async function I(){return u(async()=>{const{data:e,error:t}=await a.from("crew_meetup").select(g).gte("meetup_at",new Date().toISOString()).order("meetup_at",{ascending:!0});if(t)throw t;return C((e??[]).map(w))})}async function R(e){return e.length===0?{}:u(async()=>{const{data:t,error:n}=await a.from("crew_meetup").select("crew_id, meetup_at").in("crew_id",e);if(n)throw n;return q(t??[])})}async function E(e){return e.length===0?{}:u(async()=>{const t=e.reduce((c,_)=>(c[_]=p(),c),{}),{data:n,error:i}=await a.from("crew_meetup").select("id, crew_id").in("crew_id",e);if(i)throw i;const s=n??[],r=new Map;if(s.forEach(c=>{r.set(c.id,c.crew_id);const _=t[c.crew_id]??p();_.totalMeetups+=1,t[c.crew_id]=_}),s.length===0)return t;const{data:d,error:o}=await a.from("crew_meetup_attendance").select(`
          meetup_id,
          meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey (
            crew_id
          )
        `).in("meetup_id",s.map(c=>c.id)).eq("attendance_status","attend");if(o)throw o;return(d??[]).forEach(c=>{var f;const _=((f=l(c.meetup))==null?void 0:f.crew_id)??r.get(c.meetup_id);if(!_)return;const m=t[_]??p();m.totalAttendances+=1,t[_]=m}),t})}async function S(e,t){return u(async()=>{var s,r,d;const{data:n,error:i}=await a.from("crew_meetup").insert({crew_id:e,title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((s=t.location)==null?void 0:s.trim())||null,description:((r=t.description)==null?void 0:r.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((d=t.recurrenceRule)==null?void 0:d.trim())||null}).select("id").single();if(i)throw i;return n.id})}async function U(e,t){return u(async()=>{var i,s,r;const{error:n}=await a.from("crew_meetup").update({title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((i=t.location)==null?void 0:i.trim())||null,description:((s=t.description)==null?void 0:s.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((r=t.recurrenceRule)==null?void 0:r.trim())||null}).eq("id",e);if(n)throw n})}async function k(e){return u(async()=>{const{error:t}=await a.from("crew_meetup").delete().eq("id",e);if(t)throw t})}async function B(e){return u(async()=>{const{data:t,error:n}=await a.from("crew_meetup_attendance").select(`
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
      `).eq("meetup_id",e).order("created_at",{ascending:!1});if(n)throw n;return(t??[]).map(y)})}async function D(e){return u(async()=>{const{data:t,error:n}=await a.from("crew_meetup_attendance").select(`
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
      `).eq("user_id",e).order("created_at",{ascending:!1});if(n)throw n;return(t??[]).map(y)})}async function P(e,t){return u(async()=>{const{error:n}=await a.from("crew_meetup_attendance").update({attendance_status:t}).eq("id",e);if(n)throw n})}async function N(e){return u(async()=>{var n;const{error:t}=await a.rpc("upsert_crew_meetup_attendance",{p_meetup_id:e.meetupId,p_attendance_status:e.attendanceStatus,p_board_rental:e.boardRental,p_lesson_request:e.lessonRequest,p_memo:((n=e.memo)==null?void 0:n.trim())||null});if(t)throw t})}async function Y(e){return u(async()=>{var n;const{error:t}=await a.from("crew_meetup_attendance").upsert({meetup_id:e.meetupId,user_id:e.userId,attendance_status:e.attendanceStatus,guest_participation:e.guestParticipation,board_rental:e.boardRental,lesson_request:e.lessonRequest,memo:((n=e.memo)==null?void 0:n.trim())||null},{onConflict:"meetup_id,user_id"});if(t)throw t})}async function T(e){return u(async()=>{const{error:t}=await a.rpc("cancel_crew_meetup_attendance",{p_meetup_id:e});if(t)throw t})}export{I as a,D as b,E as c,T as d,h as e,B as f,R as g,U as h,S as i,k as j,P as k,Y as l,N as u};
