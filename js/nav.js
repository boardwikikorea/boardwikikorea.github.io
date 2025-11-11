document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('menuToggle');
  const gnb = document.getElementById('gnb');

  if(!btn || !gnb) return;

  function openMenu(){
    gnb.classList.add('open');
    document.body.classList.add('menu-open');
    btn.setAttribute('aria-expanded','true');

    // 첫 포커스 대상
    const first = gnb.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    (first || gnb).focus({preventScroll:true});
    // ESC 핸들
    document.addEventListener('keydown', onKeydown);
    // 바깥 클릭 방지(필요 시 주석)
    // document.addEventListener('click', onOutsideClick, true);
  }

  function closeMenu(){
    gnb.classList.remove('open');
    document.body.classList.remove('menu-open');
    btn.setAttribute('aria-expanded','false');
    btn.focus({preventScroll:true});
    document.removeEventListener('keydown', onKeydown);
    // document.removeEventListener('click', onOutsideClick, true);
  }

  function toggleMenu(){
    if(gnb.classList.contains('open')) closeMenu();
    else openMenu();
  }

  function onKeydown(e){
    if(e.key === 'Escape') closeMenu();
    if(e.key === 'Tab'){
      // 간단 포커스 트랩
      const focusables = gnb.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if(!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length-1];
      if(e.shiftKey && document.activeElement === first){
        e.preventDefault(); last.focus();
      }else if(!e.shiftKey && document.activeElement === last){
        e.preventDefault(); first.focus();
      }
    }
  }

  // 필요 시 오버레이 외부 클릭 닫기
  // function onOutsideClick(e){
  //   if(!gnb.contains(e.target) && e.target !== btn) closeMenu();
  // }

  btn.addEventListener('click', toggleMenu);
});
