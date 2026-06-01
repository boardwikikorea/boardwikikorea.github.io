import{w as o,s}from"./index-DqylHEB0.js";function S(e){return Array.isArray(e)?e[0]??null:e}function p(e){return Array.isArray(e)?e[0]??null:e}function g(e){const t=p(e.spot),r=p((t==null?void 0:t.location)??null);return{id:e.id,crewId:e.crew_id,title:e.title,meetupAt:e.meetup_at,isCanceled:e.is_canceled??!1,attendanceCount:0,spotId:e.spot_id,spotName:(r==null?void 0:r.name)??null,spotAddress:[r==null?void 0:r.address,r==null?void 0:r.address_detail].filter(Boolean).join(" ")||null,googleMapUrl:(r==null?void 0:r.google_map_url)??null,location:e.location,description:e.description,guestParticipationUse:e.guest_participation_use,boardRentalUse:e.board_rental_use,lessonRequestUse:e.lesson_request_use,recurrenceRule:e.recurrence_rule,createdAt:e.created_at,updatedAt:e.updated_at}}function y(e){const t=S(e.profile);return{id:e.id,meetupId:e.meetup_id,userId:e.user_id,attendanceStatus:e.attendance_status,guestParticipation:e.guest_participation,boardRental:e.board_rental,lessonRequest:e.lesson_request,memo:e.memo,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(t==null?void 0:t.nickname)??null,fullName:(t==null?void 0:t.full_name)??null,provider:(t==null?void 0:t.provider)??"unknown"}}const M=`
  id,
  crew_id,
  title,
  meetup_at,
  is_canceled,
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
      address_detail,
      google_map_url
    )
  )
`;async function C(e){if(e.length===0)return e;const t=e.map(a=>a.id),r=new Map,{data:i,error:n}=await s.rpc("public_get_crew_meetup_attendance_counts",{p_meetup_ids:t});if(!n)(i??[]).forEach(a=>{r.set(a.meetup_id,Number(a.attendance_count)||0)});else{const{data:a,error:u}=await s.from("crew_meetup_attendance").select("meetup_id").in("meetup_id",t).eq("attendance_status","attend");if(u)throw u;(a??[]).forEach(c=>{r.set(c.meetup_id,(r.get(c.meetup_id)??0)+1)})}return e.map(a=>({...a,attendanceCount:r.get(a.id)??0}))}function q(){return{thisMonth:0,thisYear:0,total:0}}function l(){return{totalMeetups:0,totalAttendances:0}}function A(e,t=new Date){const r=t.getFullYear(),i=t.getMonth(),n={};return e.forEach(a=>{const u=new Date(a.meetup_at);if(Number.isNaN(u.getTime()))return;const c=n[a.crew_id]??q();c.total+=1,u.getFullYear()===r&&(c.thisYear+=1,u.getMonth()===i&&(c.thisMonth+=1)),n[a.crew_id]=c}),n}function h(e=new Date){const t=new Date(e.getFullYear(),e.getMonth(),1),r=new Date(e.getFullYear(),e.getMonth()+1,1),i=new Date(e.getFullYear(),0,1),n=new Date(e.getFullYear()+1,0,1);return{monthStart:t.toISOString(),monthEnd:r.toISOString(),yearStart:i.toISOString(),yearEnd:n.toISOString()}}function E(e=new Date){return new Date(e.getFullYear(),e.getMonth(),e.getDate()).toISOString()}async function R(e){return o(async()=>{const{data:t,error:r}=await s.from("crew_meetup").select(M).eq("crew_id",e).order("meetup_at",{ascending:!1});if(r)throw r;return C((t??[]).map(g))})}async function D(){return o(async()=>{const{data:e,error:t}=await s.from("crew_meetup").select(M).gte("meetup_at",E()).order("meetup_at",{ascending:!0});if(t)throw t;return C((e??[]).map(g))})}async function U(e){return e.length===0?{}:o(async()=>{const t=h(),{data:r,error:i}=await s.rpc("get_crew_meetup_stats",{p_crew_ids:e,p_month_start:t.monthStart,p_month_end:t.monthEnd,p_year_start:t.yearStart,p_year_end:t.yearEnd});if(!i)return(r??[]).reduce((u,c)=>(u[c.crew_id]={thisMonth:Number(c.this_month)||0,thisYear:Number(c.this_year)||0,total:Number(c.total)||0},u),{});const{data:n,error:a}=await s.from("crew_meetup").select("crew_id, meetup_at").in("crew_id",e);if(a)throw a;return A(n??[])})}async function k(e){return e.length===0?{}:o(async()=>{const t=e.reduce((d,_)=>(d[_]=l(),d),{}),{data:r,error:i}=await s.rpc("public_get_crew_list_stats",{p_crew_ids:e});if(!i)return(r??[]).reduce((d,_)=>(d[_.crew_id]={totalMeetups:Number(_.total_meetups)||0,totalAttendances:Number(_.total_attendances)||0},d),t);const{data:n,error:a}=await s.from("crew_meetup").select("id, crew_id").in("crew_id",e);if(a)throw a;const u=n??[],c=new Map;if(u.forEach(d=>{c.set(d.id,d.crew_id);const _=t[d.crew_id]??l();_.totalMeetups+=1,t[d.crew_id]=_}),u.length===0)return t;const{data:b,error:m}=await s.from("crew_meetup_attendance").select(`
          meetup_id,
          meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey (
            crew_id
          )
        `).in("meetup_id",u.map(d=>d.id)).eq("attendance_status","attend");if(m)throw m;return(b??[]).forEach(d=>{var w;const _=((w=p(d.meetup))==null?void 0:w.crew_id)??c.get(d.meetup_id);if(!_)return;const f=t[_]??l();f.totalAttendances+=1,t[_]=f}),t})}async function N(e,t){return o(async()=>{var n,a,u;const{data:r,error:i}=await s.from("crew_meetup").insert({crew_id:e,title:t.title.trim(),meetup_at:t.meetupAt,is_canceled:t.isCanceled??!1,spot_id:t.spotId,location:((n=t.location)==null?void 0:n.trim())||null,description:((a=t.description)==null?void 0:a.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((u=t.recurrenceRule)==null?void 0:u.trim())||null}).select("id").single();if(i)throw i;return r.id})}async function Y(e,t){return t.length===0?[]:o(async()=>{const{data:r,error:i}=await s.from("crew_meetup").insert(t.map(n=>{var a,u,c;return{crew_id:e,title:n.title.trim(),meetup_at:n.meetupAt,is_canceled:n.isCanceled??!1,spot_id:n.spotId,location:((a=n.location)==null?void 0:a.trim())||null,description:((u=n.description)==null?void 0:u.trim())||null,guest_participation_use:n.guestParticipationUse,board_rental_use:n.boardRentalUse,lesson_request_use:n.lessonRequestUse,recurrence_rule:((c=n.recurrenceRule)==null?void 0:c.trim())||null}})).select("id").returns();if(i)throw i;return(r??[]).map(n=>n.id)})}async function B(e,t){return o(async()=>{var i,n,a;const{error:r}=await s.from("crew_meetup").update({title:t.title.trim(),meetup_at:t.meetupAt,is_canceled:t.isCanceled??!1,spot_id:t.spotId,location:((i=t.location)==null?void 0:i.trim())||null,description:((n=t.description)==null?void 0:n.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((a=t.recurrenceRule)==null?void 0:a.trim())||null}).eq("id",e);if(r)throw r})}async function P(e){return o(async()=>{const{error:t}=await s.from("crew_meetup").delete().eq("id",e);if(t)throw t})}async function F(e){return o(async()=>{const{data:t,error:r}=await s.from("crew_meetup_attendance").select(`
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
      `).eq("meetup_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(y)})}async function O(e){return o(async()=>{const{data:t,error:r}=await s.from("crew_meetup_attendance").select(`
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
      `).eq("user_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(y)})}async function T(e,t){return o(async()=>{const{error:r}=await s.from("crew_meetup_attendance").update({attendance_status:t}).eq("id",e);if(r)throw r})}async function j(e,t){return o(async()=>{const{error:r}=await s.from("crew_meetup_attendance").update({memo:(t==null?void 0:t.trim())||null}).eq("id",e);if(r)throw r})}async function v(e){return o(async()=>{var r;const{error:t}=await s.rpc("upsert_crew_meetup_attendance",{p_meetup_id:e.meetupId,p_attendance_status:e.attendanceStatus,p_board_rental:e.boardRental,p_lesson_request:e.lessonRequest,p_memo:((r=e.memo)==null?void 0:r.trim())||null});if(t)throw t})}async function x(e){return o(async()=>{var r;const{error:t}=await s.from("crew_meetup_attendance").upsert({meetup_id:e.meetupId,user_id:e.userId,attendance_status:e.attendanceStatus,guest_participation:e.guestParticipation,board_rental:e.boardRental,lesson_request:e.lessonRequest,memo:((r=e.memo)==null?void 0:r.trim())||null},{onConflict:"meetup_id,user_id"});if(t)throw t})}async function z(e){return o(async()=>{const{error:t}=await s.rpc("cancel_crew_meetup_attendance",{p_meetup_id:e});if(t)throw t})}export{O as a,k as b,F as c,z as d,R as e,D as f,U as g,B as h,Y as i,N as j,P as k,T as l,x as m,j as n,v as u};
