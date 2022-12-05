const TAG_TYPES = {
    OPEN: "OPEN",
    CLOSE: "CLOSE",
    OPEN_CLOSE: "OPEN_CLOSE"
}

let linesContent = {};

function renderTag(tag, type, content) {
    var openTag = document.createElement("span"), closeTag = document.createElement("span"),
        tagName = document.createElement("span"), tagContent = document.createElement("span"),
        finalEl = document.createElement("span");

    openTag.classList.add("open_close_tag"); closeTag.classList.add("open_close_tag");
    openTag.innerText = "<"; closeTag.innerText = ">";

    tagName.classList.add("name_tag");
    tagName.innerText = tag;

    if (type == TAG_TYPES.OPEN_CLOSE) {
        tagContent.classList.add("content_tag");
        tagContent.innerText = content;

        finalEl.appendChild(openTag);
        finalEl.appendChild(tagName);
        finalEl.appendChild(closeTag);
        finalEl.appendChild(tagContent);
        openTag.innerText = "</";
        finalEl.appendChild(openTag);
        finalEl.appendChild(tagName);
        finalEl.appendChild(closeTag);
    } else if (type == TAG_TYPES.OPEN) {
        finalEl.appendChild(openTag);
        finalEl.appendChild(tagName);
        finalEl.appendChild(closeTag);
    } else if (type == TAG_TYPES.CLOSE) {
        openTag.innerText = "</";
        finalEl.appendChild(openTag);
        finalEl.appendChild(tagName);
        finalEl.appendChild(closeTag);
    }

    return finalEl;
}

function initializeLinesContent() {
    linesContent = {
        [NAV_OPT.MAIN]: [
            { l: 1, val: renderTag("html", TAG_TYPES.OPEN) },
            { l: 30, val: renderTag("html", TAG_TYPES.CLOSE) }
        ],
        [NAV_OPT.SKILLS]: [
            { l: 3, val: renderTag("html", TAG_TYPES.OPEN) }
        ],
        [NAV_OPT.CONTACT]: [
            { l: 7, val: renderTag("html", TAG_TYPES.OPEN) }
        ],
        [NAV_OPT.ABOUT]: [
            { l: 5, val: renderTag("html", TAG_TYPES.OPEN) }
        ],
    }
}