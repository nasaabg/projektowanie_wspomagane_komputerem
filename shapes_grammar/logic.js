// Janek Kurzydlo
var currentLineSelection = {x1: 700, y1: 300, x2: 700, y2: 300}
var currentCircleSelection = {cx: 700, cy: 300, r: 5}
var points = []
var productions = []

// Initialization
var svgSelection = d3.select("svg")
  .attr("width", "100%")
  .attr("height", "10000px")

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

  productions.push("r")
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
  points.push({x: currentCircleSelection.cx, y: currentCircleSelection.cy})
  markShapes2(productions)
});

// Production 2 - down
var secondProd = d3.select("#secondProd");
secondProd.on("click", function(d) {

  productions.push("dn")
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
  points.push({x: currentCircleSelection.cx, y: currentCircleSelection.cy})
  markShapes2(productions)
});

// Production 3 - up
var thirdProd = d3.select("#thirdProd");
thirdProd.on("click", function(d) {

  productions.push("up")
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
  points.push({x: currentCircleSelection.cx, y: currentCircleSelection.cy})
  markShapes2(productions)
});

// Production 4 - left
var forthProd = d3.select("#forthProd");
forthProd.on("click", function(d) {

  productions.push("l")
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
  points.push({x: currentCircleSelection.cx, y: currentCircleSelection.cy})
  markShapes2(productions)
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

function squ1(point) {
  var uniq_points = _.uniqWith(points, _.isEqual)
  var flags = [false, false, false]

  _.each(uniq_points, function (p) {
    if (point.x - 40 == p.x && point.y == p.y) {
      flags[0] = true
    } else if (point.x - 40 == p.x && point.y - 40 == p.y) {
      flags[1] = true
    } else if (point.x == p.x && point.y - 40 == p.y) {
      flags[2] = true
    }
  })

  return _.every(flags)
}

function squ2(point) {
  var uniq_points = _.uniqWith(points, _.isEqual)
  var flags = [false, false, false]

  _.each(uniq_points, function (p) {
    if (point.x + 40 == p.x && point.y == p.y) {
      flags[0] = true
    } else if (point.x + 40 == p.x && point.y - 40 == p.y) {
      flags[1] = true
    } else if (point.x == p.x && point.y - 40 == p.y) {
      flags[2] = true
    }
  })

  return _.every(flags)
}

function squ3(point) {
  var uniq_points = _.uniqWith(points, _.isEqual)
  var flags = [false, false, false]

  _.each(uniq_points, function (p) {
    if (point.x + 40 == p.x && point.y == p.y) {
      flags[0] = true
    } else if (point.x + 40 == p.x && point.y + 40 == p.y) {
      flags[1] = true
    } else if (point.x == p.x && point.y + 40 == p.y) {
      flags[2] = true
    }
  })

  return _.every(flags)
}

function squ4(point) {
  var uniq_points = _.uniqWith(points, _.isEqual)
  var flags = [false, false, false]

  _.each(uniq_points, function (p) {
    if (point.x - 40 == p.x && point.y == p.y) {
      flags[0] = true
    } else if (point.x - 40 == p.x && point.y + 40 == p.y) {
      flags[1] = true
    } else if (point.x == p.x && point.y + 40 == p.y) {
      flags[2] = true
    }
  })

  return _.every(flags)
}

function markShapes() {
  var uniq_points = _.uniqWith(points, _.isEqual)

  var marks =  _.map(uniq_points, (p) => (
    squ1(p) || squ2(p) || squ3(p) || squ4(p)
  ))

  var possitive = _.filter(marks, (x) => (x == true)).length
  if(possitive > 0) {
    valueOfMark = (possitive/uniq_points.length * 100).toFixed(2)
    $("#ocena").text(valueOfMark)
  } else {
    valueOfMark = (possitive/uniq_points.length * 100).toFixed(3)
    $("#ocena").text(0)
  }

  return possitive
}

function markShapes2(productions) {
  ratio = currentRatio(productions)
  value = (ratio.r * ratio.dn) / (ratio.l * ratio.up)
  return value
}

function currentRatio(productions) {
  var counts = {
    r: 1,
    l: 1,
    up: 1,
    dn: 1,
  };

  _.each(productions, (p) => (counts[p] += 1))
  return counts
}


function generateProductions(n) {
  var values = ["r","l","up","dn"]
  var generatedValues = []

  _(n).times(function(itr) {
    var production = values[Math.floor(Math.random() * values.length)];
    generatedValues.push(production)
  })

  return generatedValues
}

function draw(productions) {
  $("#ocena").text(markShapes2(productions))
  _.each(productions, function(p) {
    switch(p) {
      case "r":
        $("#firstProd").click()
        break;
      case "dn":
        $("#secondProd").click()
        break;
      case "up":
        $("#thirdProd").click()
        break;
      case "l":
        $("#forthProd").click()
        break
      default:
        $("#firstProd").click()
    }
  })
}

function clear() {
  $("svg").empty();
currentLineSelection = {x1: 700, y1: 300, x2: 700, y2: 300}
 currentCircleSelection = {cx: 700, cy: 300, r: 5}
 points = []
 productions = []
  svgSelection = d3.select("svg")
    .attr("width", "100%")
    .attr("height", "10000px")

  circleSelection = svgSelection.append("circle")
    .attr("cx", 700)
    .attr("cy", 300)
    .attr("r", 5)
    .style("fill", "black");

}

function productionGroups(n) {
  var groups = []

  _(n).times(function(itr) {
    var productions = generateProductions(_.random(0, 100))
    groups.push(productions)
  })

  return groups
}

function findBestGroups(groups) {
  var all_marks = []

  _.each(groups, function(g, i) {
    var obj = {
      mark: markShapes2(g),
      index: i
    }
    all_marks.push(obj)
  })

  var marks = _.sortBy(all_marks, (obj) => (obj.mark))
  var partition =  _.partition(marks, (obj) => (obj.mark > 1))
  var greater = _.takeRight(partition[0], 10)
  var smaller = _.takeRight(partition[1], greater.length)
  var bestGroups = smaller.concat(greater)

  return _.map(bestGroups, (gr) => (groups[gr.index]))

}


function mutation(bestGroups) {
  var mutation = _.flatten(bestGroups)
  markShapes2(mutation)
  return mutation
}



// Flow
// var groups = productionGroups(100)
// var bestGroups  = findBestGroups(groups)
// var mutation = mutation(bestGroups)
// draw(bestGroups[0])
// clear()
// draw(mutation)
