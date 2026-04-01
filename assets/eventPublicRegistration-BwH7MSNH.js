import{w as r,s as i}from"./index-DASy3-L-.js";async function o(n,t=[]){return r(async()=>{const{data:e,error:a}=await i.rpc("apply_event",{p_event_id:n,p_options:t.map(s=>({option_id:s.optionId,music_text:s.musicText??null}))});if(a)throw a;return{registrationId:e}})}async function c(){return r(async()=>{const{data:n,error:t}=await i.from("view_my_event_registrations").select(`
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
      `).order("registered_at",{ascending:!1});if(t)throw t;return n?n.map(e=>({registrationId:e.registration_id,registrationState:e.registration_state,registeredAt:e.registered_at,cancelRequested:e.cancel_requested,eventId:e.event_id,name:e.name,nameEn:e.name_en,startDate:e.start_date,endDate:e.end_date,thumbnailUrl:e.thumbnail_url})):[]})}async function d(n){return r(async()=>{const{data:t,error:e}=await i.from("view_my_event_registration_detail").select(`
        registration_id,
        registration_state,
        registered_at,
        cancel_requested,

        event_id,
        name,
        name_en,
        start_date,
        end_date,

        applicant_name,
        applicant_nickname,
        applicant_gender,
        applicant_nationality,
        applicant_email,
        applicant_phone,
        applicant_stance,

        options
      `).eq("registration_id",n).single();if(e)throw e;if(!t)throw new Error("REGISTRATION_NOT_FOUND");return{registrationId:t.registration_id,registrationState:t.registration_state,registeredAt:t.registered_at,cancelRequested:t.cancel_requested,event:{id:t.event_id,name:t.name,nameEn:t.name_en,startDate:t.start_date,endDate:t.end_date},applicant:{name:t.applicant_name,nickname:t.applicant_nickname,gender:t.applicant_gender,nationality:t.applicant_nationality,email:t.applicant_email,phone:t.applicant_phone,stance:t.applicant_stance},options:(t.options??[]).map(a=>({optionId:a.option_id,optionName:a.option_name,optionCategory:a.option_category,musicText:a.music_text}))}})}async function p(n){return r(async()=>{const{data:t,error:e}=await i.from("event_public_participant_view").select(`
        registration_id,
        registered_at,
        profile_id,
        display_name,
        country_code,
        options
      `).eq("event_id",n).order("registered_at",{ascending:!0});if(e)throw e;return t?t.map(a=>({registrationId:a.registration_id,registeredAt:a.registered_at,profileId:a.profile_id,displayName:a.display_name,countryCode:a.country_code,options:a.options})):[]})}async function l(n){const{error:t}=await i.rpc("request_event_registration_cancel",{p_registration_id:n});if(t)throw t}export{o as a,c as b,d as c,p as f,l as r};
