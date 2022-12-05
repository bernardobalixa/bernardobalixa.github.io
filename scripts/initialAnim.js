function showEditorTimer() {
    var model = {
        currTopDot: 2,
        currConfigItem: 0,
        currSideIcon: 0,
        currLineNum: 0,
        currNavItem: 0,
        step: 0
    }

    const checkStep = (initial, final) => {
        if (!final) {
            if (Array.isArray(initial))
                return initial.includes(model.step);

            return model.step == initial;
        }

        return model.step >= initial && model.step <= final;
    };

    var timer = setInterval(() => {

        if (checkStep(1000)) {
            document.querySelector("#editor .top_bar").style.animation = "height5Anim 0.6s ease-in-out 0s 1 normal forwards";

        } else if (checkStep(1800)) {
            document.querySelector("#editor .top_bar").style.height = "5%";
            document.querySelector("#editor .top_bar").style.animation = "widthAnim 0.7s ease-in-out 0s 1 normal forwards";

        } else if (checkStep(2700)) {
            document.querySelector("#editor .config_bar").style.animation = "height3Anim 0.6s ease-in-out 0s 1 normal forwards";

        } else if (checkStep(3500)) {
            document.querySelector("#editor .content_bar").style.animation = "height92Anim 0.6s ease-in-out 0s 1 normal forwards";

        } else if (checkStep(4500)) {
            document.querySelector("#editor .content_bar .side_bar").style.animation = "width15Anim 0.6s ease-in-out 0s 1 normal forwards";

        } else if (checkStep(5500)) {
            document.querySelector("#editor .content_bar .side_bar .actions_bar").style.animation = "width25Anim 0.6s ease-in-out 0s 1 normal forwards";

        } else if (checkStep(6100)) {
            document.querySelector("#editor .content_bar .code_bar .files_bar").style.animation = "height5Anim 0.6s ease-in-out 0s 1 normal forwards";

        } else if (checkStep([7500, 7700, 7900])) {
            var topDots = document.querySelectorAll("#editor .top_bar .dot");
            if (model.currTopDot >= 0 && model.currTopDot < topDots.length) {
                topDots.item(model.currTopDot).style.animation = "scaleAnim 0.6s ease-in-out 0s 1 normal forwards";
                model.currTopDot--;
            }

        } else if (checkStep(8500, 9300)) {
            var configItems = document.querySelectorAll("#editor .config_bar .config_list li");
            if (model.currConfigItem >= 0 && model.currConfigItem < configItems.length) {
                configItems.item(model.currConfigItem).style.animation = "scaleAnim 0.6s ease-in-out 0s 1 normal forwards";
                model.currConfigItem++;
            }

        } else if (checkStep(9600, 10000)) {
            var sideIcons = document.querySelectorAll("#editor .content_bar .side_bar .actions_bar .icon");
            if (model.currSideIcon >= 0 && model.currSideIcon < sideIcons.length) {
                sideIcons.item(model.currSideIcon).style.animation = "scaleAnim 0.6s ease-in-out 0s 1 normal forwards";
                model.currSideIcon++;
            }

        } else if (checkStep(10500, 12000)) {
            var linesNum = document.querySelectorAll("#editor .content_bar .code_bar .raw_code_bar .lines_bar .line");
            if (model.currLineNum >= 0 && model.currLineNum < linesNum.length) {
                linesNum.item(model.currLineNum).style.animation = "scaleAnim 0.6s ease-in-out 0s 1 normal forwards";
                linesNum.item(model.currLineNum + 1).style.animation = "scaleAnim 0.6s ease-in-out 0s 1 normal forwards";
                model.currLineNum += 2;
            }

        } else if (checkStep(12500)) {
            document.querySelector("#editor .content_bar .side_bar .files_bar .menu_title").style.animation = "scaleAnim 0.6s ease-in-out 0s 1 normal forwards";

        } else if (checkStep(13200)) {
            document.querySelector("#editor .content_bar .side_bar .files_bar .divisor").style.animation = "widthAnim 0.7s ease-in-out 0s 1 normal forwards";

        } else if (checkStep([14000, 14400, 14800, 15200])) {
            var navItems = document.querySelectorAll("#editor .content_bar .side_bar .files_bar .nav_bar li");
            if (model.currNavItem >= 0 && model.currNavItem < navItems.length) {
                navItems.item(model.currNavItem).style.animation = "height35pxAnim 0.6s ease-in-out 0s 1 normal forwards";
                model.currNavItem++;
            }

        } else if (checkStep(16000)) {
            document.querySelector("#pointer").style.animation = "pointerAnimation 3s ease 0s 1 normal forwards";

        } else if (checkStep(17300)) {
            document.querySelectorAll("#editor .content_bar .side_bar .files_bar .nav_bar li").item(0).dispatchEvent(new Event("mouseenter"));
        } else if (checkStep(18000)) {
            document.querySelectorAll("#editor .content_bar .side_bar .files_bar .nav_bar li").item(0).dispatchEvent(new Event("mouseout"));
            document.querySelectorAll("#editor .content_bar .side_bar .files_bar .nav_bar li").item(0).dispatchEvent(new Event("mousedown")); 
            document.querySelectorAll("#editor .content_bar .side_bar .files_bar .nav_bar li").item(0).dispatchEvent(new Event("click"));

        } else if (checkStep(18100)) {
            document.querySelectorAll("#editor .content_bar .side_bar .files_bar .nav_bar li").item(0).dispatchEvent(new Event("mouseup")); 

        } else if (checkStep(22000)) {
            clearInterval(timer);
        }

        model.step += 100;
    }, 100);
}