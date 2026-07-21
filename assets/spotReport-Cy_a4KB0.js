import{w as i,a as o}from"./index-C_OxZ6-l.js";import{c as _}from"./spot-C3Uy9gCy.js";const c=`
  id,
  status,
  spot_payload,
  message,
  admin_note,
  applied_spot_id,
  reviewed_by,
  reviewed_at,
  created_by,
  created_at,
  updated_at
`;function n(e){const t=(e??"").trim();return t||null}function s(e,t){const r=String(e??"").trim();if(!r)throw new Error(`${t} is required`);return r}function u(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function l(e){return{id:e.id,status:e.status,spotPayload:e.spot_payload??{},message:e.message,adminNote:e.admin_note,appliedSpotId:e.applied_spot_id,reviewedBy:e.reviewed_by,reviewedAt:e.reviewed_at,createdBy:e.created_by,createdAt:e.created_at,updatedAt:e.updated_at}}async function d(){const{data:{session:e}}=await o.auth.getSession();return(e==null?void 0:e.user.id)??null}function f(e){return{name:s(e.name,"Spot name"),address:s(e.address,"Spot address"),addressDetail:n(e.addressDetail)??"",googleMapUrl:n(e.googleMapUrl),description:n(e.description)??"",thumbnailUrl:null,status:"approved",lat:u(e.lat),lon:u(e.lon),floor:n(e.floor),light:null,parking:null,toilet:null,roof:e.roof??!1}}async function g(e){return i(async()=>{const t=await d();if(!t)throw new Error("로그인한 멤버만 제보할 수 있습니다.");const r=e.spotPayload??{};s(r.name,"Spot name"),s(r.address,"Spot address");const{data:a,error:p}=await o.from("spot_report").insert({spot_payload:r,message:n(e.message),created_by:t}).select(c).single();if(p)throw p;return l(a)})}async function y(e){return i(async()=>{let t=o.from("spot_report").select(c).order("created_at",{ascending:!1});e&&(t=t.eq("status",e));const{data:r,error:a}=await t;if(a)throw a;return(r??[]).map(l)})}async function S(e){return i(async()=>{if(e.status!=="pending")throw new Error("Only pending reports can be approved");const t=await _(f(e.spotPayload)),r=await d(),{error:a}=await o.from("spot_report").update({status:"approved",applied_spot_id:t,reviewed_by:r,reviewed_at:new Date().toISOString()}).eq("id",e.id);if(a)throw a;return t})}async function b(e,t){return i(async()=>{const r=await d(),{error:a}=await o.from("spot_report").update({status:"rejected",admin_note:n(t),reviewed_by:r,reviewed_at:new Date().toISOString()}).eq("id",e);if(a)throw a})}export{S as a,g as c,y as f,b as r};
