//load data
queue()
.defer(d3.csv, "/data/orders.csv")
.await(makeGraphs);


//d3.csv("/data/orders.csv").then(function(data) {


// Make graphs function
function makeGraphs(error, orderData) {
    var ndx = crossfilter(orderData);

    show_wip_group_selector(ndx);
    show_order_wip(ndx);
    show_order_type(ndx);
    show_created_completed(ndx);

    dc.renderAll();
}


//Selector js
function show_wip_group_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Order_Type'));
    var group = dim.group();


    var select = dc.selectMenu("#wip_group_selector")
        .dimension(dim)
        .group(group);

}

//WIP js
function show_order_wip(ndx) {
    var dim = ndx.dimension(dc.pluck('Age_Status'));
    var group = dim.group();

    dc.barChart("#wip")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Age_Status")
        .yAxis().ticks(20);
}

//Order Type js (pie)
function show_order_type(ndx) {
    var dim = ndx.dimension(dc.pluck('Order_Type'));
    var group = dim.group();

    dc.pieChart("#order_type")
        .width(400)
        .height(300)
        .slicesCap(4)
        .innerRadius(100)
        .dimension(dim)
        .group(group)
        .legend(dc.legend())
}
//created-completed js
//function show_created_completed(ndx) {
//var dim = ndx.dimension(dc.pluck('Age_Status'));
    //var group = dim.group();

   // dc.lineChart("#bar_line")
       // .width(400)
       // .height(300)
        //.margins({top: 10, right: 50, bottom: 30, left: 50})
      //  .dimension(dim)
      //  .group(group)
      //  .transitionDuration(500)
      //  .x(d3.scale.ordinal())
      //  .xUnits(dc.units.ordinal)
      //  .elasticY(true)
      //  .xAxisLabel("Age_Status")
      //  .yAxis().ticks(20);
 //}


function show_created_completed(ndx){
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data

//d3.csv("data/orders.csv", function(data) {
  // List of subgroups = header of the csv files = soil condition here

  var subgroups = ndx.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(orderData, function(d){return(d.group)}).keys()

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 40])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Another scale for subgroup position?
  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(ndx)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });

}
