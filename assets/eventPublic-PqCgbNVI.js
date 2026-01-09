import{K as n,L as s}from"./index-ublk6XVv.js";const o=t=>t?t.substring(0,10).replace(/-/g,"."):"",u=t=>t?o(t).substring(5):"",d=(t,e)=>!t||!e?"":`${o(t)} ~ ${u(e)}`,f=t=>{if(!t)return 0;const e=t.substring(0,10).replace(/\./g,"-"),r=new Date(e),a=new Date;r.setHours(0,0,0,0),a.setHours(0,0,0,0);const c=r.getTime()-a.getTime();return Math.ceil(c/(1e3*60*60*24))},i="event_public_view";async function m(){return n(async()=>{const{data:t,error:e}=await s.from(i).select(`
        id,
        name,
        name_en,
        country_code,
        start_date,
        end_date,
        registration_use,
        registration_start_at,
        registration_end_at,
        event_cate
      `).order("start_date",{ascending:!0});if(e)throw e;return t??[]})}async function g(t){return n(async()=>{const{data:e,error:r}=await s.from(i).select(`
        id,
        name,
        name_en,
        country_code,
        start_date,
        end_date,
        registration_use,
        registration_start_at,
        registration_end_at,
        event_cate
      `).eq("id",t).maybeSingle();if(r)throw r;return e})}export{d as a,g as b,f as c,m as f};
