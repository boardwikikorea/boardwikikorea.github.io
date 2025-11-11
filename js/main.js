document.addEventListener("DOMContentLoaded", () => {

    const appStoreBtn = document.querySelector(".obota_btn a:nth-child(2)"); // App Store 버튼
    const googlePlayBtn = document.querySelector(".obota_btn a:nth-child(3)"); // Google Play 버튼

    // OS 감지
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let osType = "";

    if (/android/i.test(userAgent)) {
        osType = "android";
    } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
        osType = "mac";
    } else if (/Windows|Win64|Win32/i.test(userAgent)) {
        osType = "windows";
    }

    console.log(osType);
    /*
    // OS별 스토어 링크 설정
    if (osType === "android" || osType === "windows") {
        appStoreBtn.style.display = "none"; // 앱스토어 버튼 숨김
    } else if (osType === "mac") {
        googlePlayBtn.style.display = "none"; // 구글 플레이 버튼 숨김
    }
    */

    // 팝업 표시 조건

    /*
    const popup = document.getElementById("festivalPopup");
    const hideUntil = localStorage.getItem("hidePopupUntil");
    const now = new Date();

    if (!hideUntil || new Date(hideUntil) < now) {
      popup.style.display = "flex";
    }

    function goFestival() {
      window.open("https://boardwiki.kr/festival/", "_blank");
      popup.style.display = "none";
    }

    function closeToday() {
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0); // 오늘 자정까지 유효
      localStorage.setItem("hidePopupUntil", tomorrow.toISOString());
      popup.style.display = "none";
    }

      // 버튼 요소 찾기
    const goLinkBtn = popup.querySelector(".go-link");
    const closeTodayBtn = popup.querySelector(".close-today");

    if (goLinkBtn) goLinkBtn.addEventListener("click", goFestival);
    if (closeTodayBtn) closeTodayBtn.addEventListener("click", closeToday);
    */

});
