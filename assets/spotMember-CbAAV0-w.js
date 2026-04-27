import{w as a,s as i}from"./index-Bb7IuAAq.js";function c(e){return Array.isArray(e)?e[0]??null:e}async function u(e){return a(async()=>{const{data:t,error:r}=await i.from("spot_member").select(`
        id,
        spot_id,
        user_id,
        role,
        created_at,
        profile:profile!spot_member_user_id_fkey (
          nickname,
          full_name,
          provider
        )
      `).eq("spot_id",e).order("created_at",{ascending:!1});if(r)throw r;return(t??[]).map(o=>{const s=c(o.profile);return{id:o.id,spotId:o.spot_id,userId:o.user_id,role:o.role,createdAt:o.created_at,nickname:(s==null?void 0:s.nickname)??null,fullName:(s==null?void 0:s.full_name)??null,provider:(s==null?void 0:s.provider)??"unknown"}})})}async function m(e){return a(async()=>{const{data:t,error:r}=await i.from("spot_member").select("spot_id").eq("user_id",e);if(r)throw r;return(t??[]).map(n=>n.spot_id)})}async function _(e,t){return a(async()=>{const{data:r,error:n}=await i.from("spot_member").select("id").eq("spot_id",e).eq("user_id",t).limit(1).maybeSingle();if(n)throw n;return!!r})}async function p(e,t,r="editor"){return a(async()=>{const{error:n}=await i.from("spot_member").upsert({spot_id:e,user_id:t,role:r},{onConflict:"spot_id,user_id"});if(n)throw n})}async function f(e,t){return a(async()=>{const{error:r}=await i.from("spot_member").delete().eq("spot_id",e).eq("user_id",t);if(r)throw r})}export{u as a,m as f,p as g,_ as h,f as r};
