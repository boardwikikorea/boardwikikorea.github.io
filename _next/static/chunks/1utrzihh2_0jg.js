(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,71710,e=>{"use strict";var t=e.i(43476),i=e.i(90891);e.i(66563);var r=e.i(67405);e.i(56791);var n=e.i(29603),a=e.i(18335),s=e.i(66027),o=e.i(71645),c=e.i(15929),d=e.i(67594),l=e.i(21404);e.s(["default",0,function(){let{onMyLink:e}=(0,i.useMyPageBack)(),{locale:u,t:m}=(0,l.useLocale)(),p=(0,n.getMyPoliciesCopy)(u),[h,y]=(0,o.useState)(null),f=(0,s.useQuery)({queryKey:["policy-documents",u],queryFn:()=>(0,r.fetchPolicyDocuments)(d.supabase,u),retry:!1});return(0,t.jsx)("main",{className:"launch-screen",children:(0,t.jsxs)("section",{className:"launch-card my-events policies-page",children:[(0,t.jsxs)("header",{children:[(0,t.jsx)(c.Link,{href:"/my",onClick:e,"aria-label":(0,a.getPrivacySettingsCopy)(u).back,children:"‹"}),(0,t.jsx)("h1",{children:m("more.privacy")}),(0,t.jsx)("span",{})]}),(0,t.jsxs)("div",{className:"my-events__scroll",children:[(0,t.jsx)("p",{className:"policies-page__description",children:p.documents}),f.isPending?(0,t.jsx)("p",{role:"status",children:m("terms.contentLoading")}):null,f.isError?(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{role:"alert",className:"terms-error",children:m("terms.loadError")}),(0,t.jsx)("button",{type:"button",disabled:f.isFetching,onClick:()=>void f.refetch(),children:m("auth.retry")})]}):null,f.data?.map(e=>(0,t.jsxs)("article",{className:"policies-page__document",children:[(0,t.jsx)("h2",{children:(0,t.jsxs)("button",{type:"button","aria-expanded":h===e.id,"aria-controls":`policy-${e.id}`,onClick:()=>y(h===e.id?null:e.id),children:[e.title,(0,t.jsx)("span",{"aria-hidden":"true",children:h===e.id?"−":"+"})]})}),(0,t.jsx)("div",{id:`policy-${e.id}`,hidden:h!==e.id,className:"policies-page__body",children:e.content.trim()||m("terms.contentEmpty")})]},e.id)),(0,t.jsx)(c.Link,{className:"policies-page__consent",href:"/terms?manage=1",children:p.consent})]})]})})}])},67405,e=>{"use strict";let t=new Set(["privacy","membership","account_deletion"]),i={service:{ko:"서비스 이용약관",en:"Terms of Service",ja:"サービス利用規約","zh-CN":"服务条款","zh-TW":"服務條款",es:"Términos del servicio",fr:"Conditions d’utilisation",ru:"Условия использования"},membership:{ko:"개인정보 수집 및 이용 동의",en:"Privacy and data use consent",ja:"個人情報の収集および利用への同意","zh-CN":"个人信息收集与使用同意","zh-TW":"個人資料蒐集與使用同意",es:"Consentimiento de privacidad y uso de datos",fr:"Consentement à la confidentialité et à l’utilisation des données",ru:"Согласие на обработку персональных данных"},account_deletion:{ko:"회원 탈퇴 안내",en:"Withdrawal and account deletion",ja:"退会およびアカウント削除","zh-CN":"注销及账户删除说明","zh-TW":"退會及帳戶刪除說明",es:"Baja y eliminación de la cuenta",fr:"Résiliation et suppression du compte",ru:"Выход и удаление аккаунта"},marketing:{ko:"마케팅 수신 동의",en:"Marketing communications consent",ja:"マーケティング受信同意","zh-CN":"营销信息接收同意","zh-TW":"行銷資訊接收同意",es:"Consentimiento de comunicaciones comerciales",fr:"Consentement aux communications marketing",ru:"Согласие на маркетинговые сообщения"}},r={ko:{service:`시행일: 2026년 9월 1일

제1조 목적
본 약관은 BoardWiki Korea가 제공하는 OBOTA 및 BoardWiki 서비스의 이용 조건과 회원 및 운영자의 권리\xb7의무를 정합니다.

제2조 서비스
서비스는 보드 문화 관련 장소, 게시물, 크루, 모임, 이벤트, 활동 기록, 알림 및 상담 기능을 제공합니다. 일부 기능은 로그인, 위치 권한 또는 별도 동의가 필요합니다.

제3조 회원 가입과 계정
회원은 정확한 정보를 제공하고 자신의 계정과 로그인 수단을 안전하게 관리해야 합니다. 타인의 정보를 사용하거나 계정을 양도\xb7대여할 수 없습니다. 소셜 로그인 제공자의 정책과 장애로 로그인이 제한될 수 있습니다.

제4조 이용자의 의무
이용자는 법령과 본 약관을 준수해야 하며, 타인의 권리를 침해하거나 불법\xb7유해 정보, 스팸, 사칭, 괴롭힘, 부정확한 행사\xb7장소 정보, 악성 코드 등을 게시해서는 안 됩니다. 서비스 운영을 방해하거나 허가 없이 정보를 자동 수집해서도 안 됩니다.

제5조 이용자 콘텐츠와 외부 콘텐츠
이용자는 자신이 게시한 콘텐츠에 필요한 권리를 보유해야 합니다. 서비스 운영자는 서비스 제공, 표시, 신고 처리 및 백업에 필요한 범위에서 해당 콘텐츠를 처리할 수 있습니다. 외부 링크와 이용자 작성 정보의 정확성\xb7안전성은 별도로 확인해야 하며, 권리 침해 신고가 접수되면 콘텐츠가 제한될 수 있습니다.

제6조 크루\xb7모임\xb7이벤트
크루, 모임 및 이벤트의 일정, 참가 조건, 비용, 안전 수칙은 각 운영자가 정할 수 있습니다. 이용자는 참가 전 내용을 확인하고 자신의 건강\xb7장비\xb7현장 안전을 판단해야 합니다. 서비스는 이용자 또는 외부 운영자 사이의 오프라인 활동 당사자가 아닙니다.

제7조 서비스 변경과 제한
점검, 보안, 장애, 법령 또는 운영상 필요에 따라 서비스의 일부가 변경\xb7중단될 수 있습니다. 긴급한 경우 사전 안내 없이 조치할 수 있으며, 가능한 범위에서 서비스 내 공지로 안내합니다.

제8조 이용 제한
약관이나 법령 위반, 다른 이용자 보호 또는 서비스 보안을 위해 게시물 숨김, 기능 제한, 계정 정지 또는 해지 조치를 할 수 있습니다. 중대한 위반이 아니라면 가능한 범위에서 사유와 이의 제기 방법을 안내합니다.

제9조 책임의 범위
서비스는 관련 법령이 허용하는 범위에서 천재지변, 통신 장애, 이용자 과실, 외부 서비스 또는 이용자 간 거래\xb7활동으로 발생한 손해에 책임을 지지 않습니다. 운영자의 고의 또는 중대한 과실로 인한 책임은 제한하지 않습니다.

제10조 탈퇴와 분쟁
회원은 앱의 마이 → 계정에서 계정 삭제를 요청할 수 있습니다. 본 약관에 정하지 않은 사항은 대한민국 법령과 상관례를 따르며, 분쟁은 당사자 간 협의를 우선합니다.

서비스 문의는 앱의 상담하기 또는 Instagram @board.wiki를 이용해 주세요.`,membership:`시행일: 2026년 9월 1일

BoardWiki Korea는 회원 식별과 서비스 제공을 위해 소셜 로그인 식별자와 이메일, 이름\xb7닉네임\xb7국가\xb7생년월일 등 프로필 정보, 게시물\xb7신고\xb7크루\xb7모임\xb7이벤트 이용 기록, 푸시 토큰, 앱 버전, 오류\xb7이용 기록 및 사용자가 허용한 위치 정보를 처리합니다.

정보는 로그인, 프로필과 커뮤니티 기능, 크루\xb7모임\xb7이벤트 운영, 알림, 상담, 안전 및 품질 개선에 이용합니다. 현재 위치는 권한이 있을 때 지도 탐색에 사용하며, 백그라운드 위치는 사용자가 LIVE를 직접 켜고 별도 안내에 동의한 경우에만 사용합니다.

개인정보는 계정 삭제 시까지 보유하며 법적 보존 의무가 있는 정보는 해당 기간 동안 분리 보관합니다. Supabase, Google Firebase, Expo, Apple\xb7Google\xb7Kakao가 인증, 저장, 알림, 분석 및 소셜 로그인 제공에 필요한 범위에서 정보를 처리할 수 있습니다. 개인정보를 판매하지 않습니다.

이용자는 앱에서 프로필과 권한을 확인\xb7변경하고 계정 삭제를 요청할 수 있습니다. 문의와 권리 행사는 앱의 상담하기 또는 Instagram @board.wiki를 이용해 주세요.`,account_deletion:`앱에서 마이 → 계정 → 회원 탈퇴를 선택하면 삭제를 요청할 수 있습니다.

삭제가 완료되면 계정과 직접 연결된 프로필 및 인증 정보는 복구할 수 없습니다. 법적 보존 의무가 있는 정보와 다른 이용자의 권리 보호에 필요한 기록은 정해진 기간 동안 분리 보관될 수 있습니다.`,marketing:`마케팅 수신 동의는 선택 사항입니다.

동의하면 OBOTA 및 BoardWiki의 신규 기능, 이벤트, 캠페인, 제휴 활동과 혜택 안내를 앱 푸시 또는 동의한 연락 수단으로 받을 수 있습니다. 안내에는 계정 식별 정보, 선택 언어\xb7국가 및 서비스 이용 상태가 발송 대상 구분을 위해 사용될 수 있습니다.

동의하지 않아도 핵심 서비스를 이용할 수 있으며, 앱의 알림 및 개인정보 설정이나 운영체제 알림 설정에서 언제든 수신을 거부할 수 있습니다. 철회 전 발송된 안내에는 철회 효력이 소급되지 않습니다.`},en:{service:`Effective date: September 1, 2026

1. Purpose
These Terms govern use of OBOTA and BoardWiki services provided by BoardWiki Korea.

2. Service
The service provides board-culture places, posts, crews, meetups, events, activity records, notifications, and support. Some features require sign-in, permissions, or separate consent.

3. Accounts
Members must provide accurate information and protect their accounts. Accounts may not be transferred, lent, impersonated, or used with another person's information.

4. Acceptable use
Users must follow applicable law and may not infringe rights, post illegal or harmful content, spam, impersonate, harass, publish knowingly false event or place information, distribute malicious code, disrupt the service, or scrape data without permission.

5. User and third-party content
Users must hold the rights needed for content they submit. We may process that content as needed to operate, display, back up, and moderate the service. Users should independently verify external links and user-submitted information. Reported or infringing content may be restricted.

6. Crews, meetups, and events
Organizers may set schedules, participation rules, fees, and safety requirements. Participants are responsible for reviewing them and assessing their own health, equipment, and on-site safety. The service is not a party to offline activities between users or external organizers.

7. Changes and suspension
Features may change or become unavailable due to maintenance, security, outages, legal requirements, or operational needs. Urgent action may occur without advance notice.

8. Enforcement
We may hide content, restrict features, suspend, or terminate accounts to address violations, protect users, or secure the service. Where practicable, we will explain the reason and available appeal path.

9. Liability
To the extent permitted by law, we are not responsible for loss caused by force majeure, network failures, user fault, external services, or transactions and activities between users. Nothing excludes liability that cannot legally be limited.

10. Deletion and governing law
Users may request deletion under My → Account. Matters not covered here follow applicable laws of the Republic of Korea. Parties should first attempt to resolve disputes through discussion.

Contact us through in-app Support or Instagram @board.wiki.`,membership:`BoardWiki Korea processes social sign-in identifiers, email, profile details, service activity, push tokens, diagnostics, and permitted location data to provide authentication, community, crew and event features, notifications, support, safety, and service improvement.

Location is used only with permission. Background location is used only after the user turns on LIVE and accepts its separate disclosure. Data is retained until account deletion unless law requires longer retention.

Supabase, Google Firebase, Expo, Apple, Google, and Kakao may process data as needed for authentication, storage, notifications, analytics, updates, and social sign-in. We do not sell personal data. Users can update settings and request deletion in the app, and contact us through in-app Support or Instagram @board.wiki.`,account_deletion:"In the app, go to My → Account → Delete account. After deletion, profile and authentication data directly linked to the account cannot be recovered. Records required by law or needed to protect other users may be retained separately for the required period.",marketing:`Marketing consent is optional. If you consent, OBOTA and BoardWiki may send product updates, events, campaigns, partnerships, and benefits through app notifications or another channel you approved.

You can use the core service without consenting and may withdraw at any time in notification and privacy settings or operating-system notification settings. Withdrawal does not apply retroactively to messages already sent.`}};async function n(e,t){let{data:n,error:a}=await e.from("terms_version").select("id,version,type,is_required,title,title_i18n").eq("is_current",!0).order("is_required",{ascending:!1}).returns();if(a)throw a;if(!n?.length)return[];let{data:s,error:o}=await e.from("terms_content").select("terms_id,locale,content").in("terms_id",n.map(({id:e})=>e)).in("locale",Array.from(new Set([t,"ko","en"]))).returns();if(o)throw o;return n.map(e=>{var n;let a=("ko"===t?["ko","en"]:[t,"en","ko"]).map(t=>s?.find(i=>i.terms_id===e.id&&i.locale===t)).find(e=>e?.content?.trim());return{id:e.id,version:e.version,type:e.type,isRequired:e.is_required,title:e.title_i18n?.[t]??i[e.type]?.[t]??e.title_i18n?.en??i[e.type]?.en??e.title_i18n?.ko??e.title,content:a?.content?.trim()||(n=e.type,r["ko"===t?"ko":"en"][n]??"")}})}async function a(e,t){let{data:i,error:r}=await e.from("terms_version").select("id").eq("is_current",!0).eq("is_required",!0).returns();if(r)throw r;if(!i?.length)return!0;let{data:n,error:a}=await e.from("user_terms_agreement").select("terms_id,is_agreed").eq("user_id",t).eq("is_agreed",!0).in("terms_id",i.map(({id:e})=>e)).returns();if(a)throw a;let s=new Set(n?.map(({terms_id:e})=>e));return i.every(({id:e})=>s.has(e))}async function s(e,t,i){if(!i.length)return{};let{data:r,error:n}=await e.from("user_terms_agreement").select("terms_id,is_agreed").eq("user_id",t).in("terms_id",i).returns();if(n)throw n;return Object.fromEntries((r??[]).map(({terms_id:e,is_agreed:t})=>[e,t]))}async function o(e,t,i){let{error:r}=await e.from("user_terms_agreement").upsert(i.map(({termsId:e,isAgreed:i})=>({user_id:t,terms_id:e,is_agreed:i,agreed_at:new Date().toISOString()})),{onConflict:"user_id,terms_id"});if(r)throw r}async function c(e,t){let i;try{let r=await Promise.race([n(e,t),new Promise((e,t)=>{i=setTimeout(()=>t(Error("terms_timeout")),1e4)})]);if(!r.length)throw Error("terms_unavailable");return r}finally{i&&clearTimeout(i)}}e.s(["fetchCurrentTerms",0,n,"fetchPolicyDocuments",0,c,"fetchUserTermsAgreements",0,s,"hasAcceptedRequiredTerms",0,a,"isPrivacyTermsDocument",0,function(e){let i=e.type.toLowerCase();return i.includes("privacy")||t.has(i)},"saveTermsAgreements",0,o])}]);