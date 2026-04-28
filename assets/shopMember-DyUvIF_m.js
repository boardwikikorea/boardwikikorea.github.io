import{w as i,s as o}from"./index-Cp0pT7o-.js";function c(t){return Array.isArray(t)?t[0]??null:t}function u(t){if(!t)return 0;const e=new Date(t).getTime();return Number.isFinite(e)?e:0}async function h(){return i(async()=>{const{data:t,error:e}=await o.from("shop_info").select(`
      id,
      instagram,
      homepage,
      blog,
      facebook,
      etc,
      location:location!shop_info_id_fkey (
        id,
        name,
        address,
        description,
        status,
        type,
        created_at,
        updated_at
      )
    `);if(e)throw e;return(t??[]).map(n=>{const s=c(n.location);return{id:n.id,name:(s==null?void 0:s.name)??n.id,address:(s==null?void 0:s.address)??null,description:(s==null?void 0:s.description)??null,status:(s==null?void 0:s.status)??null,type:(s==null?void 0:s.type)??null,createdAt:(s==null?void 0:s.created_at)??null,updatedAt:(s==null?void 0:s.updated_at)??null,instagram:n.instagram??null,homepage:n.homepage??null,blog:n.blog??null,facebook:n.facebook??null,etc:n.etc??null}}).sort((n,s)=>{const m=u(s.updatedAt??s.createdAt),p=u(n.updatedAt??n.createdAt),d=m-p;return d!==0?d:n.name.localeCompare(s.name)})})}async function _(t){return i(async()=>{const{data:e,error:a}=await o.from("shop_info").select(`
        id,
        instagram,
        homepage,
        blog,
        facebook,
        etc,
        location:location!shop_info_id_fkey (
          id,
          name,
          address,
          description,
          status,
          type,
          created_at,
          updated_at
        )
      `).eq("id",t).maybeSingle();if(a)throw a;if(!e)return null;const r=c(e.location);return{id:e.id,name:(r==null?void 0:r.name)??e.id,address:(r==null?void 0:r.address)??null,description:(r==null?void 0:r.description)??null,status:(r==null?void 0:r.status)??null,type:(r==null?void 0:r.type)??null,createdAt:(r==null?void 0:r.created_at)??null,updatedAt:(r==null?void 0:r.updated_at)??null,instagram:e.instagram??null,homepage:e.homepage??null,blog:e.blog??null,facebook:e.facebook??null,etc:e.etc??null}})}async function y(t){return i(async()=>{const{data:e,error:a}=await o.from("location").insert({name:t.name.trim(),address:t.address.trim(),description:t.description,status:t.status??"requested",type:"shop"}).select("id").single();if(a)throw a;const{error:r}=await o.from("shop_info").upsert({id:e.id,instagram:t.instagram,homepage:t.homepage,blog:t.blog,facebook:t.facebook,etc:t.etc},{onConflict:"id"});if(r)throw r;return e.id})}async function g(t,e){return i(async()=>{const{error:a}=await o.from("location").update({name:e.name.trim(),address:e.address,description:e.description,status:e.status,type:e.type}).eq("id",t);if(a)throw a;const{error:r}=await o.from("shop_info").update({instagram:e.instagram,homepage:e.homepage,blog:e.blog,facebook:e.facebook,etc:e.etc}).eq("id",t);if(r)throw r})}async function b(t,e){return i(async()=>{const{data:a,error:r}=await o.from("location").update({status:e}).eq("id",t).select("id,status");if(r)throw r;const n=(a??[])[0]??null;if(!n)throw new Error("Shop status was not updated. Check location row access or RLS policy.");return n.status})}function f(t){return Array.isArray(t)?t[0]??null:t}async function w(t){return i(async()=>{const{data:e,error:a}=await o.from("shop_member").select(`
        id,
        shop_id,
        user_id,
        role,
        created_at,
        profile:profile!shop_member_user_id_fkey (
          nickname,
          full_name,
          provider
        )
      `).eq("shop_id",t).order("created_at",{ascending:!1});if(a)throw a;return(e??[]).map(n=>{const s=f(n.profile);return{id:n.id,shopId:n.shop_id,userId:n.user_id,role:n.role,createdAt:n.created_at,nickname:(s==null?void 0:s.nickname)??null,fullName:(s==null?void 0:s.full_name)??null,provider:(s==null?void 0:s.provider)??"unknown"}})})}async function k(t){return i(async()=>{const{data:e,error:a}=await o.from("shop_member").select("shop_id").eq("user_id",t);if(a)throw a;return(e??[]).map(r=>r.shop_id)})}async function S(t,e){return i(async()=>{const{data:a,error:r}=await o.from("shop_member").select("id").eq("shop_id",t).eq("user_id",e).limit(1).maybeSingle();if(r)throw r;return!!a})}async function A(t,e,a="editor"){return i(async()=>{const{error:r}=await o.from("shop_member").upsert({shop_id:t,user_id:e,role:a},{onConflict:"shop_id,user_id"});if(r)throw r})}async function q(t,e){return i(async()=>{const{error:a}=await o.from("shop_member").delete().eq("shop_id",t).eq("user_id",e);if(a)throw a})}export{h as a,w as b,_ as c,y as d,g as e,k as f,A as g,S as h,q as r,b as u};
