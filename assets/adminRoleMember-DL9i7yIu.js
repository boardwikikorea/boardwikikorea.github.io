import{w as i,d as s}from"./index-KNfjx_GS.js";function g(e){const o=new Map;for(const t of e)if(o.has(t.user_id)||o.set(t.user_id,{userId:t.user_id,provider:t.provider??"unknown",profile:{nickname:t.nickname??null,fullName:t.full_name??null,birthDate:t.birth_date??null,gender:t.gender??null,stance:t.stance??null,nationality:t.nationality??null,contact:{email:t.contact_email??null,phoneCountry:t.contact_phone_country??null,phoneNumber:t.contact_phone??null},region:t.region??null,avatarUrl:t.avatar_url??null,joinedAt:t.joined_at??null,updatedAt:t.updated_at??null},roles:[]}),t.role_id&&t.role_code){const r=o.get(t.user_id);r.roles.some(l=>l.code===t.role_code)||r.roles.push({id:t.role_id,code:t.role_code})}return Array.from(o.values())}const d=50;function _(e,o){const t=[];for(let r=0;r<e.length;r+=o)t.push(e.slice(r,r+o));return t}function m(e){return e==="male"||e==="female"?e:null}function h(e){return e==="regular"||e==="goofy"?e:null}async function p(){return i(async()=>{const{data:e,error:o}=await s.from("admin_role_member").select("user_id, provider, nickname, full_name, role_id, role_code");if(o)throw console.error("[fetchAdminRoleMemberRows]",o),o;const t=e??[];if(!t.length)return t;const r=Array.from(new Set(t.map(a=>a.user_id).filter(Boolean))),c=[];for(const a of _(r,d)){const{data:n,error:u}=await s.from("profile").select(`
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
        `).in("id",a);if(u)throw console.error("[fetchAdminRoleMemberRows:profile]",u),u;c.push(...n??[])}const l=new Map;for(const a of c)l.set(a.id,a);return t.map(a=>{const n=l.get(a.user_id);return{...a,birth_date:(n==null?void 0:n.birth_date)??null,gender:m((n==null?void 0:n.gender)??null),stance:h((n==null?void 0:n.stance)??null),nationality:(n==null?void 0:n.nationality)??null,contact_email:(n==null?void 0:n.contact_email)??null,contact_phone:(n==null?void 0:n.contact_phone)??null,contact_phone_country:(n==null?void 0:n.contact_phone_country)??null,region:(n==null?void 0:n.region)??null,avatar_url:(n==null?void 0:n.avatar_url)??null,joined_at:(n==null?void 0:n.created_at)??null,updated_at:(n==null?void 0:n.updated_at)??null}})})}export{p as f,g as n};
