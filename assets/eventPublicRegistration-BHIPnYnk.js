import{w as r,d as i}from"./index-DGm0JRlk.js";import{n as s,a as _,E as c}from"./eventRegistrationInput-Bins0hFZ.js";function o(a){return a.map(t=>({option_id:t.optionId,music_text:s(t.musicText,c)??null,memo_text:s(t.memoText,_)??null}))}async function l(a,t=[]){return r(async()=>{const{data:e,error:n}=await i.rpc("apply_event",{p_event_id:a,p_options:o(t)});if(n)throw n;return{registrationId:e}})}async function m(a,t=[]){return r(async()=>{const{error:e}=await i.rpc("update_my_event_registration",{p_registration_id:a,p_options:o(t)});if(e)throw e})}async function g(){return r(async()=>{const{data:a,error:t}=await i.from("view_my_event_registrations").select(`
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
      `).order("registered_at",{ascending:!1});if(t)throw t;return a?a.map(e=>({registrationId:e.registration_id,registrationState:e.registration_state,registeredAt:e.registered_at,cancelRequested:e.cancel_requested,eventId:e.event_id,name:e.name,nameEn:e.name_en,startDate:e.start_date,endDate:e.end_date,thumbnailUrl:e.thumbnail_url})):[]})}async function u(a){return r(async()=>{const{data:t,error:e}=await i.from("view_my_event_registrations").select("registration_id").eq("event_id",a).neq("registration_state","rejected").limit(1).maybeSingle();if(e)throw e;return!!t})}async function y(a){return r(async()=>{const{data:t,error:e}=await i.from("view_my_event_registration_detail").select(`
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
      `).eq("registration_id",a).single();if(e)throw e;if(!t)throw new Error("REGISTRATION_NOT_FOUND");return{registrationId:t.registration_id,registrationState:t.registration_state,registeredAt:t.registered_at,cancelRequested:t.cancel_requested,event:{id:t.event_id,name:t.name,nameEn:t.name_en,startDate:t.start_date,endDate:t.end_date},applicant:{name:t.applicant_name,nickname:t.applicant_nickname,gender:t.applicant_gender,nationality:t.applicant_nationality,email:t.applicant_email,phone:t.applicant_phone,stance:t.applicant_stance},options:(t.options??[]).map(n=>({optionId:n.option_id,optionName:n.option_name,optionCategory:n.option_category,musicText:n.music_text,memoText:n.memo_text??null}))}})}async function f(a){return r(async()=>{const{data:t,error:e}=await i.from("event_public_participant_view").select(`
        registration_id,
        registered_at,
        profile_id,
        display_name,
        country_code,
        options
      `).eq("event_id",a).order("registered_at",{ascending:!0});if(e)throw e;return t?t.map(n=>({registrationId:n.registration_id,registeredAt:n.registered_at,profileId:n.profile_id,displayName:n.display_name,countryCode:n.country_code,options:n.options})):[]})}async function v(a){const{error:t}=await i.rpc("request_event_registration_cancel",{p_registration_id:a});if(t)throw t}export{y as a,l as b,f as c,g as f,u as h,v as r,m as u};
