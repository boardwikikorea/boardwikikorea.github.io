(function () {
  const S = document.currentScript;
  const BASE = ((S && S.dataset.base) || '/').replace(/\/+$/, '') + '/'; // 항상 끝에 /
  const LANGS = JSON.parse((S && S.dataset.langs) || '["ko","en"]');

  // 현재 언어 추론: BASE 이후 첫 세그먼트가 언어코드면 그걸로, 아니면 ko
  const pathAfterBase = location.pathname.startsWith(BASE)
    ? location.pathname.slice(BASE.length)
    : location.pathname.replace(/^\/+/, '');
  const seg = pathAfterBase.split('/').filter(Boolean)[0] || '';
  const currentLang = LANGS.includes(seg) ? seg : 'ko';

  function urlFor(lang) {
    // 각 언어의 홈으로 이동(하위 경로 유지 원하면 여기서 매핑 확장)
    return BASE + (lang === 'ko' ? '' : lang + '/');
  }

  // mount 대상
  let mount = document.getElementById('lang-switch');
  if (!mount) {
    mount = document.createElement('div');
    document.body.appendChild(mount);
  }

  // 임베디드 스타일(원하면 CSS로 분리)
  const style = document.createElement('style');
  style.textContent = `
    .bw-lang {
      position: fixed; right: 16px; top: 16px; z-index: 9999;
      background: rgba(255,255,255,.9); backdrop-filter: blur(6px);
      border: 1px solid #eee; border-radius: 999px; padding: 6px 10px;
      font: 14px/1.2 system-ui, -apple-system, "SF Pro", Pretendard, sans-serif;
    }
    .bw-lang a { text-decoration: none; padding: 6px 10px; border-radius: 999px; display: inline-block; color: inherit; }
    .bw-lang a[aria-current="true"] { font-weight: 700; border: 1px solid #ddd; }
    .bw-lang .sep { opacity:.4; margin: 0 2px; }
  `;
  document.head.appendChild(style);

  const LABEL = { ko: 'KO', en: 'EN', ja: 'JA', zh: 'ZH', fr: 'FR' };

  const nav = document.createElement('nav');
  nav.className = 'bw-lang';
  nav.setAttribute('aria-label', 'Language switcher');

  nav.innerHTML = LANGS.map((lang, idx) => {
    const href = urlFor(lang);
    const cur = (lang === currentLang);
    const a = `<a href="${href}" lang="${lang}" aria-label="${lang}" ${cur ? 'aria-current="true"' : ''}>${LABEL[lang] || lang.toUpperCase()}</a>`;
    return idx ? `<span class="sep">·</span>${a}` : a;
  }).join('');

  mount.replaceWith(nav);

  // 선택 언어 저장(선택)
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    try {
      const url = new URL(a.href, location.origin);
      const after = url.pathname.startsWith(BASE) ? url.pathname.slice(BASE.length) : url.pathname.replace(/^\/+/, '');
      const first = after.split('/').filter(Boolean)[0] || '';
      const lang = LANGS.includes(first) ? first : 'ko';
      localStorage.setItem('bw_pref_lang', lang);
    } catch (_) {}
  });
})();
