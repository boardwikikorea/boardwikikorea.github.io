import{w as c,a as u}from"./index-C_IEX-OC.js";function y(e){return Array.isArray(e)?e[0]??null:e}function m(e){return Array.isArray(e)?e[0]??null:e}function p(e){const t=m(e.spot),r=m((t==null?void 0:t.location)??null);return{id:e.id,crewId:e.crew_id,title:e.title,meetupAt:e.meetup_at,isCanceled:e.is_canceled??!1,attendanceCount:0,spotId:e.spot_id,obotaSpotId:(r==null?void 0:r.id)??null,spotName:(r==null?void 0:r.name)??null,spotAddress:[r==null?void 0:r.address,r==null?void 0:r.address_detail].filter(Boolean).join(" ")||null,googleMapUrl:(r==null?void 0:r.google_map_url)??null,spotLat:(r==null?void 0:r.lat)??null,spotLon:(r==null?void 0:r.lon)??null,location:e.location,description:e.description,guestParticipationUse:e.guest_participation_use,boardRentalUse:e.board_rental_use,lessonRequestUse:e.lesson_request_use,recurrenceRule:e.recurrence_rule,createdAt:e.created_at,updatedAt:e.updated_at}}function f(e){const t=y(e.profile);return{id:e.id,meetupId:e.meetup_id,userId:e.user_id,attendanceStatus:e.attendance_status,guestParticipation:e.guest_participation,boardRental:e.board_rental,lessonRequest:e.lesson_request,memo:e.memo,createdAt:e.created_at,updatedAt:e.updated_at,nickname:(t==null?void 0:t.nickname)??null,fullName:(t==null?void 0:t.full_name)??null,provider:(t==null?void 0:t.provider)??"unknown"}}const g=`
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
`;async function w(e){if(e.length===0)return e;const t=e.map(a=>a.id),r=new Map,{data:s,error:n}=await u.rpc("public_get_crew_meetup_attendance_counts",{p_meetup_ids:t});if(!n)(s??[]).forEach(a=>{r.set(a.meetup_id,Number(a.attendance_count)||0)});else{const{data:a,error:i}=await u.from("crew_meetup_attendance").select("meetup_id").in("meetup_id",t).eq("attendance_status","attend");if(i)throw i;(a??[]).forEach(d=>{r.set(d.meetup_id,(r.get(d.meetup_id)??0)+1)})}return e.map(a=>({...a,attendanceCount:r.get(a.id)??0}))}function M(){return{thisMonth:0,thisYear:0,total:0}}function b(e,t=new Date){const r=t.getFullYear(),s=t.getMonth(),n={};return e.forEach(a=>{if(a.is_canceled)return;const i=new Date(a.meetup_at);if(Number.isNaN(i.getTime())||i.getTime()>t.getTime())return;const d=n[a.crew_id]??M();d.total+=1,i.getFullYear()===r&&(d.thisYear+=1,i.getMonth()===s&&(d.thisMonth+=1)),n[a.crew_id]=d}),n}function S(e=new Date){const t=new Date(e.getFullYear(),e.getMonth(),1),r=new Date(e.getFullYear(),e.getMonth()+1,1),s=new Date(e.getFullYear(),0,1),n=new Date(e.getFullYear()+1,0,1);return{monthStart:t.toISOString(),monthEnd:r.toISOString(),yearStart:s.toISOString(),yearEnd:n.toISOString()}}function C(e=new Date){return new Date(e.getFullYear(),e.getMonth(),e.getDate()).toISOString()}function h(e=new Date){const t=new Date(e.getFullYear(),e.getMonth()-1,1),r=new Date(e.getFullYear(),e.getMonth()+1,1);return{start:t.toISOString(),end:r.toISOString()}}async function A(e){return c(async()=>{const{data:t,error:r}=await u.from("crew_meetup").select(g).eq("crew_id",e).order("meetup_at",{ascending:!1});if(r)throw r;return w((t??[]).map(p))})}async function q(e){return e.length===0?new Set:c(async()=>{const t=h(),{data:r,error:s}=await u.from("crew_meetup").select("crew_id").in("crew_id",e).or("is_canceled.eq.false,is_canceled.is.null").gte("meetup_at",t.start).lt("meetup_at",t.end);if(s)throw s;return new Set((r??[]).map(n=>n.crew_id))})}async function I(e){return(await q([e])).has(e)}async function D(){return c(async()=>{const{data:e,error:t}=await u.from("crew_meetup").select(g).gte("meetup_at",C()).order("meetup_at",{ascending:!0});if(t)throw t;return w((e??[]).map(p))})}async function E(e){return e.length===0?{}:c(async()=>{const t=S(),r={p_crew_ids:e,p_month_start:t.monthStart,p_month_end:t.monthEnd,p_year_start:t.yearStart,p_year_end:t.yearEnd},{data:s,error:n}=await u.rpc("public_get_crew_meetup_stats",r);if(!n)return(s??[]).reduce((_,o)=>(_[o.crew_id]={thisMonth:Number(o.this_month)||0,thisYear:Number(o.this_year)||0,total:Number(o.total)||0},_),{});const{data:a,error:i}=await u.rpc("get_crew_meetup_stats",r);if(!i)return(a??[]).reduce((_,o)=>(_[o.crew_id]={thisMonth:Number(o.this_month)||0,thisYear:Number(o.this_year)||0,total:Number(o.total)||0},_),{});const{data:d,error:l}=await u.from("crew_meetup").select("crew_id, meetup_at, is_canceled").in("crew_id",e).lte("meetup_at",new Date().toISOString());if(l)throw l;return b(d??[])})}async function U(e,t){return c(async()=>{var n,a,i;const{data:r,error:s}=await u.from("crew_meetup").insert({crew_id:e,title:t.title.trim(),meetup_at:t.meetupAt,is_canceled:t.isCanceled??!1,spot_id:t.spotId,location:((n=t.location)==null?void 0:n.trim())||null,description:((a=t.description)==null?void 0:a.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((i=t.recurrenceRule)==null?void 0:i.trim())||null}).select("id").single();if(s)throw s;return r.id})}async function Y(e,t){return t.length===0?[]:c(async()=>{const{data:r,error:s}=await u.from("crew_meetup").insert(t.map(n=>{var a,i,d;return{crew_id:e,title:n.title.trim(),meetup_at:n.meetupAt,is_canceled:n.isCanceled??!1,spot_id:n.spotId,location:((a=n.location)==null?void 0:a.trim())||null,description:((i=n.description)==null?void 0:i.trim())||null,guest_participation_use:n.guestParticipationUse,board_rental_use:n.boardRentalUse,lesson_request_use:n.lessonRequestUse,recurrence_rule:((d=n.recurrenceRule)==null?void 0:d.trim())||null}})).select("id").returns();if(s)throw s;return(r??[]).map(n=>n.id)})}async function N(e,t){return c(async()=>{var s,n,a;const{error:r}=await u.from("crew_meetup").update({title:t.title.trim(),meetup_at:t.meetupAt,is_canceled:t.isCanceled??!1,spot_id:t.spotId,location:((s=t.location)==null?void 0:s.trim())||null,description:((n=t.description)==null?void 0:n.trim())||null,guest_participation_use:t.guestParticipationUse,board_rental_use:t.boardRentalUse,lesson_request_use:t.lessonRequestUse,recurrence_rule:((a=t.recurrenceRule)==null?void 0:a.trim())||null}).eq("id",e);if(r)throw r})}async function k(e){return c(async()=>{const{error:t}=await u.from("crew_meetup").delete().eq("id",e);if(t)throw t})}async function O(e){return c(async()=>{const{data:t,error:r}=await u.from("crew_meetup_attendance").select(`
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
      `).eq("meetup_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(f)})}async function F(e){return c(async()=>{const{data:t,error:r}=await u.from("crew_meetup_attendance").select(`
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
      `).eq("user_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(f)})}async function P(e,t){return c(async()=>{const{error:r}=await u.from("crew_meetup_attendance").update({attendance_status:t}).eq("id",e);if(r)throw r})}async function B(e,t){return c(async()=>{const{error:r}=await u.from("crew_meetup_attendance").update({memo:(t==null?void 0:t.trim())||null}).eq("id",e);if(r)throw r})}async function T(e){return c(async()=>{var r;const{error:t}=await u.rpc("upsert_crew_meetup_attendance",{p_meetup_id:e.meetupId,p_attendance_status:e.attendanceStatus,p_board_rental:e.boardRental,p_lesson_request:e.lessonRequest,p_memo:((r=e.memo)==null?void 0:r.trim())||null});if(t)throw t})}async function v(e){return c(async()=>{var r;const{error:t}=await u.from("crew_meetup_attendance").upsert({meetup_id:e.meetupId,user_id:e.userId,attendance_status:e.attendanceStatus,guest_participation:e.guestParticipation,board_rental:e.boardRental,lesson_request:e.lessonRequest,memo:((r=e.memo)==null?void 0:r.trim())||null},{onConflict:"meetup_id,user_id"});if(t)throw t})}async function j(e){return c(async()=>{const{error:t}=await u.rpc("cancel_crew_meetup_attendance",{p_meetup_id:e});if(t)throw t})}export{O as a,q as b,j as c,A as d,F as e,D as f,E as g,I as h,N as i,Y as j,U as k,k as l,P as m,v as n,B as o,T as u};
