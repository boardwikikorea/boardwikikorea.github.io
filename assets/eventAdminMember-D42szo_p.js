import{w as d,s}from"./index-BgEOpAfx.js";function m(e){return Array.isArray(e)?e[0]??null:e}async function c(e){return d(async()=>{const{data:n,error:r}=await s.from("event_admin_member").select(`
        id,
        event_id,
        user_id,
        role,
        created_at,
        profile:profile!event_admin_member_user_id_fkey (
          nickname,
          full_name,
          provider
        )
      `).eq("event_id",e).order("created_at",{ascending:!1});if(r)throw r;return(n??[]).map(i=>{const a=m(i.profile);return{id:i.id,eventId:i.event_id,userId:i.user_id,role:i.role,createdAt:i.created_at,nickname:(a==null?void 0:a.nickname)??null,fullName:(a==null?void 0:a.full_name)??null,provider:(a==null?void 0:a.provider)??"unknown"}})})}async function u(e){return d(async()=>{const{data:n,error:r}=await s.from("event_admin_member").select("event_id").eq("user_id",e);if(r)throw r;return(n??[]).map(t=>t.event_id)})}async function _(e,n){return d(async()=>{const[r,t]=await Promise.all([s.from("event").select("id").eq("id",e).eq("created_by",n).limit(1).maybeSingle(),s.from("event_admin_member").select("id").eq("event_id",e).eq("user_id",n).limit(1).maybeSingle()]);if(r.error)throw r.error;if(t.error)throw t.error;return!!r.data||!!t.data})}async function f(e,n,r="manager"){return d(async()=>{const{error:t}=await s.from("event_admin_member").upsert({event_id:e,user_id:n,role:r},{onConflict:"event_id,user_id"});if(t)throw t})}async function v(e,n){return d(async()=>{const{error:r}=await s.from("event_admin_member").delete().eq("event_id",e).eq("user_id",n);if(r)throw r})}export{u as a,c as f,f as g,_ as h,v as r};
