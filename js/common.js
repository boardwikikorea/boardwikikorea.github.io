window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
});


document.addEventListener("DOMContentLoaded", () => {
    const readLinks = document.querySelectorAll(".read_link");

    readLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // 링크의 기본 동작 방지
            alert("준비중입니다.");
        });
    });
});
