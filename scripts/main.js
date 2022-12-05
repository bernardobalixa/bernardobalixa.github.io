const NAV_OPT = {
    MAIN: "MAIN",
    SKILLS: "SKILLS",
    CONTACT: "CONTACT",
    ABOUT: "ABOUT"
}

window.onload = () => {
    initializeLinesContent();
    
    loadLinesNumbers();

    showEditorTimer();

    document.querySelectorAll("#editor .content_bar .side_bar .files_bar .nav_bar li").forEach((el, i) => {
        
        el.addEventListener("mouseenter", e => {
            el.classList.add("hover");
        });
        el.addEventListener("mouseout", e => {
            el.classList.remove("hover");
        });
        el.addEventListener("mousedown", e => {
            el.classList.add("active");
        });
        el.addEventListener("mouseup", e => {
            el.classList.remove("active");
        });

        document.querySelectorAll("#editor .content_bar .side_bar .files_bar .nav_bar li").item(i).addEventListener("click", e => {
            handleNavChange(Object.values(NAV_OPT)[i]);
        });
    });
};