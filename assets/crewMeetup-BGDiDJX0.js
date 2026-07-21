import{w as d,a as u}from"./index-C_OxZ6-l.js";function S(e){return Array.isArray(e)?e[0]??null:e}function f(e){return Array.isArray(e)?e[0]??null:e}function y(e){const t=f(e.spot),r=f((t==null?void 0:t.location)??null);return{id:e.id,crewId:e.crew_id,title:e.title,meetupAt:e.meetup_at,isCanceled:e.is_canceled??!1,attendanceCount:0,spotId:e.spot_id,obotaSpotId:(r==null?void 0:r.id)??null,spotName:(r==null?void 0:r.name)??null,spotAddress:[r==null?void 0:r.address,r==null?void 0:r.address_detail].filter(Boolean).join(" ")||null,googleMapUrl:(r==null?void 0:r.google_map_url)??null,spotLat:(r==null?void 0:r.lat)??null,spotLon:(r==null?void 0:r.lon)??null,location:e.location,description:e.description,guestParticipationUse:e.guest_participation_use,boardRentalUse:e.board_rental_use,lessonRequestUse:e.lesson_request_use,recurrenceRule:e.recurrence_rule,createdAt:e.created_at,updatedAt:e.updated_at}}function M(e){const t=S(e.profile);return{id:e.id,meetupId:e.meetup_id,userId:e.user_id,attendanceStatus:e.attendance_status,guestParticipation:e.guest_participation,boardRental:e.board_rental,lessonRequest:e.lesson_request,memo:e.memo,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(t==null?void 0:t.nickname)??null,fullName:(t==null?void 0:t.full_name)??null,provider:(t==null?void 0:t.provider)??"unknown"}}const b=`
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
      id,
      name,
      address,
      address_detail,
      google_map_url,
      lat,
      lon
    )
  )
`;async function h(e){if(e.length===0)return e;const t=e.map(a=>a.id),r=new Map,{data:i,error:n}=await u.rpc("public_get_crew_meetup_attendance_counts",{p_meetup_ids:t});if(!n)(i??[]).forEach(a=>{r.set(a.meetup_id,Number(a.attendance_count)||0)});else{const{data:a,error:c}=await u.from("crew_meetup_attendance").select("meetup_id").in("meetup_id",t).eq("attendance_status","attend");if(c)throw c;(a??[]).forEach(o=>{r.set(o.meetup_id,(r.get(o.meetup_id)??0)+1)})}return e.map(a=>({...a,attendanceCount:r.get(a.id)??0}))}function C(){return{thisMonth:0,thisYear:0,total:0}}function m(){return{totalMeetups:0,totalAttendances:0}}function q(e,t=new Date){const r=t.getFullYear(),i=t.getMonth(),n={};return e.forEach(a=>{if(a.is_canceled)return;const c=new Date(a.meetup_at);if(Number.isNaN(c.getTime())||c.getTime()>t.getTime())return;const o=n[a.crew_id]??C();o.total+=1,c.getFullYear()===r&&(o.thisYear+=1,c.getMonth()===i&&(o.thisMonth+=1)),n[a.crew_id]=o}),n}function A(e=new Date){const t=new Date(e.getFullYear(),e.getMonth(),1),r=new Date(e.getFullYear(),e.getMonth()+1,1),i=new Date(e.getFullYear(),0,1),n=new Date(e.getFullYear()+1,0,1);return{monthStart:t.toISOString(),monthEnd:r.toISOString(),yearStart:i.toISOString(),yearEnd:n.toISOString()}}function I(e=new Date){return new Date(e.getFullYear(),e.getMonth(),e.getDate()).toISOString()}function R(e=new Date){const t=new Date(e.getFullYear(),e.getMonth()-1,1),r=new Date(e.getFullYear(),e.getMonth()+1,1);return{start:t.toISOString(),end:r.toISOString()}}async function U(e){return d(async()=>{const{data:t,error:r}=await u.from("crew_meetup").select(b).eq("crew_id",e).order("meetup_at",{ascending:!1});if(r)throw r;return h((t??[]).map(y))})}async function E(e){return e.length===0?new Set:d(async()=>{const t=R(),{data:r,error:i}=await u.from("crew_meetup").select("crew_id").in("crew_id",e).or("is_canceled.eq.false,is_canceled.is.null").gte("meetup_at",t.start).lt("meetup_at",t.end);if(i)throw i;return new Set((r??[]).map(n=>n.crew_id))})}async function N(e){return(await E([e])).has(e)}async function Y(){return d(async()=>{const{data:e,error:t}=await u.from("crew_meetup").select(b).gte("meetup_at",I()).order("meetup_at",{ascending:!0});if(t)throw t;return h((e??[]).map(y))})}async function k(e){return e.length===0?{}:d(async()=>{const t=A(),r={p_crew_ids:e,p_month_start:t.monthStart,p_month_end:t.monthEnd,p_year_start:t.yearStart,p_year_end:t.yearEnd},{data:i,error:n}=await u.rpc("public_get_crew_meetup_stats",r);if(!n)return(i??[]).reduce((l,s)=>(l[s.crew_id]={thisMonth:Number(s.this_month)||0,thisYear:Number(s.this_year)||0,total:Number(s.total)||0},l),{});const{data:a,error:c}=await u.rpc("get_crew_meetup_stats",r);if(!c)return(a??[]).reduce((l,s)=>(l[s.crew_id]={thisMonth:Number(s.this_month)||0,thisYear:Number(s.this_year)||0,total:Number(s.total)||0},l),{});const{data:o,error:p}=await u.from("crew_meetup").select("crew_id, meetup_at, is_canceled").in("crew_id",e).lte("meetup_at",new Date().toISOString());if(p)throw p;return q(o??[])})}async function O(e){return e.length===0?{}:d(async()=>{const t=e.reduce((s,_)=>(s[_]=m(),s),{}),{data:r,error:i}=await u.rpc("public_get_crew_list_stats",{p_crew_ids:e});if(!i)return(r??[]).reduce((s,_)=>(s[_.crew_id]={totalMeetups:Number(_.total_meetups)||0,totalAttendances:Number(_.total_attendances)||0},s),t);const{data:n,error:a}=await u.from("crew_meetup").select("id, crew_id").in("crew_id",e).eq("is_canceled",!1).lte("meetup_at",new Date().toISOString());if(a)throw a;const c=n??[],o=new Map;if(c.forEach(s=>{o.set(s.id,s.crew_id);const _=t[s.crew_id]??m();_.totalMeetups+=1,t[s.crew_id]=_}),c.length===0)return t;const{data:p,error:l}=await u.from("crew_meetup_attendance").select(`
          meetup_id,
          meetup:crew_meetup!crew_meetup_attendance_meetup_id_fkey (
            crew_id
          )
        `).in("meetup_id",c.map(s=>s.id)).eq("attendance_status","attend");if(l)throw l;return(p??[]).forEach(s=>{var g;const _=((g=f(s.meetup))==null?void 0:g.crew_id)??o.get(s.meetup_id);if(!_)return;const w=t[_]??m();w.totalAttendances+=1,t[_]=w}),t})}async function F(e,t){return d(async()=>{var n,a,c;const{data:r,error:i}=await u.from("crew_meetup").insert({crew_id:e,title:t.title.trim(),meetup_at:t.meetupAt,is_canceled:t.isCanceled??!1,spot_id:t.spotId,location:((n=t.location)==null?void 0:n.trim())||null,description:((a=t.description)==null?void 0:a.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((c=t.recurrenceRule)==null?void 0:c.trim())||null}).select("id").single();if(i)throw i;return r.id})}async function B(e,t){return t.length===0?[]:d(async()=>{const{data:r,error:i}=await u.from("crew_meetup").insert(t.map(n=>{var a,c,o;return{crew_id:e,title:n.title.trim(),meetup_at:n.meetupAt,is_canceled:n.isCanceled??!1,spot_id:n.spotId,location:((a=n.location)==null?void 0:a.trim())||null,description:((c=n.description)==null?void 0:c.trim())||null,guest_participation_use:n.guestParticipationUse,board_rental_use:n.boardRentalUse,lesson_request_use:n.lessonRequestUse,recurrence_rule:((o=n.recurrenceRule)==null?void 0:o.trim())||null}})).select("id").returns();if(i)throw i;return(r??[]).map(n=>n.id)})}async function P(e,t){return d(async()=>{var i,n,a;const{error:r}=await u.from("crew_meetup").update({title:t.title.trim(),meetup_at:t.meetupAt,is_canceled:t.isCanceled??!1,spot_id:t.spotId,location:((i=t.location)==null?void 0:i.trim())||null,description:((n=t.description)==null?void 0:n.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((a=t.recurrenceRule)==null?void 0:a.trim())||null}).eq("id",e);if(r)throw r})}async function T(e){return d(async()=>{const{error:t}=await u.from("crew_meetup").delete().eq("id",e);if(t)throw t})}async function v(e){return d(async()=>{const{data:t,error:r}=await u.from("crew_meetup_attendance").select(`
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
      `).eq("meetup_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(M)})}async function j(e){return d(async()=>{const{data:t,error:r}=await u.from("crew_meetup_attendance").select(`
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
      `).eq("user_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(M)})}async function x(e,t){return d(async()=>{const{error:r}=await u.from("crew_meetup_attendance").update({attendance_status:t}).eq("id",e);if(r)throw r})}async function W(e,t){return d(async()=>{const{error:r}=await u.from("crew_meetup_attendance").update({memo:(t==null?void 0:t.trim())||null}).eq("id",e);if(r)throw r})}async function z(e){return d(async()=>{var r;const{error:t}=await u.rpc("upsert_crew_meetup_attendance",{p_meetup_id:e.meetupId,p_attendance_status:e.attendanceStatus,p_board_rental:e.boardRental,p_lesson_request:e.lessonRequest,p_memo:((r=e.memo)==null?void 0:r.trim())||null});if(t)throw t})}async function G(e){return d(async()=>{var r;const{error:t}=await u.from("crew_meetup_attendance").upsert({meetup_id:e.meetupId,user_id:e.userId,attendance_status:e.attendanceStatus,guest_participation:e.guestParticipation,board_rental:e.boardRental,lesson_request:e.lessonRequest,memo:((r=e.memo)==null?void 0:r.trim())||null},{onConflict:"meetup_id,user_id"});if(t)throw t})}async function H(e){return d(async()=>{const{error:t}=await u.rpc("cancel_crew_meetup_attendance",{p_meetup_id:e});if(t)throw t})}export{E as a,Y as b,j as c,O as d,k as e,v as f,H as g,N as h,U as i,P as j,B as k,F as l,T as m,x as n,G as o,W as p,z as u};
