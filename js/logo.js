function logoConstructor() {

    var getWidth = function (height) {
        return 4690 / 1235 * height;
    };

    var draw = function draw(context, x, y, height, color) {

        context.fillStyle = color;

        var f = height / 1235;

        x = x - 75 * f;
        y = y - 225 * f;

        print_Z(context, f, x, y);
        print_E(context, f, x, y);
        print_P(context, f, x, y);
        print_T(context, f, x, y);
        print_A(context, f, x, y);
    };

    function print_Z(context, f, x, y) {

        context.beginPath();
        context.moveTo(132 * f + x, 225 * f + y);
        context.lineTo(1005 * f + x, 225 * f + y);
        context.lineTo(1005 * f + x, 283 * f + y);
        context.lineTo(150 * f + x, 1390 * f + y);
        context.lineTo(1025 * f + x, 1390 * f + y);
        context.lineTo(1025 * f + x, 1460 * f + y);
        context.lineTo(75 * f + x, 1460 * f + y);
        context.lineTo(75 * f + x, 1385 * f + y);
        context.lineTo(930 * f + x, 282 * f + y);
        context.lineTo(132 * f + x, 282 * f + y);
        context.lineTo(132 * f + x, 225 * f + y);
        context.closePath();
        context.fill();
    };

    function print_E(context, f, x, y) {

        context.beginPath();
        context.moveTo(1130 * f + x, 225 * f + y);
        context.lineTo(1995 * f + x, 225 * f + y);
        context.lineTo(1995 * f + x, 282 * f + y);
        context.lineTo(1210 * f + x, 282 * f + y);
        context.lineTo(1210 * f + x, 781 * f + y);
        context.lineTo(1942 * f + x, 781 * f + y);
        context.lineTo(1942 * f + x, 851 * f + y);
        context.lineTo(1210 * f + x, 851 * f + y);
        context.lineTo(1210 * f + x, 1394 * f + y);
        context.lineTo(1995 * f + x, 1394 * f + y);
        context.lineTo(1995 * f + x, 1460 * f + y);
        context.lineTo(1135 * f + x, 1460 * f + y);
        context.lineTo(1135 * f + x, 225 * f + y);
        context.closePath();
        context.fill();
    };

    function print_P(context, f, x, y) {

        context.beginPath();
        context.moveTo(2125 * f + x, 225 * f + y);
        context.lineTo(2695 * f + x, 225 * f + y);
        context.ellipse(2690 * f + x, 567 * f + y, 320 * f, 342 * f, 0, -Math.PI / 2, Math.PI / 2);
        context.lineTo(2195 * f + x, 908 * f + y);
        context.lineTo(2195 * f + x, 1460 * f + y);
        context.lineTo(2125 * f + x, 1460 * f + y);
        context.lineTo(2125 * f + x, 225 * f + y);
        context.closePath();

        context.moveTo(2195 * f + x, 283 * f + y);
        context.lineTo(2195 * f + x, 844 * f + y);
        context.lineTo(2675 * f + x, 844 * f + y);
        context.ellipse(2680 * f + x, 564 * f + y, 270 * f, 280 * f, 0, Math.PI / 2, -Math.PI / 2, true);
        context.lineTo(2195 * f + x, 283 * f + y);
        context.closePath();
        context.fill();
    };

    function print_T(context, f, x, y) {

        context.beginPath();
        context.moveTo(3025 * f + x, 225 * f + y);
        context.lineTo(3975 * f + x, 225 * f + y);
        context.lineTo(3975 * f + x, 295 * f + y);
        context.lineTo(3525 * f + x, 295 * f + y);
        context.lineTo(3525 * f + x, 1455 * f + y);
        context.lineTo(3459 * f + x, 1455 * f + y);
        context.lineTo(3459 * f + x, 295 * f + y);
        context.lineTo(3025 * f + x, 295 * f + y);
        context.lineTo(3025 * f + x, 225 * f + y);
        context.closePath();
        context.fill();
    };

    function print_A(context, f, x, y) {

        context.beginPath();
        context.moveTo(4285 * f + x, 225 * f + y);
        context.lineTo(4365 * f + x, 225 * f + y);
        context.lineTo(4865 * f + x, 1455 * f + y);
        context.lineTo(4783 * f + x, 1455 * f + y);
        context.lineTo(4625 * f + x, 1055 * f + y);
        context.lineTo(4010 * f + x, 1055 * f + y);
        context.lineTo(3860 * f + x, 1455 * f + y);
        context.lineTo(3785 * f + x, 1455 * f + y);
        context.lineTo(4281 * f + x, 225 * f + y);
        context.closePath();

        context.moveTo(4040 * f + x, 988 * f + y);
        context.lineTo(4595 * f + x, 988 * f + y);
        context.lineTo(4325 * f + x, 281 * f + y);
        context.lineTo(4040 * f + x, 988 * f + y);
        context.closePath();
        context.fill();
    };

    return {
        draw: draw,
        getWidth: getWidth
    }
};