
(() => {
  // 파일 이름 패턴: "./winner2025_2_ (1).heic" ~ "(15).heic"
  const COUNT = 15;
  const base = "./winner2025_2_ ("; // 주의: 공백과 괄호 포함
  const ext  = ").heic";

  // 필요 시 다른 확장자 후보 추가 (브라우저 HEIC 미지원 대비)
  const candidates = ["heic", "jpg", "jpeg", "png", "webp"];

  const slider = document.getElementById("slider");
  const track  = document.getElementById("track");
  const dotsEl = document.getElementById("dots");
  const prev   = document.getElementById("prev");
  const next   = document.getElementById("next");
  const badge  = document.getElementById("badge");

  // 슬라이드 DOM 생성
  const sources = Array.from({length: COUNT}, (_,i) => `${base}${i+1}${ext}`);
  sources.forEach((src, idx) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.setAttribute("aria-label", `슬라이드 ${idx+1} / ${COUNT}`);

    // HEIC 미지원 대비: picture + 여러 source 시도
    const picture = document.createElement("picture");

    // 확장자 후보를 우선순위대로 추가 (원본 heic 포함)
    candidates.forEach(extName => {
      const s = document.createElement("source");
      const path = src.replace(/\.heic$/i, `.${extName}`);
      // 공백과 괄호 등 안전 처리
      s.srcset = encodeURI(path);
      // type은 힌트 정도로, 미지정해도 동작
      picture.appendChild(s);
    });

    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = `이미지 ${idx+1}`;
    img.src = encodeURI(src); // 기본은 원본 heic 경로
    picture.appendChild(img);

    slide.appendChild(picture);
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "dot" + (idx===0 ? " active" : "");
    dot.setAttribute("aria-label", `${idx+1}번으로 이동`);
    dot.addEventListener("click", () => goTo(idx));
    dotsEl.appendChild(dot);
  });

  const slideCount = COUNT;
  let index = 0;
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let translateX = 0;
  let autoplay = true;
  let autoTimer = null;

  function update() {
    const offset = -index * slider.clientWidth;
    track.style.transition = isDragging ? "none" : "";
    track.style.transform = `translate3d(${offset + translateX}px,0,0)`;

    dotsEl.querySelectorAll(".dot").forEach((d,i) => {
      d.classList.toggle("active", i === index);
    });
  }

  function goTo(i) {
    index = Math.max(0, Math.min(slideCount-1, i));
    translateX = 0;
    update();
  }

  function nextSlide() { goTo(index + 1 >= slideCount ? 0 : index + 1); }
  function prevSlide() { goTo(index - 1 < 0 ? slideCount - 1 : index - 1); }

  // 버튼/키보드
  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);
  window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft")  prevSlide();
    if (e.key.toLowerCase() === " ") { // 스페이스로 재생 토글
      e.preventDefault();
      autoplay = !autoplay;
      badge.innerHTML = `자동재생: <strong>${autoplay ? "ON" : "OFF"}</strong>`;
      restartAuto();
    }
  });

  // 드래그/스와이프
  const onDown = (x) => {
    isDragging = true;
    startX = x;
    currentX = x;
    translateX = 0;
    update();
    stopAuto();
  };
  const onMove = (x) => {
    if (!isDragging) return;
    currentX = x;
    translateX = currentX - startX;
    update();
  };
  const onUp = () => {
    if (!isDragging) return;
    const dx = currentX - startX;
    isDragging = false;
    const threshold = slider.clientWidth * 0.15;
    if (dx < -threshold) nextSlide();
    else if (dx > threshold) prevSlide();
    else { translateX = 0; update(); }
    restartAuto();
  };

  // 마우스
  slider.addEventListener("mousedown", e => onDown(e.clientX));
  window.addEventListener("mousemove", e => onMove(e.clientX));
  window.addEventListener("mouseup", onUp);

  // 터치
  slider.addEventListener("touchstart", e => onDown(e.touches[0].clientX), {passive:true});
  slider.addEventListener("touchmove",  e => onMove(e.touches[0].clientX),  {passive:true});
  slider.addEventListener("touchend", onUp);

  // 호버/포커스 시 자동재생 일시정지
  ["mouseenter","focusin"].forEach(ev => slider.addEventListener(ev, stopAuto));
  ["mouseleave","focusout"].forEach(ev => slider.addEventListener(ev, restartAuto));

  // 리사이즈 대응
  window.addEventListener("resize", () => { translateX = 0; update(); });

  // 자동재생
  function startAuto() {
    if (autoTimer || !autoplay) return;
    autoTimer = setInterval(nextSlide, 3500);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  }
  function restartAuto() { stopAuto(); startAuto(); }

  // 초기화
  update();
  startAuto();
})();