function changeCurrPage(type) {
    document.querySelectorAll("#editor .content_bar .side_bar .files_bar .nav_bar li").forEach((el, i) => {
        if (i == Object.values(NAV_OPT).indexOf(type)) {
            el.style.backgroundColor = "#3f3f3f";
        } else {
            el.style.backgroundColor = "#2f2f30";
        }
    });

    document.querySelector("#editor .content_bar .code_bar .raw_code_bar .lines_code_bar").innerHTML = '';

    var lineEl;
    for (var line = 1; line <= 30; line++) {
        lineEl = document.createElement("span");
        lineEl.classList.add("line");
        
        if (linesContent[type].some(e => e.l == line)) {
            var content = linesContent[type].find(e => e.l == line).val;
            lineEl.appendChild(content);
        }
        document.querySelector("#editor .content_bar .code_bar .raw_code_bar .lines_code_bar").appendChild(lineEl);
    }
}

function handleNavChange(type) {
    document.querySelectorAll("#editor .content_bar .code_bar .files_bar ul li").forEach((el, i) => {
        if (i == Object.values(NAV_OPT).indexOf(type)) {
            el.style.animation = "width150pxAnim .6s ease-in-out 0s 1 normal forwards";
        } else {
            el.style.animation = "none";
        }
    });
    changeCurrPage(type);
}