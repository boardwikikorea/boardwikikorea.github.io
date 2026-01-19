import{w as i,s as r}from"./index-9HOJDHrW.js";async function _(n,t=[]){return i(async()=>{const{data:e,error:a}=await r.rpc("apply_event",{p_event_id:n,p_options:t.map(s=>({option_id:s.optionId,music_text:s.musicText??null}))});if(a)throw a;return{registrationId:e}})}async function d(){return i(async()=>{const{data:n,error:t}=await r.from("view_my_event_registrations").select(`
        registration_id,
        registration_state,
        registered_at,

        event_id,
        name,
        name_en,
        start_date,
        end_date,
        thumbnail_url
      `).order("registered_at",{ascending:!1});if(t)throw t;return n?n.map(e=>({registrationId:e.registration_id,registrationState:e.registration_state,registeredAt:e.registered_at,eventId:e.event_id,name:e.name,nameEn:e.name_en,startDate:e.start_date,endDate:e.end_date,thumbnailUrl:e.thumbnail_url})):[]})}async function g(n){return i(async()=>{const{data:t,error:e}=await r.from("view_my_event_registration_detail").select(`
        registration_id,
        registration_state,
        registered_at,

        event_id,
        name,
        name_en,
        start_date,
        end_date,

        options
      `).eq("registration_id",n).single();if(e)throw e;if(!t)throw new Error("REGISTRATION_NOT_FOUND");return{registrationId:t.registration_id,registrationState:t.registration_state,registeredAt:t.registered_at,event:{id:t.event_id,name:t.name,nameEn:t.name_en,startDate:t.start_date,endDate:t.end_date},options:(t.options??[]).map(a=>({optionId:a.option_id,optionName:a.option_name,optionCategory:a.option_category,musicText:a.music_text}))}})}export{_ as a,g as b,d as f};
