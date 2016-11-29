window.onload = function () {

    var c = logoAnimationContructor();

    c.init();
};


function logoAnimationContructor() {

    var context = getContext();
    var background = null;
    var requestFrame = undefined;
    var frame = null;
    var endFrame = 200;

    var activeMenu = false;

    var backgroundHeight = 0;
    var backgroundWidth = 0;
    var canvasHeight = 0;
    var canvasWidth = 0;

    var logoControler = logoConstructor();
    var logoWidth = 0;
    var alphaLogo = 0;
    var first = true;

    var isMobile = window.mobileAndTabletcheck();

    function loadImage(startFrame) {
        var img = new Image;

        img.src = 'img/background.jpg';

        img.onload = function () {

            var elem = document.getElementById("modalSpinner");
            if (elem) {
                elem.parentElement.removeChild(elem);

                var body = document.getElementsByTagName("BODY");
                body[0].style.overflow = "auto";
            }


            background = img;

            backgroundHeight = this.height;
            backgroundWidth = this.width;

            starAnimation(startFrame);
        };

    };

    function starAnimation(startFrame) {

        startFrame = startFrame || 0;

        if (startFrame == 201)
            frame = startFrame;

        if (startFrame > endFrame && startFrame != 201)
            startFrame = endFrame;

        if (startFrame < 0)
            startFrame = 0;

        frame = startFrame || 0;

        if (!requestFrame)
            drawFrame();
    };

    function stopAnimation() {
        if (!requestFrame)
            return;

        var cancelAnimationFrame = getCancelAnimationFrame();

        cancelAnimationFrame(requestFrame);
        requestFrame = undefined;

        first = false;

        if (!isMobile)
            showCardAnimation();
    };

    function drawFrame() {

        var requestAnimationFrame = getRequestAnimationFrame();

        context.clearRect(0, 0, getCanvasWidth(), getCanvasHeight());

        drawBackground();

        if (frame > 17 && frame < 159) {
            drawLineLTR();
            drawLineRTL();
        }

        drawFlash();

        drawLogo();

        showSubTitle();

        if (first)
            frame += 2;

        requestFrame = requestAnimationFrame(drawFrame);

        if (endFrame < frame)
            stopAnimation();
    };

    function drawBackground() {

        var sourceY = backgroundHeight * frame / (endFrame * 2);

        var sourceHeght = (backgroundHeight / 2 - sourceY) * 2;

        var cY = canvasHeight * frame / (endFrame * 2);

        var cHeight = (canvasHeight / 2 - cY) * 2;

        if (frame > 160)
            return;

        var o = (160 - frame) / 30;

        context.save();
        context.globalAlpha = o;

        context.drawImage(background, 0, sourceY, backgroundWidth, sourceHeght, 0, cY, canvasWidth, cHeight);

        context.restore();
    };

    function drawFlash() {
        var h = canvasHeight * 0.20;
        var y = canvasHeight * 0.40;

        logoWidth = logoControler.getWidth(h);
        var x = (canvasWidth - logoWidth) / 2;

        if (frame > 159 && frame < 189) {

            var o = (189 - frame) / 30;

            context.save();
            context.globalAlpha = o;
            context.fillStyle = "white";
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            context.restore();
        }
    };

    function drawLogo() {

        var scroll = getScroll();

        var h = canvasHeight * 0.20 * (canvasHeight - scroll / 1.18) / canvasHeight;
        var y = canvasHeight * 0.40 + scroll / 1.715;

        logoWidth = logoControler.getWidth(h);

        var x = (canvasWidth - logoWidth) / 2;

        if (frame > 170) {

            var o = Math.min(1, (180 - frame) / 10);

            context.save();
            context.globalAlpha = 1 - o;
            logoControler.draw(context, x, y, h, 'white');
            context.restore();
        }
    };

    function ajustSubTitle(subTitle) {

        var h = canvasHeight * 0.20;
        var y = canvasHeight * 0.40;

        logoWidth = logoControler.getWidth(h);

        var x = (canvasWidth - logoWidth) / 2;

        var margem = 10;

        subTitle.style.top = canvasHeight * 0.60 + margem + "px";
        subTitle.style.left = x + "px";
    }

    function showSubTitle() {

        var sub = getSubTitle();

        var o = Math.min(1, (190 - frame) / 20);

        if (frame > 170 && frame < 201) {
            ajustSubTitle(sub);

            sub.style.display = "block";
            sub.style.opacity = 1 - o;
        } else {
            sub.style.display = "none";
            sub.style.opacity = 0;
        }
    };

    function drawLineLTR() {

        var ff = Math.min(1, frame / (endFrame - 40));

        context.strokeStyle = "#A2A2A2";
        context.lineWidth = 7;

        var mtX = 0;
        var mtY = canvasHeight * 0.40;

        var ltX = (canvasWidth + logoWidth) / 2 * ff;
        var ltY = canvasHeight * 0.40;

        var o = (159 - frame) / 10;

        context.save();
        context.globalAlpha = o;

        context.beginPath();
        context.moveTo(mtX, mtY);
        context.lineTo(ltX, ltY);
        context.closePath();
        context.stroke();

        context.restore();
    };

    function drawLineRTL() {

        var ff = Math.min(1, frame / (endFrame - 40));

        context.strokeStyle = "#A2A2A2";

        context.lineWidth = 7;

        var mtX = canvasWidth - (canvasWidth + logoWidth) / 2 * ff;
        var mtY = canvasHeight * 0.60;

        var ltX = canvasWidth;
        var ltY = canvasHeight * 0.60;

        var o = (159 - frame) / 10;

        context.save();
        context.globalAlpha = o;

        context.beginPath();
        context.moveTo(mtX, mtY);
        context.lineTo(ltX, ltY);
        context.closePath();
        context.stroke();

        context.restore();
    };

    function resizeCanvas() {

        canvasWidth = getCanvasWidth();
        canvasHeight = getCanvasHeight();

        context.canvas.width = canvasWidth;
        context.canvas.height = canvasHeight;

        loadImage(frame);

        ajustSubTitle(getSubTitle());

    };

    function ajustCardAnimation() {

        var card = getCardAnimation();

        card.style.display = "block";
        card.style.position = "absolute";
    };

    function showCardAnimation() {
        var card = getCardAnimation();

        card.style.opacity = 1;
    };

    function showMenuFixed(show) {
        var menu = document.getElementById("menuFixed");

        var canvas = getCanvasFixed();
        var ctx = getContextFixed();

        ctx.canvas.width = canvasWidth;
        ctx.canvas.height = "50";

        drawLogoFixed();

        if (show) {
            menu.style.backgroundColor = "black";
            canvas.style.display = "block";
        } else {
            menu.style.backgroundColor = "transparent";
            canvas.style.display = "none";
        }
    };

    function drawLogoFixed() {

        var ctx = getContextFixed();

        var h = 50 * 0.69;
        var y = 50 * 0.26;

        logoWidth = logoControler.getWidth(h);

        var x = (canvasWidth - logoWidth) / 2;

        logoControler.draw(ctx, x, y, h, "white");
    }

    function ajustMenu() {

        if (isMobile)
            return;

        var scroll = getScroll();

        var h = canvasHeight * 0.20 * (canvasHeight - scroll / 1.23) / canvasHeight;

        var positonCanvas = getCanvas().parentElement.getBoundingClientRect();
        var positonCanvasFixed = getCanvasFixed().parentElement.getBoundingClientRect();

        frame = 201;

        showSubTitle();

        if (positonCanvas.bottom <= positonCanvasFixed.bottom && !activeMenu) {
            showMenuFixed(true);
            activeMenu = true;
        }

        if (positonCanvas.bottom > positonCanvasFixed.bottom && activeMenu) {
            showMenuFixed(false);
            activeMenu = false;
        }

        context.clearRect(0, 0, getCanvasWidth(), getCanvasHeight());

        if (!activeMenu)
            drawLogo();
    };

    function startEventsTouch() {

        var container = getContainerCanvas();

        container.addEventListener("touchstart", onTouchStart, false);
        container.addEventListener("touchmove", onTouchMove, false);

    };

    function onTouchStart(e) {

        var container = getContainerCanvas();

        e.preventDefault();

        var touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {

            var touch = touches[i];

            var offsets = container.getBoundingClientRect();

            var posInit = offsets.left;
            var posFinal = offsets.right;

            var nextFrame = endFrame * ((100 * (touch.pageX - posInit)) / (posFinal - posInit)) / 100;

            loadImage(Math.round(nextFrame));
        }
    };

    function onTouchMove(e) {

        var container = getContainerCanvas();

        e.preventDefault();

        var touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {

            var touch = touches[i];

            var offsets = container.getBoundingClientRect();

            var margin = 30;

            var posInit = offsets.left + margin;
            var posFinal = offsets.right - margin;

            var nextFrame = endFrame * ((100 * (touch.pageX - posInit)) / (posFinal - posInit)) / 100;

            loadImage(Math.round(nextFrame));
        }
    };

    var init = function () {

        resizeCanvas();

        ajustCardAnimation();

        loadImage();

        var timelineCard = document.getElementById("timeLineCard");

        timelineCard.addEventListener("mousemove", function (e) {

            var offsets = timelineCard.getBoundingClientRect();

            var posInit = offsets.left - 0.40625;
            var posFinal = offsets.right - 1;

            var nextFrame = endFrame * ((100 * (e.clientX - posInit)) / (posFinal - posInit)) / 100;

            loadImage(Math.round(nextFrame));
        });

        window.addEventListener("resize", function () {

            resizeCanvas();

            ajustCardAnimation();

            ajustMenu();

        }, false);

        window.addEventListener("orientationchange", function () {

            resizeCanvas();

            ajustCardAnimation();

            ajustMenu();

        }, false);

        window.addEventListener("scroll", function (e) {

            ajustMenu();
        });

        if (isMobile)
            startEventsTouch();

    };

    return {
        init: init
    }
};


function getRequestAnimationFrame() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame;
};

function getCancelAnimationFrame() {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame;
};

function getContainerCanvas() {
    return document.getElementById("containerLogo");
};

function getCanvas() {
    return document.getElementById("logo");
};

function getContext() {
    return getCanvas().getContext("2d");
};

function getCanvasWidth() {
    return window.innerWidth;
};

function getCanvasHeight() {
    var img = document.getElementById("containerLogo");
    return Math.min(window.innerHeight, img.offsetHeight);
};

function getCardAnimation() {
    return document.getElementById("cardAnimation");
};

function getSubTitle() {
    return document.getElementById("subtitle");
};

function getCanvasFixed() {
    return document.getElementById("logoFixed");
};

function getContextFixed() {
    return getCanvasFixed().getContext("2d");
};

function getScroll() {

    if (window.mobileAndTabletcheck())
        return 0;

    return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
};