function drawDiagPolygon(x = 0, y = 0, f = 0, context, canvas) {

    // Default
    context.lineWidth = 1;
    context.strokeStyle = "white";
    context.fillStyle = "white";

    // Lines coords

    // Left
    var leftLine = {

        moveTo: {
            x_Inicial: 0,
            y_Inicial: 0,

            x_Final: 972,
            y_Final: 220
        },

        lineTo: {
            x_Inicial: 0,
            y_Inicial: 0,

            x_Final: 70,
            y_Final: 1385
        },

        next: {
            lineTo: {
                x: 0,
                y: 0
            },
            moveTo: {
                x: 0,
                y: 0
            },
        },

        tamanho: 0
    };

    // Rigth
    var rigthLine = {

        moveTo: {
            x_Inicial: 0,
            y_Inicial: 0,

            x_Final: 1010,
            y_Final: 288
        },

        lineTo: {
            x_Inicial: 0,
            y_Inicial: 0,

            x_Final: 97,
            y_Final: 1465
        },

        next: {
            lineTo: {
                x: 0,
                y: 0
            },
            moveTo: {
                x: 0,
                y: 0
            },
        },

        tamanho: 0
    };


    function drawLines() {

        let finish = false;
        let startPixel = -2400;
        let speed = 35;

        context.clearRect(0, 0, canvas.width, canvas.height);

        let coords = getCoords(972, 220, 70, 1385, 1473);

        context.beginPath();
        context.moveTo(coords.x * f + x, coords.y * f + y);

        // Left
        finish = drawLine(leftLine, startPixel, 1473, speed);

        context.lineTo(leftLine.next.lineTo.x * f + x, rigthLine.next.lineTo.y * f + y);

        // Rigth
        drawLine(rigthLine, startPixel, 1492, speed);

        // Complementary
        //drawCompleLine(leftLine, rigthLine, startPixel);

        context.closePath();
        //context.fill();
        context.stroke();

        if (finish)
            return;

        requestAnimationFrame(drawLines);
    }

    function drawLine(lineObj, startPixel, length, speed) {

        let moveTo = lineObj.moveTo;
        let lineTo = lineObj.lineTo;
        let next = lineObj.next;
        let tamanho = lineObj.tamanho;

        let coords_Inicial = getCoords(moveTo.x_Final, moveTo.y_Final, lineTo.x_Final, lineTo.y_Final, startPixel);

        moveTo.x_Inicial = coords_Inicial.x;
        moveTo.y_Inicial = coords_Inicial.y;
        lineTo.x_Inicial = coords_Inicial.x;
        lineTo.y_Inicial = coords_Inicial.y;

        let coord_moveTo = getCoords(moveTo.x_Inicial, moveTo.y_Inicial, moveTo.x_Final, moveTo.y_Final, tamanho);
        let coord_lineTo = getCoords(lineTo.x_Inicial, lineTo.y_Inicial, lineTo.x_Final, lineTo.y_Final, tamanho + length);

        next.moveTo.x = coord_moveTo.x;
        next.moveTo.y = coord_moveTo.y;
        next.lineTo.x = coord_lineTo.x;
        next.lineTo.y = coord_lineTo.y;

        if (next.moveTo.x < moveTo.x_Final)
            next.moveTo.x = moveTo.x_Final;

        if (next.moveTo.y > moveTo.y_Final)
            next.moveTo.y = moveTo.y_Final;

        if (next.lineTo.x < lineTo.x_Final)
            next.lineTo.x = lineTo.x_Final;

        if (next.lineTo.y > lineTo.y_Final)
            next.lineTo.y = lineTo.y_Final;

        context.lineTo(next.lineTo.x * f + x, next.lineTo.y * f + y);

        lineObj.tamanho += speed;

        if (next.moveTo.x <= moveTo.x_Final)
            return true;
    };

    function drawCompleLine(leftLine, lineRigth, startPixel) {

        // Top
        context.lineTo(rigthLine.next.moveTo.x * f + x, leftLine.next.moveTo.y * f + y);

        context.lineTo(rigthLine.next.moveTo.x * f + x, rigthLine.next.moveTo.y * f + y);

        // Bottom
        context.lineTo(leftLine.next.lineTo.x * f + x, rigthLine.next.lineTo.y * f + y);

        context.lineTo(leftLine.next.lineTo.x * f + x, rigthLine.next.lineTo.y * f + y);
    };

    drawLines();

};

function getCoords(x1, y1, x2, y2, n) {

    var x = 0;
    var y = 0;

    var d = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    var r = n / d;

    x = r * x2 + (1 - r) * x1;
    y = r * y2 + (1 - r) * y1;

    return {
        x: x,
        y: y
    }
}