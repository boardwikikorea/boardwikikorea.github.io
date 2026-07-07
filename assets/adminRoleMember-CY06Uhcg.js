import{w as s,d}from"./index-DjjOJ5Ha.js";function w(t){const a=new Map;for(const e of t)if(a.has(e.user_id)||a.set(e.user_id,{userId:e.user_id,provider:e.provider??"unknown",profile:{nickname:e.nickname??null,fullName:e.full_name??null,birthDate:e.birth_date??null,gender:e.gender??null,stance:e.stance??null,nationality:e.nationality??null,contact:{email:e.contact_email??null,phoneCountry:e.contact_phone_country??null,phoneNumber:e.contact_phone??null},region:e.region??null,board:{deck:e.board_deck??null,truck:e.board_truck??null,wheel:e.board_wheel??null},avatarUrl:e.avatar_url??null,joinedAt:e.joined_at??null,updatedAt:e.updated_at??null},roles:[]}),e.role_id&&e.role_code){const r=a.get(e.user_id);r.roles.some(l=>l.code===e.role_code)||r.roles.push({id:e.role_id,code:e.role_code})}return Array.from(a.values())}const _=50;function i(t,a){const e=[];for(let r=0;r<t.length;r+=a)e.push(t.slice(r,r+a));return e}function m(t){return t==="male"||t==="female"?t:null}function h(t){return t==="regular"||t==="goofy"?t:null}async function g(){return s(async()=>{const{data:t,error:a}=await d.from("admin_role_member").select("user_id, provider, nickname, full_name, role_id, role_code");if(a)throw console.error("[fetchAdminRoleMemberRows]",a),a;const e=t??[];if(!e.length)return e;const r=Array.from(new Set(e.map(o=>o.user_id).filter(Boolean))),c=[];for(const o of i(r,_)){const{data:n,error:u}=await d.from("profile").select(`
          id,
          birth_date,
          gender,
          stance,
          nationality,
          contact_email,
          contact_phone,
          contact_phone_country,
          region,
          board_deck,
          board_truck,
          board_wheel,
          avatar_url,
          created_at,
          updated_at
        `).in("id",o);if(u)throw console.error("[fetchAdminRoleMemberRows:profile]",u),u;c.push(...n??[])}const l=new Map;for(const o of c)l.set(o.id,o);return e.map(o=>{const n=l.get(o.user_id);return{...o,birth_date:(n==null?void 0:n.birth_date)??null,gender:m((n==null?void 0:n.gender)??null),stance:h((n==null?void 0:n.stance)??null),nationality:(n==null?void 0:n.nationality)??null,contact_email:(n==null?void 0:n.contact_email)??null,contact_phone:(n==null?void 0:n.contact_phone)??null,contact_phone_country:(n==null?void 0:n.contact_phone_country)??null,region:(n==null?void 0:n.region)??null,board_deck:(n==null?void 0:n.board_deck)??null,board_truck:(n==null?void 0:n.board_truck)??null,board_wheel:(n==null?void 0:n.board_wheel)??null,avatar_url:(n==null?void 0:n.avatar_url)??null,joined_at:(n==null?void 0:n.created_at)??null,updated_at:(n==null?void 0:n.updated_at)??null}})})}export{g as f,w as n};
