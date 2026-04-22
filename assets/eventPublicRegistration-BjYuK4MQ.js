import{w as r,s as i}from"./index-D-2Ju3Rp.js";async function o(n,e=[]){return r(async()=>{const{data:t,error:a}=await i.rpc("apply_event",{p_event_id:n,p_options:e.map(s=>({option_id:s.optionId,music_text:s.musicText??null,memo_text:s.memoText??null}))});if(a)throw a;return{registrationId:t}})}async function c(){return r(async()=>{const{data:n,error:e}=await i.from("view_my_event_registrations").select(`
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
      `).order("registered_at",{ascending:!1});if(e)throw e;return n?n.map(t=>({registrationId:t.registration_id,registrationState:t.registration_state,registeredAt:t.registered_at,cancelRequested:t.cancel_requested,eventId:t.event_id,name:t.name,nameEn:t.name_en,startDate:t.start_date,endDate:t.end_date,thumbnailUrl:t.thumbnail_url})):[]})}async function d(n){return r(async()=>{const{data:e,error:t}=await i.from("view_my_event_registration_detail").select(`
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
      `).eq("registration_id",n).single();if(t)throw t;if(!e)throw new Error("REGISTRATION_NOT_FOUND");return{registrationId:e.registration_id,registrationState:e.registration_state,registeredAt:e.registered_at,cancelRequested:e.cancel_requested,event:{id:e.event_id,name:e.name,nameEn:e.name_en,startDate:e.start_date,endDate:e.end_date},applicant:{name:e.applicant_name,nickname:e.applicant_nickname,gender:e.applicant_gender,nationality:e.applicant_nationality,email:e.applicant_email,phone:e.applicant_phone,stance:e.applicant_stance},options:(e.options??[]).map(a=>({optionId:a.option_id,optionName:a.option_name,optionCategory:a.option_category,musicText:a.music_text,memoText:a.memo_text??null}))}})}async function p(n){return r(async()=>{const{data:e,error:t}=await i.from("event_public_participant_view").select(`
        registration_id,
        registered_at,
        profile_id,
        display_name,
        country_code,
        options
      `).eq("event_id",n).order("registered_at",{ascending:!0});if(t)throw t;return e?e.map(a=>({registrationId:a.registration_id,registeredAt:a.registered_at,profileId:a.profile_id,displayName:a.display_name,countryCode:a.country_code,options:a.options})):[]})}async function l(n){const{error:e}=await i.rpc("request_event_registration_cancel",{p_registration_id:n});if(e)throw e}export{c as a,o as b,d as c,p as f,l as r};
