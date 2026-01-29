import{w as r,s as n}from"./index-B-n-r55W.js";async function _(a,e=[]){return r(async()=>{const{data:t,error:i}=await n.rpc("apply_event",{p_event_id:a,p_options:e.map(s=>({option_id:s.optionId,music_text:s.musicText??null}))});if(i)throw i;return{registrationId:t}})}async function d(){return r(async()=>{const{data:a,error:e}=await n.from("view_my_event_registrations").select(`
        registration_id,
        registration_state,
        registered_at,
        cancel_requested,
        event_id,
        name,
        name_en,
        start_date,
        end_date,
        thumbnail_url
      `).order("registered_at",{ascending:!1});if(e)throw e;return a?a.map(t=>({registrationId:t.registration_id,registrationState:t.registration_state,registeredAt:t.registered_at,cancelRequested:t.cancel_requested,eventId:t.event_id,name:t.name,nameEn:t.name_en,startDate:t.start_date,endDate:t.end_date,thumbnailUrl:t.thumbnail_url})):[]})}async function c(a){return r(async()=>{const{data:e,error:t}=await n.from("view_my_event_registration_detail").select(`
        registration_id,
        registration_state,
        registered_at,

        event_id,
        name,
        name_en,
        start_date,
        end_date,

        options,
        cancel_requested
      `).eq("registration_id",a).single();if(t)throw t;if(!e)throw new Error("REGISTRATION_NOT_FOUND");return{registrationId:e.registration_id,registrationState:e.registration_state,registeredAt:e.registered_at,cancelRequested:e.cancel_requested,event:{id:e.event_id,name:e.name,nameEn:e.name_en,startDate:e.start_date,endDate:e.end_date},options:(e.options??[]).map(i=>({optionId:i.option_id,optionName:i.option_name,optionCategory:i.option_category,musicText:i.music_text}))}})}async function g(a){return r(async()=>{const{data:e,error:t}=await n.from("event_public_participant_view").select(`
        registration_id,
        registered_at,
        profile_id,
        display_name,
        country_code,
        options
      `).eq("event_id",a).order("registered_at",{ascending:!0});if(t)throw t;return e?e.map(i=>({registrationId:i.registration_id,registeredAt:i.registered_at,profileId:i.profile_id,displayName:i.display_name,countryCode:i.country_code,options:i.options})):[]})}async function p(a){const{error:e}=await n.rpc("request_event_registration_cancel",{p_registration_id:a});if(e)throw e}export{_ as a,d as b,c,g as f,p as r};
