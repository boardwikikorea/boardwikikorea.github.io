import{w as i,s as d}from"./index-g7ZWZPNc.js";function m(n){return Array.isArray(n)?n[0]??null:n}function u(n){if(!n)return 0;const e=new Date(n).getTime();return Number.isFinite(e)?e:0}async function _(){return i(async()=>{const{data:n,error:e}=await d.from("shop_info").select(`
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
    `);if(e)throw e;return(n??[]).map(s=>{const r=m(s.location);return{id:s.id,name:(r==null?void 0:r.name)??s.id,address:(r==null?void 0:r.address)??null,description:(r==null?void 0:r.description)??null,status:(r==null?void 0:r.status)??null,type:(r==null?void 0:r.type)??null,createdAt:(r==null?void 0:r.created_at)??null,updatedAt:(r==null?void 0:r.updated_at)??null,instagram:s.instagram??null,homepage:s.homepage??null,blog:s.blog??null,facebook:s.facebook??null,etc:s.etc??null}}).sort((s,r)=>{const c=u(r.updatedAt??r.createdAt),p=u(s.updatedAt??s.createdAt),o=c-p;return o!==0?o:s.name.localeCompare(r.name)})})}async function h(n){return i(async()=>{const{data:e,error:a}=await d.from("shop_info").select(`
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
      `).eq("id",n).maybeSingle();if(a)throw a;if(!e)return null;const t=m(e.location);return{id:e.id,name:(t==null?void 0:t.name)??e.id,address:(t==null?void 0:t.address)??null,description:(t==null?void 0:t.description)??null,status:(t==null?void 0:t.status)??null,type:(t==null?void 0:t.type)??null,createdAt:(t==null?void 0:t.created_at)??null,updatedAt:(t==null?void 0:t.updated_at)??null,instagram:e.instagram??null,homepage:e.homepage??null,blog:e.blog??null,facebook:e.facebook??null,etc:e.etc??null}})}async function y(n,e){return i(async()=>{const{error:a}=await d.from("location").update({name:e.name.trim(),address:e.address,description:e.description,status:e.status,type:e.type}).eq("id",n);if(a)throw a;const{error:t}=await d.from("shop_info").update({instagram:e.instagram,homepage:e.homepage,blog:e.blog,facebook:e.facebook,etc:e.etc}).eq("id",n);if(t)throw t})}function f(n){return Array.isArray(n)?n[0]??null:n}async function g(n){return i(async()=>{const{data:e,error:a}=await d.from("shop_admin_member").select(`
        id,
        shop_id,
        user_id,
        role,
        created_at,
        profile:profile!shop_admin_member_user_id_fkey (
          nickname,
          full_name,
          provider
        )
      `).eq("shop_id",n).order("created_at",{ascending:!1});if(a)throw a;return(e??[]).map(s=>{const r=f(s.profile);return{id:s.id,shopId:s.shop_id,userId:s.user_id,role:s.role,createdAt:s.created_at,nickname:(r==null?void 0:r.nickname)??null,fullName:(r==null?void 0:r.full_name)??null,provider:(r==null?void 0:r.provider)??"unknown"}})})}async function b(n){return i(async()=>{const{data:e,error:a}=await d.from("shop_admin_member").select("shop_id").eq("user_id",n);if(a)throw a;return(e??[]).map(t=>t.shop_id)})}async function A(n,e){return i(async()=>{const{data:a,error:t}=await d.from("shop_admin_member").select("id").eq("shop_id",n).eq("user_id",e).limit(1).maybeSingle();if(t)throw t;return!!a})}async function k(n,e,a="editor"){return i(async()=>{const{error:t}=await d.from("shop_admin_member").upsert({shop_id:n,user_id:e,role:a},{onConflict:"shop_id,user_id"});if(t)throw t})}async function w(n,e){return i(async()=>{const{error:a}=await d.from("shop_admin_member").delete().eq("shop_id",n).eq("user_id",e);if(a)throw a})}export{_ as a,g as b,h as c,b as f,k as g,A as h,w as r,y as u};
