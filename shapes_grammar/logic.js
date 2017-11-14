// Janek Kurzydlo
var currentLineSelection = {x1: 700, y1: 300, x2: 700, y2: 300}
var currentCircleSelection = {cx: 700, cy: 300, r: 5}

// Initialization
var svgSelection = d3.select("svg")
  .attr("width", "100%")
  .attr("height", "1000px")

var lineSelection = svgSelection.append("line")
  .attr("x1", currentLineSelection.x1)
  .attr("y1", currentLineSelection.y1)
  .attr("x2", currentLineSelection.x2)
  .attr("y2", currentLineSelection.y2)
  .attr("stroke-width", 2)
  .attr("stroke", "black");
var circleSelection = svgSelection.append("circle")
  .attr("cx", currentCircleSelection.cx)
  .attr("cy", currentCircleSelection.cy)
  .attr("r", currentCircleSelection.r)
  .style("fill", "black");


// Production 1 - right
var firstProd = d3.select("#firstProd");
firstProd.on("click", function(d) {

  var y = currentLineSelection.y2
  var x2 = currentLineSelection.x2 + 40;
  var x1 = x2 - 40;
  var cx = currentCircleSelection.cx + 40;

  lineSelection = svgSelection.append("line")
    .attr("x1", x1)
    .attr("y1", y)
    .attr("x2", x2)
    .attr("y2", y)
    .attr("stroke-width", 2)
    .attr("stroke", "black");
  circleSelection = svgSelection.append("circle")
    .attr("cx", cx)
    .attr("cy", y)
    .attr("r", currentCircleSelection.r)

  currentLineSelection.x1 = x1;
  currentLineSelection.x2 = x2;
  currentCircleSelection.cx = cx;
  markCurrent()
});

// Production 2 - down
var secondProd = d3.select("#secondProd");
secondProd.on("click", function(d) {

  var x = currentLineSelection.x2;
  var y2 = currentLineSelection.y2 + 40;
  var y1 = y2 - 40;
  var cy = currentCircleSelection.cy + 40;

  lineSelection = svgSelection.append("line")
    .attr("x1", x)
    .attr("y1", y1)
    .attr("x2", x)
    .attr("y2", y2)
    .attr("stroke-width", 2)
    .attr("stroke", "black");
  circleSelection = svgSelection.append("circle")
    .attr("cx", x)
    .attr("cy", cy)
    .attr("r", currentCircleSelection.r)

  currentLineSelection.y1 = y1;
  currentLineSelection.y2 = y2;
  currentCircleSelection.cy = cy;
  markCurrent()
});

// Production 3 - up
var thirdProd = d3.select("#thirdProd");
thirdProd.on("click", function(d) {

  var x = currentLineSelection.x2;
  var y2 = currentLineSelection.y2 - 40;
  var y1 = currentLineSelection.y2;
  var cy = currentCircleSelection.cy - 40;

  lineSelection = svgSelection.append("line")
    .attr("x1", x)
    .attr("y1", y1)
    .attr("x2", x)
    .attr("y2", y2)
    .attr("stroke-width", 2)
    .attr("stroke", "black");
  circleSelection = svgSelection.append("circle")
    .attr("cx", x)
    .attr("cy", cy)
    .attr("r", currentCircleSelection.r)

  currentLineSelection.y1 = y1;
  currentLineSelection.y2 = y2;
  currentCircleSelection.cy = cy;
  markCurrent()
});

// Production 4 - left
var forthProd = d3.select("#forthProd");
forthProd.on("click", function(d) {

  var y = currentLineSelection.y2
  var x2 = currentLineSelection.x2 - 40;
  var x1 = currentLineSelection.x2
  var cx = currentCircleSelection.cx - 40;

  lineSelection = svgSelection.append("line")
    .attr("x1", x1)
    .attr("y1", y)
    .attr("x2", x2)
    .attr("y2", y)
    .attr("stroke-width", 2)
    .attr("stroke", "black");
  circleSelection = svgSelection.append("circle")
    .attr("cx", cx)
    .attr("cy", y)
    .attr("r", currentCircleSelection.r)

  currentLineSelection.x1 = x1;
  currentLineSelection.x2 = x2;
  currentCircleSelection.cx = cx;
  markCurrent()
});

function markCurrent() {
  var ccx = currentCircleSelection.cx;
  var ccy = currentCircleSelection.cy;

  $("circle").each(function(){
    if(parseInt($(this).attr("cx")) == ccx && parseInt($(this).attr("cy")) == ccy) {
      $(this).attr('fill', 'red');
    } else {
      $(this).attr('fill', 'black');
    }
  });
}

function simulate(step) {
  switch(step) {
    case 1:
      $("#firstProd").click()
      break;
    case 2:
      $("#secondProd").click()
      break;
    case 3:
      $("#thirdProd").click()
      break;
    case 4:
      $("#forthProd").click()
      break
    default:
      $("#firstProd").click()
  }
}

var steps = [4,4,4,4,2,2,2,1,1,1,1,1,3,3,3,3,4,4,4,2,2,1,1,1,1,1,1];

(function myLoop (i) {
  setTimeout(function () {
    simulate(steps[i])
    if (--i) myLoop(i);
  }, 1000)
})(steps.length);
