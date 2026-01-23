import{w as c,s as r}from"./index-DRB21cY6.js";async function o(i){return c(async()=>{var e;const{data:n,error:t}=await r.from("profile").select(`
        nickname,
        full_name,
        birth_date,
        gender,
        stance,
        nationality,
        contact_email,
        contact_phone,
        contact_phone_country,
        region
      `).eq("id",i).maybeSingle();if(t)throw t;return n?{id:i,name:n.full_name??"",nickname:n.nickname??"",gender:n.gender,stance:n.stance,nationality:n.nationality,email:n.contact_email??"",phone:n.contact_phone??"",address:((e=n.region)==null?void 0:e.address)??""}:null})}async function f(i,n){return c(async()=>{const t={};"nickname"in n&&(t.nickname=n.nickname??null),"fullName"in n&&(t.full_name=n.fullName??null),"birthDate"in n&&(t.birth_date=n.birthDate??null),"gender"in n&&(t.gender=n.gender??null),"stance"in n&&(t.stance=n.stance??null),"nationality"in n&&(t.nationality=n.nationality),"contactEmail"in n&&(t.contact_email=n.contactEmail??null),"contactPhoneCountry"in n&&(t.contact_phone_country=n.contactPhoneCountry??null),"contactPhone"in n&&(t.contact_phone=n.contactPhone??null),"region"in n&&(t.region=n.region);const{error:e}=await r.from("profile").update(t).eq("id",i);if(e)throw e})}export{o as f,f as u};
