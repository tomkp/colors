var Colors = (function() {


    // rgb to hex eg: hex([255,0,100]) -> "#ff0064"
    var hex = function(rgb) {
        return '#' + (1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2]).toString(16).substr(1)
    };


    // hex to rgb eg: rgb("#ff0064") -> [255,0,100]
    var rgb = function(hex) {
        hex = hex.replace("#", "0x");
        return [(hex >> 16) & 0xFF, (hex >> 8) & 0xFF, hex & 0xFF];
    };


    var defaultRange = function(range) {
        range = range || {};
        range.min = range.min || "#ffffff";
        range.max = range.max || "#000000";
        return range;
    };


    var percent = function(value, range) {
        range = defaultRange(range);
        var min = rgb(range.min);
        var max = rgb(range.max);
        var res = [];
        for (var i = 0; i < 3; i++) {
            res[i] = Math.abs(parseInt((min[i] + ((max[i] - min[i]) * value))));
        }
        return hex(res);
    };


    var shades = function(stops, range) {
        range = defaultRange(range);
        var min = rgb(range.min);
        var max = rgb(range.max);
        var inc = [(max[0] - min[0]) / (stops - 1),
            (max[1] - min[1]) / (stops - 1),
            (max[2] - min[2]) / (stops - 1)];
        var results = [];
        for (var i = 0; i < stops; i++) {
            var color = hex([
                parseInt(min[0] + (i * inc[0])),
                parseInt(min[1] + (i * inc[1])),
                parseInt(min[2] + (i * inc[2]))
            ]);
            results.push(color);
        }
        return results;
    };


    return {
        shades:shades,
        percent:percent
    }

})();
