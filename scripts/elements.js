function loadLinesNumbers() {
    for (var l = 1; l <= 30; l++) {
        var line = document.createElement("span");
        line.classList.add("line");
        line.innerText = l;
        document.querySelector("#editor .content_bar .code_bar .raw_code_bar .lines_bar").appendChild(line);
    }
}