import{w as d,s}from"./index-CHs91-cc.js";function M(e){return Array.isArray(e)?e[0]??null:e}function l(e){return Array.isArray(e)?e[0]??null:e}function w(e){const t=l(e.spot),r=l((t==null?void 0:t.location)??null);return{id:e.id,crewId:e.crew_id,title:e.title,meetupAt:e.meetup_at,attendanceCount:0,spotId:e.spot_id,spotName:(r==null?void 0:r.name)??null,spotAddress:[r==null?void 0:r.address,r==null?void 0:r.address_detail].filter(Boolean).join(" ")||null,location:e.location,description:e.description,guestParticipationUse:e.guest_participation_use,boardRentalUse:e.board_rental_use,lessonRequestUse:e.lesson_request_use,recurrenceRule:e.recurrence_rule,createdAt:e.created_at,updatedAt:e.updated_at}}function y(e){const t=M(e.profile);return{id:e.id,meetupId:e.meetup_id,userId:e.user_id,attendanceStatus:e.attendance_status,guestParticipation:e.guest_participation,boardRental:e.board_rental,lessonRequest:e.lesson_request,memo:e.memo,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(t==null?void 0:t.nickname)??null,fullName:(t==null?void 0:t.full_name)??null,provider:(t==null?void 0:t.provider)??"unknown"}}const g=`
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
`;async function h(e){if(e.length===0)return e;const t=e.map(n=>n.id),r=new Map,{data:u,error:a}=await s.rpc("public_get_crew_meetup_attendance_counts",{p_meetup_ids:t});if(!a)(u??[]).forEach(n=>{r.set(n.meetup_id,Number(n.attendance_count)||0)});else{const{data:n,error:c}=await s.from("crew_meetup_attendance").select("meetup_id").in("meetup_id",t).eq("attendance_status","attend");if(c)throw c;(n??[]).forEach(i=>{r.set(i.meetup_id,(r.get(i.meetup_id)??0)+1)})}return e.map(n=>({...n,attendanceCount:r.get(n.id)??0}))}function C(){return{thisMonth:0,thisYear:0,total:0}}function p(){return{totalMeetups:0,totalAttendances:0}}function b(e,t=new Date){const r=t.getFullYear(),u=t.getMonth(),a={};return e.forEach(n=>{const c=new Date(n.meetup_at);if(Number.isNaN(c.getTime()))return;const i=a[n.crew_id]??C();i.total+=1,c.getFullYear()===r&&(i.thisYear+=1,c.getMonth()===u&&(i.thisMonth+=1)),a[n.crew_id]=i}),a}function S(e=new Date){const t=new Date(e.getFullYear(),e.getMonth(),1),r=new Date(e.getFullYear(),e.getMonth()+1,1),u=new Date(e.getFullYear(),0,1),a=new Date(e.getFullYear()+1,0,1);return{monthStart:t.toISOString(),monthEnd:r.toISOString(),yearStart:u.toISOString(),yearEnd:a.toISOString()}}async function A(e){return d(async()=>{const{data:t,error:r}=await s.from("crew_meetup").select(g).eq("crew_id",e).order("meetup_at",{ascending:!1});if(r)throw r;return h((t??[]).map(w))})}async function E(){return d(async()=>{const{data:e,error:t}=await s.from("crew_meetup").select(g).gte("meetup_at",new Date().toISOString()).order("meetup_at",{ascending:!0});if(t)throw t;return h((e??[]).map(w))})}async function I(e){return e.length===0?{}:d(async()=>{const t=S(),{data:r,error:u}=await s.rpc("get_crew_meetup_stats",{p_crew_ids:e,p_month_start:t.monthStart,p_month_end:t.monthEnd,p_year_start:t.yearStart,p_year_end:t.yearEnd});if(!u)return(r??[]).reduce((c,i)=>(c[i.crew_id]={thisMonth:Number(i.this_month)||0,thisYear:Number(i.this_year)||0,total:Number(i.total)||0},c),{});const{data:a,error:n}=await s.from("crew_meetup").select("crew_id, meetup_at").in("crew_id",e);if(n)throw n;return b(a??[])})}async function R(e){return e.length===0?{}:d(async()=>{const t=e.reduce((o,_)=>(o[_]=p(),o),{}),{data:r,error:u}=await s.from("crew_meetup").select("id, crew_id").in("crew_id",e);if(u)throw u;const a=r??[],n=new Map;if(a.forEach(o=>{n.set(o.id,o.crew_id);const _=t[o.crew_id]??p();_.totalMeetups+=1,t[o.crew_id]=_}),a.length===0)return t;const{data:c,error:i}=await s.from("crew_meetup_attendance").select(`
          meetup_id,
          meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey (
            crew_id
          )
        `).in("meetup_id",a.map(o=>o.id)).eq("attendance_status","attend");if(i)throw i;return(c??[]).forEach(o=>{var f;const _=((f=l(o.meetup))==null?void 0:f.crew_id)??n.get(o.meetup_id);if(!_)return;const m=t[_]??p();m.totalAttendances+=1,t[_]=m}),t})}async function D(e,t){return d(async()=>{var a,n,c;const{data:r,error:u}=await s.from("crew_meetup").insert({crew_id:e,title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((a=t.location)==null?void 0:a.trim())||null,description:((n=t.description)==null?void 0:n.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((c=t.recurrenceRule)==null?void 0:c.trim())||null}).select("id").single();if(u)throw u;return r.id})}async function U(e,t){return d(async()=>{var u,a,n;const{error:r}=await s.from("crew_meetup").update({title:t.title.trim(),meetup_at:t.meetupAt,spot_id:t.spotId,location:((u=t.location)==null?void 0:u.trim())||null,description:((a=t.description)==null?void 0:a.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((n=t.recurrenceRule)==null?void 0:n.trim())||null}).eq("id",e);if(r)throw r})}async function k(e){return d(async()=>{const{error:t}=await s.from("crew_meetup").delete().eq("id",e);if(t)throw t})}async function Y(e){return d(async()=>{const{data:t,error:r}=await s.from("crew_meetup_attendance").select(`
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
      `).eq("meetup_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(y)})}async function N(e){return d(async()=>{const{data:t,error:r}=await s.from("crew_meetup_attendance").select(`
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
      `).eq("user_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(y)})}async function B(e,t){return d(async()=>{const{error:r}=await s.from("crew_meetup_attendance").update({attendance_status:t}).eq("id",e);if(r)throw r})}async function P(e){return d(async()=>{var r;const{error:t}=await s.rpc("upsert_crew_meetup_attendance",{p_meetup_id:e.meetupId,p_attendance_status:e.attendanceStatus,p_board_rental:e.boardRental,p_lesson_request:e.lessonRequest,p_memo:((r=e.memo)==null?void 0:r.trim())||null});if(t)throw t})}async function F(e){return d(async()=>{var r;const{error:t}=await s.from("crew_meetup_attendance").upsert({meetup_id:e.meetupId,user_id:e.userId,attendance_status:e.attendanceStatus,guest_participation:e.guestParticipation,board_rental:e.boardRental,lesson_request:e.lessonRequest,memo:((r=e.memo)==null?void 0:r.trim())||null},{onConflict:"meetup_id,user_id"});if(t)throw t})}async function O(e){return d(async()=>{const{error:t}=await s.rpc("cancel_crew_meetup_attendance",{p_meetup_id:e});if(t)throw t})}export{E as a,N as b,R as c,O as d,A as e,Y as f,I as g,U as h,D as i,k as j,B as k,F as l,P as u};
