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
});
