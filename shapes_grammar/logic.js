// Janek Kurzydlo
var currentLineSelection = {x1: 700, y1: 300, x2: 700, y2: 300}
var productions = []
var generations = []
var generationIndex = 1
var currentGenerationIndex = 1
var currentChildrenGeneration = []
var currentParentGeneration = []

$("#start").click(start)
$("#next").click(next)
$("#prev").click(prev)
$("#generate").click(generate)
$("#reset").click(reset)

$("#prev").hide()
$('#next').hide()
$("#generate").hide()
$("#reset").hide()

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

// Production 1 - right
var firstProd = d3.select("#firstProd");
firstProd.on("click", function(d) {

  productions.push("r")
  var y = currentLineSelection.y2
  var x2 = currentLineSelection.x2 + 40;
  var x1 = x2 - 40;

  lineSelection = svgSelection.append("line")
    .attr("x1", x1)
    .attr("y1", y)
    .attr("x2", x2)
    .attr("y2", y)
    .attr("stroke-width", 2)
    .attr("stroke", "black");

  currentLineSelection.x1 = x1;
  currentLineSelection.x2 = x2;
});

// Production 2 - down
var secondProd = d3.select("#secondProd");
secondProd.on("click", function(d) {

  productions.push("dn")
  var x = currentLineSelection.x2;
  var y2 = currentLineSelection.y2 + 40;
  var y1 = y2 - 40;

  lineSelection = svgSelection.append("line")
    .attr("x1", x)
    .attr("y1", y1)
    .attr("x2", x)
    .attr("y2", y2)
    .attr("stroke-width", 2)
    .attr("stroke", "black");

  currentLineSelection.y1 = y1;
  currentLineSelection.y2 = y2;
});

// Production 3 - up
var thirdProd = d3.select("#thirdProd");
thirdProd.on("click", function(d) {

  productions.push("up")
  var x = currentLineSelection.x2;
  var y2 = currentLineSelection.y2 - 40;
  var y1 = currentLineSelection.y2;

  lineSelection = svgSelection.append("line")
    .attr("x1", x)
    .attr("y1", y1)
    .attr("x2", x)
    .attr("y2", y2)
    .attr("stroke-width", 2)
    .attr("stroke", "black");

  currentLineSelection.y1 = y1;
  currentLineSelection.y2 = y2;
});

// Production 4 - left
var forthProd = d3.select("#forthProd");
forthProd.on("click", function(d) {

  productions.push("l")
  var y = currentLineSelection.y2
  var x2 = currentLineSelection.x2 - 40;
  var x1 = currentLineSelection.x2

  lineSelection = svgSelection.append("line")
    .attr("x1", x1)
    .attr("y1", y)
    .attr("x2", x2)
    .attr("y2", y)
    .attr("stroke-width", 2)
    .attr("stroke", "black");

  currentLineSelection.x1 = x1;
  currentLineSelection.x2 = x2;
});

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

function draw(productions, startLine) {
  currentLineSelection = startLine || {x1: 400, y1: 300, x2: 400, y2: 300}
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

function drawGroup(group) {
  clear()
  var startPoints = [
    {x1: 50, y1: 150, x2: 50, y2: 150},
    {x1: 500, y1: 150, x2: 500, y2: 150},
    {x1: 1000, y1: 150, x2: 1000, y2: 150},
    {x1: 50, y1: 500, x2: 50, y2: 500},
    {x1: 500, y1: 500, x2: 500, y2: 500},
    {x1: 1000, y1: 500, x2: 1000, y2: 500}
  ]
  _.each(group, function(productions, i) {
    draw(productions, startPoints[i])
  })
}

function clear() {
 $("svg").empty();
 currentLineSelection = {x1: 700, y1: 300, x2: 700, y2: 300}
 productions = []
  svgSelection = d3.select("svg")
    .attr("width", "100%")
    .attr("height", "10000px")
}

function productionGroups(n) {
  var nProduction = 8
  var groups = []

  _(n).times(function(itr) {
    var productions = generateProductions(nProduction)
    groups.push(productions)
  })

  return groups
}

function findBestGroups(groups) {
  // Taking best 10
  var allMarks = []

  _.each(groups, function(g, i) {
    var obj = {
      mark: markShapes2(g),
      index: i
    }
    allMarks.push(obj)
  })

  var marks = _.sortBy(allMarks, (obj) => (obj.mark))
  var partition =  _.partition(marks, (obj) => (obj.mark > 1))
  var greater = _.takeRight(partition[0], 2)
  var smaller = _.takeRight(partition[1], 4 - greater.length)
  var bestGroups = smaller.concat(greater)

  return _.map(bestGroups, (gr) => (groups[gr.index]))

}

function crossing(groups) {
  var pairs = _.chunk(groups, 2)
  var crossed = _.flatMap(pairs, function(e) {
    var nLeft = _.random(1, e[0].length)
    var nRight = e[0].length - nLeft

    var new1 = _.take(e[0], nLeft).concat(_.takeRight(e[1], nRight))
    var new2 = _.take(e[1], nLeft).concat(_.takeRight(e[0], nRight))

    return [new1, new2]
  })

  return crossed
}

function process(children, parents = []) {
  var bestChildren = findBestGroups(children)

  if (bestChildren.length < 6) {
   bestChildren = bestChildren.concat(_.take(parents, 6 - bestChildren.length))
  }

  var newChildren = crossing(bestChildren)
  return [newChildren, bestChildren]
}

function start() {
  var startGroup = productionGroups(6)
  $('#start').hide()
  $("#generation").text(generationIndex)

  var processed = process(startGroup, startGroup)
  currentChildrenGeneration = processed[0]
  currentParentGeneration = processed[1]

  generations.push(currentChildrenGeneration)
  drawGroup(currentChildrenGeneration)

  $('#generate').show()
  $("#reset").show()
}

function generate() {
  generationIndex += 1
  currentGenerationIndex += 1

  $("#generation").text(generationIndex)

  var processed = process(currentChildrenGeneration, currentParentGeneration)
  currentChildrenGeneration = processed[0]
  currentParentGeneration = processed[1]

  generations.push(currentChildrenGeneration)
  drawGroup(currentChildrenGeneration)

  $('#prev').show()
}

function next() {
  currentGenerationIndex += 1
  $("#generation").text(currentGenerationIndex)
  drawGroup(generations[currentGenerationIndex - 1])

  if (currentGenerationIndex == generationIndex) {
    $('#next').hide()
  }

  $('#prev').show()
}

function prev() {
  currentGenerationIndex -= 1
  $("#generation").text(currentGenerationIndex)
  drawGroup(generations[currentGenerationIndex - 1])

  if (currentGenerationIndex == 1) {
    $('#prev').hide()
  }

  $('#next').show()
}


function reset() {
  location.reload();
}


// Flow
// var groups = productionGroups(100)
// var bestGroups  = findBestGroups(groups)
// var mutation = mutation(bestGroups)
// draw(bestGroups[0])
// clear()
// draw(mutation)
