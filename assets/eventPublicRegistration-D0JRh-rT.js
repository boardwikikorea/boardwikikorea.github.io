import{w as n,s as r}from"./index-BP12zf0o.js";async function d(a,t=[]){return n(async()=>{const{data:e,error:i}=await r.rpc("apply_event",{p_event_id:a,p_options:t.map(s=>({option_id:s.optionId,music_text:s.musicText??null}))});if(i)throw i;return{registrationId:e}})}async function _(){return n(async()=>{const{data:a,error:t}=await r.from("view_my_event_registrations").select(`
        registration_id,
        registration_state,
        registered_at,

        event_id,
        name,
        name_en,
        start_date,
        end_date,
        thumbnail_url
      `).order("registered_at",{ascending:!1});if(t)throw t;return a?a.map(e=>({registrationId:e.registration_id,registrationState:e.registration_state,registeredAt:e.registered_at,eventId:e.event_id,name:e.name,nameEn:e.name_en,startDate:e.start_date,endDate:e.end_date,thumbnailUrl:e.thumbnail_url})):[]})}async function c(a){return n(async()=>{const{data:t,error:e}=await r.from("view_my_event_registration_detail").select(`
        registration_id,
        registration_state,
        registered_at,

        event_id,
        name,
        name_en,
        start_date,
        end_date,

        options
      `).eq("registration_id",a).single();if(e)throw e;if(!t)throw new Error("REGISTRATION_NOT_FOUND");return{registrationId:t.registration_id,registrationState:t.registration_state,registeredAt:t.registered_at,event:{id:t.event_id,name:t.name,nameEn:t.name_en,startDate:t.start_date,endDate:t.end_date},options:(t.options??[]).map(i=>({optionId:i.option_id,optionName:i.option_name,optionCategory:i.option_category,musicText:i.music_text}))}})}async function p(a){return n(async()=>{const{data:t,error:e}=await r.from("event_public_participant_view").select(`
        registration_id,
        registered_at,
        profile_id,
        display_name,
        country_code,
        options
      `).eq("event_id",a).order("registered_at",{ascending:!0});if(e)throw e;return t?t.map(i=>({registrationId:i.registration_id,registeredAt:i.registered_at,profileId:i.profile_id,displayName:i.display_name,countryCode:i.country_code,options:i.options})):[]})}export{d as a,_ as b,c,p as f};
