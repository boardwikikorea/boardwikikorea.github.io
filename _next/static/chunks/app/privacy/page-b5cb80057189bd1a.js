(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9877],{5463:(e,a,t)=>{"use strict";async function o(e,a=8e3){let t;try{return await Promise.race([Promise.resolve(e),new Promise((e,o)=>{t=setTimeout(()=>o(Error("timeout")),a)})])}finally{t&&clearTimeout(t)}}t.d(a,{w:()=>o})},50446:(e,a,t)=>{"use strict";t.d(a,{Q:()=>c});var o=t(53704),n=t(9755),s=t(20228),r=t(13197);let i={ko:"KO",en:"EN",ja:"JA","zh-CN":"CN","zh-TW":"TW",es:"ES",fr:"FR",ru:"RU"};function c({compact:e=!1,navigation:a=!1,className:t=""}){let{locale:l,setLocale:d,t:u}=(0,r.Y)(),[p,h]=(0,s.useState)(!1),m=n.mG[l],x=`Language: ${m}`;function y(){h(!1)}return(0,s.useEffect)(()=>{if(!p)return;let e=document.body.style.overflow;function a(e){"Escape"===e.key&&y()}return document.body.style.overflow="hidden",window.addEventListener("keydown",a),()=>{document.body.style.overflow=e,window.removeEventListener("keydown",a)}},[p]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("button",{"aria-haspopup":"dialog","aria-expanded":p,"aria-label":x,className:`locale-switcher${e?" locale-switcher--compact":""}${a?" locale-switcher--navigation user-bottom-nav__item":""}${t?` ${t}`:""}`,onClick:()=>h(!0),title:x,type:"button",children:[(0,o.jsxs)("svg",{"aria-hidden":"true",className:"locale-switcher__icon",viewBox:"0 0 24 24",children:[(0,o.jsx)("circle",{cx:"12",cy:"12",r:"9"}),(0,o.jsx)("path",{d:"M3 12h18M12 3c2.7 2.5 4 5.5 4 9s-1.3 6.5-4 9c-2.7-2.5-4-5.5-4-9s1.3-6.5 4-9Z"})]}),a?(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("span",{className:"locale-switcher__nav-label","aria-hidden":"true",children:["LANG : ",i[l]]})}):e?(0,o.jsx)("span",{className:"locale-switcher__code","aria-hidden":"true",children:i[l]}):(0,o.jsxs)("span",{className:"locale-switcher__copy",children:[(0,o.jsx)("strong",{children:"Choose your language"}),(0,o.jsxs)("small",{children:[m," \xb7 Language"]})]})]}),p?(0,o.jsx)("div",{className:"locale-dialog",onMouseDown:e=>{e.target===e.currentTarget&&y()},role:"presentation",children:(0,o.jsxs)("section",{"aria-labelledby":"locale-dialog-title","aria-modal":"true",className:"locale-dialog__panel",role:"dialog",children:[(0,o.jsxs)("header",{children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{children:"GLOBAL LANGUAGE"}),(0,o.jsx)("h2",{id:"locale-dialog-title",children:"Choose your language"}),(0,o.jsx)("span",{children:"Language \xb7 언어 \xb7 言語"})]}),(0,o.jsx)("button",{"aria-label":u("nav.close"),onClick:y,type:"button",children:(0,o.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]}),(0,o.jsx)("div",{className:"locale-dialog__options",children:n.O4.map(e=>(0,o.jsxs)("button",{"aria-pressed":l===e,lang:e,onClick:()=>{d(e),y()},type:"button",children:[(0,o.jsx)("span",{children:n.mG[e]}),(0,o.jsx)("small",{children:i[e]})]},e))})]})}):null]})}},66859:(e,a,t)=>{Promise.resolve().then(t.bind(t,73231))},73231:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>x});var o=t(53704),n=t(49204),s=t(27707),r=t.n(s),i=t(20228),c=t(50446),l=t(71167),d=t(13197),u=t(5463);let p={eyebrow:"OBOTA POLICY",title:"개인정보 처리방침",description:"OBOTA 및 BoardWiki 서비스에서 개인정보를 수집하고 이용하는 기준과 계정 삭제 방법을 안내합니다.",home:"홈으로 돌아가기"},h={eyebrow:"OBOTA POLICY",title:"Privacy Policy",description:"Learn how OBOTA and BoardWiki collect and use personal data and how to delete your account.",home:"Back to home"},m={ko:{membership:`시행일: 2026년 9월 1일

BoardWiki Korea는 OBOTA 및 BoardWiki 서비스 제공을 위해 다음 개인정보를 처리합니다.

1. 처리하는 정보
• 계정 정보: 소셜 로그인 식별자, 이메일 주소
• 프로필 정보: 이름, 닉네임, 국가, 생년월일 및 사용자가 선택해 입력한 프로필 정보
• 서비스 이용 정보: 게시물, 댓글, 신고, 크루\xb7모임\xb7이벤트 신청 및 참석 기록
• 기기 및 권한 정보: 푸시 토큰, 앱 버전, 오류\xb7이용 기록, 사용자가 허용한 위치 정보

2. 이용 목적
회원 식별과 로그인, 프로필 및 커뮤니티 기능 제공, 크루\xb7모임\xb7이벤트 운영, 알림 발송, 고객 문의 처리, 서비스 안전성\xb7품질 개선을 위해 이용합니다.

3. 위치 정보
지도 탐색에는 사용자가 허용한 현재 위치를 사용합니다. 백그라운드 위치는 사용자가 LIVE 기능을 직접 켜고 별도 안내에 동의한 경우에만 사용하며, LIVE 상태 표시와 안전한 활동 기록 제공에 한정합니다.

4. 보유 기간
개인정보는 회원 탈퇴 및 계정 삭제가 완료될 때까지 보유합니다. 관계 법령에 보존 의무가 있는 정보는 해당 기간 동안 분리 보관한 뒤 삭제합니다. 서비스 운영 기록은 목적 달성 후 지체 없이 삭제하거나 식별할 수 없도록 처리합니다.

5. 처리 위탁 및 국외 처리
서비스 운영을 위해 Supabase(인증\xb7데이터베이스\xb7파일), Google Firebase(푸시\xb7오류 및 이용 분석), Expo(앱 업데이트\xb7푸시 전송), Apple\xb7Google\xb7Kakao(소셜 로그인)를 이용할 수 있습니다. 각 제공자는 서비스 제공에 필요한 범위에서 정보를 처리합니다. 개인정보를 판매하지 않습니다.

6. 이용자의 권리
앱의 마이 페이지에서 프로필과 권한을 확인\xb7변경할 수 있으며, 계정 삭제를 요청할 수 있습니다. 문의와 권리 행사는 앱의 상담하기 또는 Instagram @board.wiki를 이용해 주세요.

7. 보호 조치
접근 권한 제한, 전송 구간 암호화, 데이터베이스 접근 정책, 운영 기록 점검 등 합리적인 기술적\xb7관리적 보호 조치를 적용합니다.

정책이 변경되면 서비스 내 공지 또는 이 페이지를 통해 시행 전에 안내합니다.`,account_deletion:`앱에서 마이 → 계정 → 회원 탈퇴를 선택하면 삭제를 요청할 수 있습니다. 웹에서는 계정 삭제 안내 페이지를 이용할 수 있습니다.

삭제가 완료되면 계정과 직접 연결된 프로필 및 인증 정보는 복구할 수 없습니다. 법적 보존 의무가 있는 정보와 다른 이용자의 권리 보호에 필요한 기록은 정해진 기간 동안 분리 보관될 수 있습니다.`},en:{membership:`Effective date: September 1, 2026

BoardWiki Korea processes personal data to provide OBOTA and BoardWiki.

1. Data we process
• Account data: social sign-in identifier and email address
• Profile data: name, nickname, country, birth date, and optional profile details
• Service data: posts, comments, reports, crew and event applications, and attendance records
• Device and permission data: push token, app version, diagnostics, usage records, and location when permitted

2. Purposes
We use this data for authentication, profiles and community features, crew and event operations, notifications, support, safety, and service improvement.

3. Location
Current location is used for map discovery only with permission. Background location is used only after the user turns on LIVE and accepts the separate disclosure, and only to provide LIVE status and activity records.

4. Retention
Personal data is retained until account deletion, unless a longer period is required by law. Operational records are deleted or de-identified when no longer needed.

5. Service providers and international processing
We may use Supabase for authentication, database, and files; Google Firebase for notifications, diagnostics, and analytics; Expo for app updates and notifications; and Apple, Google, and Kakao for social sign-in. They process data only as needed to provide these services. We do not sell personal data.

6. Your choices and rights
You can review or update profile and permission settings and request account deletion in the app. Contact us through in-app Support or Instagram @board.wiki.

7. Security
We use reasonable safeguards including access controls, encrypted transmission, database access policies, and operational monitoring.

Material changes will be announced in the service or on this page before they take effect.`,account_deletion:`In the app, go to My → Account → Delete account. You can also use the account deletion information page on the web.

After deletion, profile and authentication data directly linked to the account cannot be recovered. Records required by law or necessary to protect other users may be retained separately for the required period.`}};function x(){let{locale:e,t:a}=(0,d.Y)(),t="ko"===e?p:h,[s,x]=(0,i.useState)([]),[y,b]=(0,i.useState)(!0),[f,g]=(0,i.useState)(""),v=(0,i.useMemo)(()=>s.filter(n.zAx),[s]);return(0,i.useEffect)(()=>{let t=!0;return queueMicrotask(()=>{t&&(b(!0),g(""))}),(0,u.w)((0,n.t$9)(l.N,e),8e3).then(e=>{t&&x(e)}).catch(()=>{t&&g(a("terms.loadError"))}).finally(()=>{t&&b(!1)}),()=>{t=!1}},[e,a]),(0,o.jsx)("main",{className:"terms-screen policy-screen",children:(0,o.jsxs)("section",{className:"terms-card policy-card",children:[(0,o.jsxs)("header",{className:"terms-header policy-header",children:[(0,o.jsxs)("div",{className:"terms-header__utility",children:[(0,o.jsx)("p",{className:"eyebrow",children:t.eyebrow}),(0,o.jsx)(c.Q,{compact:!0})]}),(0,o.jsx)("h1",{children:t.title}),(0,o.jsx)("p",{children:t.description})]}),(0,o.jsxs)("div",{className:"terms-scroll policy-content",children:[y?(0,o.jsx)("p",{children:a("terms.contentLoading")}):null,f?(0,o.jsx)("p",{role:"alert",className:"terms-error",children:f}):null,y||f||0!==v.length?null:(0,o.jsx)("p",{children:a("terms.contentEmpty")}),v.map(a=>(0,o.jsxs)("article",{className:"policy-document",children:[(0,o.jsx)("h2",{children:a.title}),(0,o.jsxs)("p",{className:"policy-version",children:["Version ",a.version]}),(0,o.jsx)("div",{className:"terms-body",children:function(e,a){if(e.content.trim())return e.content;let t=a?m.ko:m.en;return"account_deletion"===e.type?t.account_deletion:t.membership}(a,"ko"===e)})]},a.id))]}),(0,o.jsx)("footer",{className:"terms-footer policy-footer",children:(0,o.jsx)(r(),{href:"/",children:t.home})})]})})}}},e=>{e.O(0,[9384,1319,3871,9675,3628,5351,3939,7707,891,9151,2171,6488,7358],()=>e(e.s=66859)),_N_E=e.O()}]);