var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define("constants", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NavOptions = exports.TagTypes = void 0;
    var TagTypes;
    (function (TagTypes) {
        TagTypes[TagTypes["OPEN"] = 0] = "OPEN";
        TagTypes[TagTypes["CLOSE"] = 1] = "CLOSE";
        TagTypes[TagTypes["OPEN_CLOSE"] = 2] = "OPEN_CLOSE";
    })(TagTypes || (TagTypes = {}));
    exports.TagTypes = TagTypes;
    var NavOptions;
    (function (NavOptions) {
        NavOptions[NavOptions["MAIN"] = 0] = "MAIN";
        NavOptions[NavOptions["SKILLS"] = 1] = "SKILLS";
        NavOptions[NavOptions["CONTACT"] = 2] = "CONTACT";
        NavOptions[NavOptions["ABOUT"] = 3] = "ABOUT";
    })(NavOptions || (NavOptions = {}));
    exports.NavOptions = NavOptions;
});
define("elements", ["require", "exports"], function (require, exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCodeLines = exports.Elements = void 0;
    class MyElement {
        constructor(selector) {
            this.element = selector instanceof HTMLElement ? selector : document.querySelector(selector);
        }
        animate(animation) {
            this.element.style.animation = animation;
        }
        setHeight(val) {
            this.element.style.height = val;
        }
        setBackgroundColor(val) {
            this.element.style.backgroundColor = val;
        }
        setWidth(val) {
            this.element.style.width = val;
        }
        dispatchEvent(e) {
            this.element.dispatchEvent(e);
        }
        addChild(child) {
            this.element.appendChild(child);
        }
        resetHtml() {
            this.element.innerHTML = '';
        }
        writeAnim(size) {
            var width = 0;
            var timer = setInterval(() => {
                this.setWidth(width + "px");
                width += size;
                if (width > 500) {
                    clearInterval(timer);
                }
            }, 50);
        }
    }
    class MyElements {
        constructor(selector) {
            var newElements = [];
            document.querySelectorAll(selector).forEach(e => {
                newElements.push(new MyElement(e));
            });
            this.elements = newElements;
        }
        getItem(index) {
            if (index >= 0 && index < this.elements.length)
                return this.elements[index];
            return null;
        }
    }
    for (var l = 1; l <= 30; l++) {
        var line = document.createElement("span");
        line.classList.add("line");
        line.innerText = l.toString();
        (_a = document.querySelector("#editor .content_bar .code_bar .raw_code_bar .lines_bar")) === null || _a === void 0 ? void 0 : _a.appendChild(line);
    }
    const Elements = {
        Pointer: new MyElement("#pointer"),
        Top_Bar: {
            _this: new MyElement("#editor .top_bar"),
            Dots: new MyElements("#editor .top_bar .dot")
        },
        Config_Bar: {
            _this: new MyElement("#editor .config_bar"),
            Config_List: {
                _this: new MyElement("#editor .config_bar .config_list"),
                List: new MyElements("#editor .config_bar .config_list li")
            }
        },
        Content_Bar: {
            _this: new MyElement("#editor .content_bar"),
            Side_Bar: {
                _this: new MyElement("#editor .content_bar .side_bar"),
                Actions_Bar: {
                    _this: new MyElement("#editor .content_bar .side_bar .actions_bar"),
                    Icons: new MyElements("#editor .content_bar .side_bar .actions_bar .icon")
                },
                Files_Bar: {
                    _this: new MyElement("#editor .content_bar .side_bar .files_bar"),
                    Menu_Title: new MyElement("#editor .content_bar .side_bar .files_bar .menu_title"),
                    Divisor: new MyElement("#editor .content_bar .side_bar .files_bar .divisor"),
                    Nav_Bar: {
                        _this: new MyElement("#editor .content_bar .side_bar .files_bar .nav_bar"),
                        List: new MyElements("#editor .content_bar .side_bar .files_bar .nav_bar li")
                    }
                }
            },
            Code_Bar: {
                _this: new MyElement("#editor .content_bar .code_bar"),
                Files_Bar: {
                    _this: new MyElement("#editor .content_bar .code_bar .files_bar"),
                    List: new MyElements("#editor .content_bar .code_bar .files_bar ul li")
                },
                Raw_Code_Bar: {
                    _this: new MyElement("#editor .content_bar .code_bar .raw_code_bar"),
                    Lines_Code_Bar: new MyElement("#editor .content_bar .code_bar .raw_code_bar .lines_code_bar"),
                    Lines_Bar: {
                        _this: new MyElement("#editor .content_bar .code_bar .raw_code_bar .lines_bar"),
                        Lines: new MyElements("#editor .content_bar .code_bar .raw_code_bar .lines_bar .line")
                    }
                }
            }
        }
    };
    exports.Elements = Elements;
    function getCodeLines() {
        return new MyElements("#editor .content_bar .code_bar .raw_code_bar .lines_code_bar .line");
    }
    exports.getCodeLines = getCodeLines;
});
define("initialAnim", ["require", "exports", "elements"], function (require, exports, elements_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showEditorTimer = void 0;
    function showEditorTimer() {
        var model = {
            currTopDot: 2,
            currConfigItem: 0,
            currSideIcon: 0,
            currLineNum: 0,
            currNavItem: 0,
            step: 0
        };
        const checkStep = (initial, final) => {
            if (!final) {
                if (Array.isArray(initial))
                    return initial.includes(model.step);
                return model.step == initial;
            }
            return model.step >= initial && model.step <= final;
        };
        var timer = setInterval(() => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            if (checkStep(1000)) {
                elements_1.Elements.Top_Bar._this.animate("height5Anim 0.6s ease-in-out 0s 1 normal forwards");
            }
            else if (checkStep(1800)) {
                elements_1.Elements.Top_Bar._this.setHeight("5%");
                elements_1.Elements.Top_Bar._this.animate("widthAnim 0.7s ease-in-out 0s 1 normal forwards");
            }
            else if (checkStep(2700)) {
                elements_1.Elements.Config_Bar._this.animate("height3Anim 0.6s ease-in-out 0s 1 normal forwards");
            }
            else if (checkStep(3500)) {
                elements_1.Elements.Content_Bar._this.animate("height92Anim 0.6s ease-in-out 0s 1 normal forwards");
            }
            else if (checkStep(4500)) {
                elements_1.Elements.Content_Bar.Side_Bar._this.animate("width15Anim 0.6s ease-in-out 0s 1 normal forwards");
            }
            else if (checkStep(5500)) {
                elements_1.Elements.Content_Bar.Side_Bar.Actions_Bar._this.animate("width25Anim 0.6s ease-in-out 0s 1 normal forwards");
            }
            else if (checkStep(6100)) {
                elements_1.Elements.Content_Bar.Code_Bar.Files_Bar._this.animate("height5Anim 0.6s ease-in-out 0s 1 normal forwards");
            }
            else if (checkStep([7500, 7700, 7900])) {
                (_a = elements_1.Elements.Top_Bar.Dots.getItem(model.currTopDot)) === null || _a === void 0 ? void 0 : _a.animate("scaleAnim 0.6s ease-in-out 0s 1 normal forwards");
                model.currTopDot--;
            }
            else if (checkStep(8500, 9300)) {
                (_b = elements_1.Elements.Config_Bar.Config_List.List.getItem(model.currConfigItem)) === null || _b === void 0 ? void 0 : _b.animate("scaleAnim 0.6s ease-in-out 0s 1 normal forwards");
                model.currConfigItem++;
            }
            else if (checkStep(9600, 10000)) {
                (_c = elements_1.Elements.Content_Bar.Side_Bar.Actions_Bar.Icons.getItem(model.currSideIcon)) === null || _c === void 0 ? void 0 : _c.animate("scaleAnim 0.6s ease-in-out 0s 1 normal forwards");
                model.currSideIcon++;
            }
            else if (checkStep(10500, 12000)) {
                (_d = elements_1.Elements.Content_Bar.Code_Bar.Raw_Code_Bar.Lines_Bar.Lines.getItem(model.currLineNum)) === null || _d === void 0 ? void 0 : _d.animate("scaleAnim 0.6s ease-in-out 0s 1 normal forwards");
                (_e = elements_1.Elements.Content_Bar.Code_Bar.Raw_Code_Bar.Lines_Bar.Lines.getItem(model.currLineNum + 1)) === null || _e === void 0 ? void 0 : _e.animate("scaleAnim 0.6s ease-in-out 0s 1 normal forwards");
                model.currLineNum += 2;
            }
            else if (checkStep(12500)) {
                elements_1.Elements.Content_Bar.Side_Bar.Files_Bar.Menu_Title.animate("scaleAnim 0.6s ease-in-out 0s 1 normal forwards");
            }
            else if (checkStep(13200)) {
                elements_1.Elements.Content_Bar.Side_Bar.Files_Bar.Divisor.animate("widthAnim 0.7s ease-in-out 0s 1 normal forwards");
            }
            else if (checkStep([14000, 14400, 14800, 15200])) {
                (_f = elements_1.Elements.Content_Bar.Side_Bar.Files_Bar.Nav_Bar.List.getItem(model.currNavItem)) === null || _f === void 0 ? void 0 : _f.animate("height35pxAnim 0.6s ease-in-out 0s 1 normal forwards");
                model.currNavItem++;
            }
            else if (checkStep(16000)) {
                elements_1.Elements.Pointer.animate("pointerAnimation 3s ease 0s 1 normal forwards");
            }
            else if (checkStep(17300)) {
                (_g = elements_1.Elements.Content_Bar.Side_Bar.Files_Bar.Nav_Bar.List.getItem(0)) === null || _g === void 0 ? void 0 : _g.dispatchEvent(new Event("mouseenter"));
            }
            else if (checkStep(18000)) {
                (_h = elements_1.Elements.Content_Bar.Side_Bar.Files_Bar.Nav_Bar.List.getItem(0)) === null || _h === void 0 ? void 0 : _h.dispatchEvent(new Event("mouseout"));
                (_j = elements_1.Elements.Content_Bar.Side_Bar.Files_Bar.Nav_Bar.List.getItem(0)) === null || _j === void 0 ? void 0 : _j.dispatchEvent(new Event("mousedown"));
                (_k = elements_1.Elements.Content_Bar.Side_Bar.Files_Bar.Nav_Bar.List.getItem(0)) === null || _k === void 0 ? void 0 : _k.dispatchEvent(new Event("click"));
            }
            else if (checkStep(18100)) {
                (_l = elements_1.Elements.Content_Bar.Side_Bar.Files_Bar.Nav_Bar.List.getItem(0)) === null || _l === void 0 ? void 0 : _l.dispatchEvent(new Event("mouseup"));
            }
            else if (checkStep(22000)) {
                clearInterval(timer);
            }
            model.step += 100;
        }, 100);
    }
    exports.showEditorTimer = showEditorTimer;
});
define("linesContent", ["require", "exports", "constants"], function (require, exports, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinesContent = exports.renderTag = void 0;
    function renderTag(tag, type, content) {
        var openTag = document.createElement("span"), closeTag = document.createElement("span"), tagName = document.createElement("span"), tagContent = document.createElement("span"), finalEl = document.createElement("span");
        openTag.classList.add("open_close_tag");
        closeTag.classList.add("open_close_tag");
        openTag.innerText = "<";
        closeTag.innerText = ">";
        tagName.classList.add("name_tag");
        tagName.innerText = tag;
        if (type === constants_1.TagTypes.OPEN_CLOSE) {
            tagContent.classList.add("content_tag");
            tagContent.innerText = content || "";
            finalEl.appendChild(openTag);
            finalEl.appendChild(tagName);
            finalEl.appendChild(closeTag);
            finalEl.appendChild(tagContent);
            var newOpenTag = openTag.cloneNode(true), newTagName = tagName.cloneNode(true), newCloseTag = closeTag.cloneNode(true);
            newOpenTag.innerText = "</";
            finalEl.appendChild(newOpenTag);
            finalEl.appendChild(newTagName);
            finalEl.appendChild(newCloseTag);
        }
        else if (type == constants_1.TagTypes.OPEN) {
            finalEl.appendChild(openTag);
            finalEl.appendChild(tagName);
            finalEl.appendChild(closeTag);
        }
        else if (type == constants_1.TagTypes.CLOSE) {
            openTag.innerText = "</";
            finalEl.appendChild(openTag);
            finalEl.appendChild(tagName);
            finalEl.appendChild(closeTag);
        }
        return finalEl;
    }
    exports.renderTag = renderTag;
    const LinesContent = {
        [constants_1.NavOptions.MAIN]: [
            { l: 1, val: renderTag("html", constants_1.TagTypes.OPEN) },
            { l: 3, val: renderTag("h2", constants_1.TagTypes.OPEN_CLOSE, "Bernardo Balixa") },
            { l: 30, val: renderTag("html", constants_1.TagTypes.CLOSE) }
        ],
        [constants_1.NavOptions.SKILLS]: [],
        [constants_1.NavOptions.CONTACT]: [],
        [constants_1.NavOptions.ABOUT]: [],
    };
    exports.LinesContent = LinesContent;
});
define("navigation", ["require", "exports", "linesContent", "elements"], function (require, exports, linesContent_1, elements_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleNavChange = void 0;
    function changeCurrPage(type) {
        var _a, _b;
        elements_2.Elements.Content_Bar.Code_Bar.Raw_Code_Bar.Lines_Code_Bar.resetHtml();
        var lineEl;
        for (var line = 1; line <= 30; line++) {
            lineEl = document.createElement("span");
            lineEl.classList.add("line");
            if (linesContent_1.LinesContent[type].some(e => e.l == line)) {
                var content = ((_a = linesContent_1.LinesContent[type].find(e => e.l == line)) === null || _a === void 0 ? void 0 : _a.val) || new HTMLSpanElement;
                lineEl.appendChild(content);
            }
            elements_2.Elements.Content_Bar.Code_Bar.Raw_Code_Bar.Lines_Code_Bar.addChild(lineEl);
        }
        var codeLines = (0, elements_2.getCodeLines)();
        for (var i = 0; i < 30; i++) {
            (_b = codeLines.getItem(i)) === null || _b === void 0 ? void 0 : _b.writeAnim(8);
        }
    }
    function handleNavChange(type) {
        var _a, _b;
        for (var i = 0; i < 4; i++) {
            (_a = elements_2.Elements.Content_Bar.Code_Bar.Files_Bar.List.getItem(i)) === null || _a === void 0 ? void 0 : _a.animate(i == type ? "width150pxAnim .6s ease-in-out 0s 1 normal forwards" : "none");
            (_b = elements_2.Elements.Content_Bar.Side_Bar.Files_Bar.Nav_Bar.List.getItem(i)) === null || _b === void 0 ? void 0 : _b.setBackgroundColor(type == i ? "#3f3f3f" : "#2f2f30");
        }
        changeCurrPage(type);
    }
    exports.handleNavChange = handleNavChange;
});
define("index", ["require", "exports", "initialAnim", "navigation"], function (require, exports, Anim, Navigation) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Anim = __importStar(Anim);
    Navigation = __importStar(Navigation);
    Anim.showEditorTimer();
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
            Navigation.handleNavChange(i);
        });
    });
});
