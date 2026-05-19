import{w as d,s as u}from"./index-CEYvZ2ta.js";function C(e){return Array.isArray(e)?e[0]??null:e}function p(e){return Array.isArray(e)?e[0]??null:e}function w(e){const t=p(e.spot),r=p((t==null?void 0:t.location)??null);return{id:e.id,crewId:e.crew_id,title:e.title,meetupAt:e.meetup_at,attendanceCount:0,spotId:e.spot_id,spotName:(r==null?void 0:r.name)??null,spotAddress:[r==null?void 0:r.address,r==null?void 0:r.address_detail].filter(Boolean).join(" ")||null,location:e.location,description:e.description,guestParticipationUse:e.guest_participation_use,boardRentalUse:e.board_rental_use,lessonRequestUse:e.lesson_request_use,recurrenceRule:e.recurrence_rule,createdAt:e.created_at,updatedAt:e.updated_at}}function y(e){const t=C(e.profile);return{id:e.id,meetupId:e.meetup_id,userId:e.user_id,attendanceStatus:e.attendance_status,guestParticipation:e.guest_participation,boardRental:e.board_rental,lessonRequest:e.lesson_request,memo:e.memo,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(t==null?void 0:t.nickname)??null,fullName:(t==null?void 0:t.full_name)??null,provider:(t==null?void 0:t.provider)??"unknown"}}const g=`
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
`;async function M(e){if(e.length===0)return e;const t=e.map(a=>a.id),r=new Map,{data:s,error:n}=await u.rpc("public_get_crew_meetup_attendance_counts",{p_meetup_ids:t});if(!n)(s??[]).forEach(a=>{r.set(a.meetup_id,Number(a.attendance_count)||0)});else{const{data:a,error:c}=await u.from("crew_meetup_attendance").select("meetup_id").in("meetup_id",t).eq("attendance_status","attend");if(c)throw c;(a??[]).forEach(i=>{r.set(i.meetup_id,(r.get(i.meetup_id)??0)+1)})}return e.map(a=>({...a,attendanceCount:r.get(a.id)??0}))}function b(){return{thisMonth:0,thisYear:0,total:0}}function l(){return{totalMeetups:0,totalAttendances:0}}function h(e,t=new Date){const r=t.getFullYear(),s=t.getMonth(),n={};return e.forEach(a=>{const c=new Date(a.meetup_at);if(Number.isNaN(c.getTime()))return;const i=n[a.crew_id]??b();i.total+=1,c.getFullYear()===r&&(i.thisYear+=1,c.getMonth()===s&&(i.thisMonth+=1)),n[a.crew_id]=i}),n}function S(e=new Date){const t=new Date(e.getFullYear(),e.getMonth(),1),r=new Date(e.getFullYear(),e.getMonth()+1,1),s=new Date(e.getFullYear(),0,1),n=new Date(e.getFullYear()+1,0,1);return{monthStart:t.toISOString(),monthEnd:r.toISOString(),yearStart:s.toISOString(),yearEnd:n.toISOString()}}function q(e=new Date){return new Date(e.getFullYear(),e.getMonth(),e.getDate()).toISOString()}async function E(e){return d(async()=>{const{data:t,error:r}=await u.from("crew_meetup").select(g).eq("crew_id",e).order("meetup_at",{ascending:!1});if(r)throw r;return M((t??[]).map(w))})}async function I(){return d(async()=>{const{data:e,error:t}=await u.from("crew_meetup").select(g).gte("meetup_at",q()).order("meetup_at",{ascending:!0});if(t)throw t;return M((e??[]).map(w))})}async function R(e){return e.length===0?{}:d(async()=>{const t=S(),{data:r,error:s}=await u.rpc("get_crew_meetup_stats",{p_crew_ids:e,p_month_start:t.monthStart,p_month_end:t.monthEnd,p_year_start:t.yearStart,p_year_end:t.yearEnd});if(!s)return(r??[]).reduce((c,i)=>(c[i.crew_id]={thisMonth:Number(i.this_month)||0,thisYear:Number(i.this_year)||0,total:Number(i.total)||0},c),{});const{data:n,error:a}=await u.from("crew_meetup").select("crew_id, meetup_at").in("crew_id",e);if(a)throw a;return h(n??[])})}async function D(e){return e.length===0?{}:d(async()=>{const t=e.reduce((o,_)=>(o[_]=l(),o),{}),{data:r,error:s}=await u.from("crew_meetup").select("id, crew_id").in("crew_id",e);if(s)throw s;const n=r??[],a=new Map;if(n.forEach(o=>{a.set(o.id,o.crew_id);const _=t[o.crew_id]??l();_.totalMeetups+=1,t[o.crew_id]=_}),n.length===0)return t;const{data:c,error:i}=await u.from("crew_meetup_attendance").select(`
          meetup_id,
          meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey (
            crew_id
          )
        `).in("meetup_id",n.map(o=>o.id)).eq("attendance_status","attend");if(i)throw i;return(c??[]).forEach(o=>{var f;const _=((f=p(o.meetup))==null?void 0:f.crew_id)??a.get(o.meetup_id);if(!_)return;const m=t[_]??l();m.totalAttendances+=1,t[_]=m}),t})}async function U(e,t){return d(async()=>{var n,a,c;const{data:r,error:s}=await u.from("crew_meetup").insert({crew_id:e,title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((n=t.location)==null?void 0:n.trim())||null,description:((a=t.description)==null?void 0:a.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((c=t.recurrenceRule)==null?void 0:c.trim())||null}).select("id").single();if(s)throw s;return r.id})}async function k(e,t){return t.length===0?[]:d(async()=>{const{data:r,error:s}=await u.from("crew_meetup").insert(t.map(n=>{var a,c,i;return{crew_id:e,title:n.title.trim(),meetup_at:n.meetupAt,spot_id:n.spotId,location:((a=n.location)==null?void 0:a.trim())||null,description:((c=n.description)==null?void 0:c.trim())||null,guest_participation_use:n.guestParticipationUse,board_rental_use:n.boardRentalUse,lesson_request_use:n.lessonRequestUse,recurrence_rule:((i=n.recurrenceRule)==null?void 0:i.trim())||null}})).select("id").returns();if(s)throw s;return(r??[]).map(n=>n.id)})}async function Y(e,t){return d(async()=>{var s,n,a;const{error:r}=await u.from("crew_meetup").update({title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((s=t.location)==null?void 0:s.trim())||null,description:((n=t.description)==null?void 0:n.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((a=t.recurrenceRule)==null?void 0:a.trim())||null}).eq("id",e);if(r)throw r})}async function N(e){return d(async()=>{const{error:t}=await u.from("crew_meetup").delete().eq("id",e);if(t)throw t})}async function B(e){return d(async()=>{const{data:t,error:r}=await u.from("crew_meetup_attendance").select(`
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
      `).eq("meetup_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(y)})}async function P(e){return d(async()=>{const{data:t,error:r}=await u.from("crew_meetup_attendance").select(`
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
      `).eq("user_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(y)})}async function F(e,t){return d(async()=>{const{error:r}=await u.from("crew_meetup_attendance").update({attendance_status:t}).eq("id",e);if(r)throw r})}async function O(e,t){return d(async()=>{const{error:r}=await u.from("crew_meetup_attendance").update({memo:(t==null?void 0:t.trim())||null}).eq("id",e);if(r)throw r})}async function T(e){return d(async()=>{var r;const{error:t}=await u.rpc("upsert_crew_meetup_attendance",{p_meetup_id:e.meetupId,p_attendance_status:e.attendanceStatus,p_board_rental:e.boardRental,p_lesson_request:e.lessonRequest,p_memo:((r=e.memo)==null?void 0:r.trim())||null});if(t)throw t})}async function j(e){return d(async()=>{var r;const{error:t}=await u.from("crew_meetup_attendance").upsert({meetup_id:e.meetupId,user_id:e.userId,attendance_status:e.attendanceStatus,guest_participation:e.guestParticipation,board_rental:e.boardRental,lesson_request:e.lessonRequest,memo:((r=e.memo)==null?void 0:r.trim())||null},{onConflict:"meetup_id,user_id"});if(t)throw t})}async function v(e){return d(async()=>{const{error:t}=await u.rpc("cancel_crew_meetup_attendance",{p_meetup_id:e});if(t)throw t})}export{I as a,P as b,D as c,v as d,E as e,B as f,R as g,Y as h,k as i,U as j,N as k,O as l,j as m,F as n,T as u};
