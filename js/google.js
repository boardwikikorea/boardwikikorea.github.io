  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import {
    getAuth, GoogleAuthProvider,
    signInWithPopup, signOut, onAuthStateChanged
  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

  // ① 콘솔에서 복사한 config로 교체
  const firebaseConfig = {
        apiKey: "AIzaSyDDkghHYAD581-N3u8zUUsinS1F49P5xi0",
        authDomain: "boardwiki-e070e.firebaseapp.com",
        projectId: "boardwiki-e070e",
        storageBucket: "boardwiki-e070e.appspot.com",
        messagingSenderId: "301441212066",
        appId: "1:301441212066:web:1ffff5d8eccaaff11781fb",
        measurementId: "G-DZ52LV9MMG"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // ② UI 엘리먼트
  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');
  const me = document.getElementById('me');
  const mePhoto = document.getElementById('mePhoto');
  const meName = document.getElementById('meName');
  const meEmail = document.getElementById('meEmail');

  // ③ 로그인
  btnLogin.addEventListener('click', async () => {
    try {
      // 팝업 로그인 (리다이렉트도 가능하지만 팝업이 정적 사이트에서 편함)
      const cred = await signInWithPopup(auth, provider);
      console.log('login ok:', cred.user.uid);
    } catch (e) {
      console.error('login error', e);
      alert('로그인에 실패했습니다.');
    }
  });

  // ④ 로그아웃
  btnLogout.addEventListener('click', async () => {
    await signOut(auth);
  });

  // ⑤ 세션/상태 반영
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { displayName, email, photoURL } = user;
      mePhoto.src = photoURL || '';
      meName.textContent = displayName || '사용자';
      meEmail.textContent = email || '';
      me.style.display = '';
      btnLogout.style.display = '';
      btnLogin.style.display = 'none';
    } else {
      me.style.display = 'none';
      btnLogout.style.display = 'none';
      btnLogin.style.display = '';
    }
  });
