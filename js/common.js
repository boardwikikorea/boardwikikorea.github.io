window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
});


document.addEventListener("DOMContentLoaded", () => {
    const readLinks = document.querySelectorAll(".read_link");

    readLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); 
            alert("준비중입니다.");
        });
    });

    setTimeout(() => {
        document.body.classList.add('load');
    }, 500);
});