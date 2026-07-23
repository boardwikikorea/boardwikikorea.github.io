import{w as o,a as r}from"./index-DDY3M5uM.js";import{n as d,a as m,E as g}from"./eventRegistrationInput-Bins0hFZ.js";const f=`
  id,
  event_id,
  profile_id,
  state,
  source,
  deleted_at,
  created_at,

  applicant:event_registration_profile (
    id,
    name,
    nickname,
    gender,
    nationality,
    email,
    phone,
    stance
  ),

  options:event_registration_option (
    id,
    music_text,
    memo_text,
    event_option (
      id,
      name,
      name_i18n,
      code,
      option_category,
      gender_type,
      round_type,
      music_request_use,
      memo_use,
      countable
    )
  ),

  cancel:event_registration_cancel (
    id,
    status,
    requested_at
  )
`,E=`
  id,
  event_id,
  profile_id,
  state,
  source,
  deleted_at,
  created_at,

  applicant:event_registration_profile (
    id,
    name,
    nickname,
    gender,
    nationality,
    email,
    phone,
    stance
  ),

  options:event_registration_option (
    id,
    music_text,
    event_option (
      id,
      name,
      code,
      option_category,
      gender_type,
      round_type,
      music_request_use,
      countable
    )
  ),

  cancel:event_registration_cancel (
    id,
    status,
    requested_at
  )
`;function l(t){return t.map(e=>({option_id:e.optionId,music_text:d(e.musicText,g)??null,memo_text:d(e.memoText,m)??null}))}function u(t){const e=String((t==null?void 0:t.message)??"");return e.includes("schema cache")||e.includes("column")?e.includes("memo_text")||e.includes("memo_use")||e.includes("name_i18n"):!1}async function T(t){return o(async()=>{let e=null,n=null;const a=await r.from("event_registration").select(f).eq("event_id",t).is("deleted_at",null).order("created_at",{ascending:!1});if(!a.error)e=a.data;else if(u(a.error)){const i=await r.from("event_registration").select(E).eq("event_id",t).is("deleted_at",null).order("created_at",{ascending:!1});e=i.data,n=i.error}else n=a.error;if(n)throw n;return(e??[]).map(i=>{var s,c,_;return{id:i.id,event_id:i.event_id,profile_id:i.profile_id??null,state:i.state,source:i.source??"user",created_at:i.created_at,deleted_at:i.deleted_at??null,applicant:Array.isArray(i.applicant)?i.applicant[0]??null:i.applicant??null,options:i.options??[],cancelRequested:((s=i.cancel)==null?void 0:s.some(p=>p.status==="requested"))??!1,cancelId:((_=(c=i.cancel)==null?void 0:c[0])==null?void 0:_.id)??null}})})}async function h(t){return o(async()=>{const e=await r.from("event_option").select("id,name,name_i18n,option_category,gender_type,music_request_use,memo_use").eq("event_id",t).order("sort_order").order("created_at");if(!e.error)return e.data??[];if(!u(e.error))throw e.error;const n=await r.from("event_option").select("id,name,option_category,gender_type,music_request_use").eq("event_id",t).order("sort_order").order("created_at");if(n.error)throw n.error;return(n.data??[]).map(a=>({...a,memo_use:!1}))})}async function R(t,e){return o(async()=>{const{error:n}=await r.from("event_registration").update({state:e}).eq("id",t);if(n)throw n})}async function q(t,e){return o(async()=>{const{error:n}=await r.rpc("process_event_registration_cancel",{p_registration_id:t,p_action:e});if(n)throw n})}async function M(t,e){return o(async()=>{const{data:n,error:a}=await r.rpc("admin_create_event_registration",{p_event_id:t,p_applicant:e.applicant??{},p_options:l(e.options??[])});if(a)throw a;return n})}async function S(t,e){return o(async()=>{const{error:n}=await r.rpc("admin_update_event_registration",{p_registration_id:t,p_state:e.state??null,p_applicant:e.applicant??null,p_options:e.options?l(e.options):null});if(n)throw n})}async function x(t){return o(async()=>{const{error:e}=await r.rpc("admin_delete_event_registration",{p_registration_id:t});if(e)throw e})}export{x as a,S as b,M as c,h as d,T as f,q as p,R as u};
