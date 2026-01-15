import{g as r,s}from"./index-ExRcJppy.js";async function _(i,a=[]){return r(async()=>{const{data:t,error:e}=await s.rpc("apply_event",{p_event_id:i,p_options:a.map(n=>({option_id:n.optionId,music_text:n.musicText??null}))});if(e)throw e;return{registrationId:t}})}async function d(){return r(async()=>{const{data:i,error:a}=await s.from("view_my_event_registrations").select(`
        registration_id,
        registration_state,
        registered_at,

        event_id,
        name,
        name_en,
        start_date,
        end_date,
        thumbnail_url
      `).order("registered_at",{ascending:!1});if(a)throw a;return i?i.map(t=>({registrationId:t.registration_id,registrationState:t.registration_state,registeredAt:t.registered_at,eventId:t.event_id,name:t.name,nameEn:t.name_en,startDate:t.start_date,endDate:t.end_date,thumbnailUrl:t.thumbnail_url})):[]})}async function g(i){return r(async()=>{const{data:a,error:t}=await s.from("view_my_event_registration_detail").select(`
        registration_id,
        registration_state,
        registered_at,

        event_id,
        name,
        name_en,
        start_date,
        end_date,

        option_id,
        option_name,
        option_category,
        music_text
      `).eq("registration_id",i);if(t)throw t;if(!a||a.length===0)throw new Error("REGISTRATION_NOT_FOUND");const e=a[0];return{registrationId:e.registration_id,registrationState:e.registration_state,registeredAt:e.registered_at,event:{id:e.event_id,name:e.name,nameEn:e.name_en,startDate:e.start_date,endDate:e.end_date},options:a.filter(n=>n.option_id).map(n=>({optionId:n.option_id,optionName:n.option_name,optionCategory:n.option_category,musicText:n.music_text}))}})}export{_ as a,g as b,d as f};
