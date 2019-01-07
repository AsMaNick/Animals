var svg;
var height = 300, width = 1000;
var margin_x = 35, margin_y = 15;
var dash_length = 6, font_size = 10;

function clear() {
	d3.select("svg").remove();
	svg = d3.select("body").select("div.canvas").append("svg")
												.attr("name", "svg");
	
	svg.attr("height", height).attr("width", width);
}

function drawCircle(x, y) {
	svg.append("circle")
		.style("fill", "white")
		.style("stroke", "steelblue")
		.style("stroke-width", "2")
		.attr("cx", x)
		.attr("cy", y)
		.attr("r", 2);
}
	
function drawLine(x1, y1, x2, y2, fill, stroke, stroke_width) {
	svg.append("line")
		.style("fill", fill)
		.style("stroke", stroke)
		.style("stroke-width", stroke_width)
		.attr("x1", x1)
		.attr("y1", y1)
		.attr("x2", x2)
		.attr("y2", y2)
}

function drawText(x, y, fill, font_size, text) {
	svg.append("text")
		.style("fill", fill)
		.style("font-size", font_size)
		.style("text-anchor", "end")
		.attr("x", x)
		.attr("y", y)
		.text(text)
}

function updateCoordinates(len, l, r, x, is_x) {
	if (is_x) {
		len -= 2 * margin_x;
		return margin_x + len * (x - l) / (r - l);
	}
	len -= 2 * margin_y;
	return -margin_y + height - len * (x - l) / (r - l);
}

function labelAxe(l, r, intervals, vertical) {
	for (var i = 0; i < intervals; ++i) {
		var coord = l + (r - l) / intervals * (i + 1);
		coord = Math.round(coord * 10) / 10;
		if (vertical) {
			var x = updateCoordinates(width, l, r, coord, true);
			drawLine(x, height - margin_y, x, height - margin_y - dash_length, "white", "gray", "1");
		} else {
			var y = updateCoordinates(height, l, r, coord, false);
			drawLine(margin_x, y, margin_x + dash_length, y, "white", "gray", "1");
			//drawText(margin + 10, y - 2 + font_size / 2, "gray", font_size.toString(), coord.toString());
			drawText(margin_x - 5, y - 2 + font_size / 2, "gray", font_size.toString(), coord.toString());
			//console.log(elem);
			//elem.attr("x", (x + i * 5).toString());
		}
	}
}

function labelPlot(x, y) {
	drawLine(margin_x, margin_y, margin_x, height - margin_y, "white", "gray", "1");
	drawLine(margin_x, height - margin_y, width - margin_x, height - margin_y, "white", "gray", "1");
	var lx = getMin(x);
	var rx = getMax(x);
	var ly = getMin(y);
	var ry = getMax(y);
	var add_space_x = (rx - lx) * 0.1;
	var add_space_y = (ry - ly) * 0.5;
	lx -= add_space_x;
	rx += add_space_x;
	ly -= add_space_y;
	ry += add_space_y;
	labelAxe(lx, rx, 10, true);
	labelAxe(ly, ry, 7, false);
	for (var i = 0; i < x.length; ++i) {
		x[i] = updateCoordinates(width, lx, rx, x[i], true);
		y[i] = updateCoordinates(height, ly, ry, y[i], false);
	}
}

function buildGraphic(x, y) {
	clear();
	labelPlot(x, y);
	for (var i = 0; i < x.length; ++i) {
		drawCircle(x[i], y[i]);
		if (i + 1 < x.length) {
			drawLine(x[i], y[i], x[i + 1], y[i + 1],
					  "white", "steelblue", "2");
		}
	}
}

setTimeout(function() {
	buildGraphic([10, 150, 170, 200, 300, 500, 600, 700, 770], [120, 150, 170, 130, 160, 150, -30, 170, 164]);
}, 100);