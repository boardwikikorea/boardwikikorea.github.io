import{w as i,e as s}from"./index-DZbUchKv.js";function g(t){const o=new Map;for(const e of t)if(o.has(e.user_id)||o.set(e.user_id,{userId:e.user_id,provider:e.provider??"unknown",profile:{nickname:e.nickname??null,fullName:e.full_name??null,birthDate:e.birth_date??null,gender:e.gender??null,stance:e.stance??null,nationality:e.nationality??null,contact:{email:e.contact_email??null,phoneCountry:e.contact_phone_country??null,phoneNumber:e.contact_phone??null},region:e.region??null,avatarUrl:e.avatar_url??null,joinedAt:e.joined_at??null,updatedAt:e.updated_at??null},roles:[]}),e.role_id&&e.role_code){const r=o.get(e.user_id);r.roles.some(l=>l.code===e.role_code)||r.roles.push({id:e.role_id,code:e.role_code})}return Array.from(o.values())}const d=50;function _(t,o){const e=[];for(let r=0;r<t.length;r+=o)e.push(t.slice(r,r+o));return e}function m(t){return t==="male"||t==="female"?t:null}function h(t){return t==="regular"||t==="goofy"?t:null}async function p(){return i(async()=>{const{data:t,error:o}=await s.from("admin_role_member").select("user_id, provider, nickname, full_name, role_id, role_code");if(o)throw console.error("[fetchAdminRoleMemberRows]",o),o;const e=t??[];if(!e.length)return e;const r=Array.from(new Set(e.map(a=>a.user_id).filter(Boolean))),c=[];for(const a of _(r,d)){const{data:n,error:u}=await s.from("profile").select(`
          id,
          birth_date,
          gender,
          stance,
          nationality,
          contact_email,
          contact_phone,
          contact_phone_country,
          region,
          avatar_url,
          created_at,
          updated_at
        `).in("id",a);if(u)throw console.error("[fetchAdminRoleMemberRows:profile]",u),u;c.push(...n??[])}const l=new Map;for(const a of c)l.set(a.id,a);return e.map(a=>{const n=l.get(a.user_id);return{...a,birth_date:(n==null?void 0:n.birth_date)??null,gender:m((n==null?void 0:n.gender)??null),stance:h((n==null?void 0:n.stance)??null),nationality:(n==null?void 0:n.nationality)??null,contact_email:(n==null?void 0:n.contact_email)??null,contact_phone:(n==null?void 0:n.contact_phone)??null,contact_phone_country:(n==null?void 0:n.contact_phone_country)??null,region:(n==null?void 0:n.region)??null,avatar_url:(n==null?void 0:n.avatar_url)??null,joined_at:(n==null?void 0:n.created_at)??null,updated_at:(n==null?void 0:n.updated_at)??null}})})}export{p as f,g as n};
