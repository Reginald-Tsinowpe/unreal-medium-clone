function Apply_Search_Function() {
    if (window.matchMedia("(max-width: 480px)").matches) {  
        let bgCover = document.getElementById("bg-cover-main");
        let body = document.body;

        document.getElementById("search-div").addEventListener("click", function() {
            bgCover.classList.toggle("show");
            body.classList.toggle("no-scroll"); // Prevent scrolling

        });
    }
}

Apply_Search_Function();
window.addEventListener("resize", Apply_Search_Function);
