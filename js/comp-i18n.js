// comp-i18n.js : 각 competition/slug 페이지에서 재사용
(function () {
  const S = document.currentScript;
  const DEFAULT = (S?.dataset.defaultLang || 'ko').toLowerCase();
  const JSON_BASE = (S?.dataset.jsonBase || './lng/').replace(/\/+$/, '') + '/';
  const LANGS = JSON.parse(S?.dataset.langs || '["ko","en"]');

  // 우선순위: ?lang=xx → localStorage → DEFAULT
  const params = new URLSearchParams(location.search);
  let lang = (params.get('lang') || localStorage.getItem('comp_pref_lang') || DEFAULT).toLowerCase();
  if (!LANGS.includes(lang)) lang = DEFAULT;

  // JSON fetch + 렌더
  fetch(`${JSON_BASE}${lang}.json`, { cache: 'no-store' })
    .then(r => r.json())
    .then(dict => {
      // text 치환
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = get(dict, key);
        if (val != null) el.innerText = val;
      });

      // 속성 치환: data-i18n-attr="attrName:key"
      document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const pairs = el.getAttribute('data-i18n-attr').split(',').map(s => s.trim());
        pairs.forEach(pair => {
          const [attr, key] = pair.split(':').map(s => s.trim());
          const val = get(dict, key);
          if (attr && val != null) el.setAttribute(attr, val);
        });
      });

      // <title>도 보강
      const t = get(dict, 'meta.title');
      if (t) document.title = t;

      // schedule 테이블 렌더(있을 때만)
      const sched = get(dict, 'schedule.items');
      const schedEl = document.getElementById('schedule');
      if (schedEl && Array.isArray(sched)) {
        schedEl.innerHTML = renderSchedule(sched, dict);
      }

      // 언어 선택 저장(상단 lang-switch.js가 있다면 함께 동작)
      try { localStorage.setItem('comp_pref_lang', lang); } catch (_) {}
    })
    .catch(err => console.error('i18n load error', err));

  function get(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : null), obj);
  }

  function renderSchedule(items, dict) {
    const thDate = get(dict, 'schedule.th.date') || '날짜';
    const thTime = get(dict, 'schedule.th.time') || '시간';
    const thEvent = get(dict, 'schedule.th.event') || '종목';
    return `
      <table class="comp-table">
        <thead><tr><th>${thDate}</th><th>${thTime}</th><th>${thEvent}</th></tr></thead>
        <tbody>
          ${items.map(it => `
            <tr>
              <td>${it.date || ''}</td>
              <td>${it.time || ''}</td>
              <td>${it.event || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
})();
