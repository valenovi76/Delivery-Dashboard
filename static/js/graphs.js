//load data
queue()
    .defer(d3.csv, "data/orders.csv")


    .await(makeGraphs);

// Make graphs function
function makeGraphs(error, orderData) {
    var ndx = crossfilter(orderData);

   show_wip_group_selector(ndx);
    show_order_wip(ndx);
show_order_type(ndx);

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
//line and bar
 var svg = d3.select("body").append("svg")
      .attr("width", 960)
      .attr("height", 500);

    function generate_data() {
      return d3.range(10).map(function() {
        return Math.random();
      });
    }

    var data = generate_data();

    var y = d3.scaleLinear()
    	.domain([0, d3.max(data)])
    	.range([0, +d3.select("svg").attr("height")/3]);

    var r = d3.scaleLinear()
    	.domain([0, d3.max(data)])
    	.range([2, 10]);

    // ordinal
    var x = d3.scaleBand()
    	.domain(d3.range(10))
    	.range([0, +d3.select("svg").attr("width")]);

		var s = svg.selectAll("rect").data(data);

    s.enter()
     .append("rect")

     svg.selectAll("rect").data(data)
	    .attr("width", function(d, i) { return x.bandwidth(); })
      .attr("height", function(d, i) { return y(d); })
      .attr("x", function(d, i) { return x(i); })
      .attr("y",  function(d) { return 200 - y(d); })

    svg.selectAll("rect")
	    .attr("width", function(d, i) { return x.bandwidth(); })
      .attr("height", function(d, i) { return y(d); })
     	.on("mouseenter", function(d) {
      	if(typeof d.__clicked === "undefined" || d.__clicked !== true) {
	      	d3.select(this).style("fill", "red")
        }
    	})
    	.on("mouseleave", function(d) {
      	if(typeof d.__clicked === "undefined" || d.__clicked !== true) {
	      	d3.select(this).style("fill", "white")
        }
    	})
       .on("click", function(d) {
      	d3.select(this).transition().duration(1000).style("fill", "green")
        d.__clicked = true;
    	});

		var s = svg.selectAll("circle").data(data);

    s.enter()
     	.append("circle")

     svg.selectAll("circle").data(data)
      .attr("cx", function(d, i) { return x(i) + x.bandwidth() / 2; })
      .attr("cy", function(d) { return 200 - y(d); })
     	.attr("r", function(d) { return r(d); });

    var line = d3.line()
     .x(function(d, i) { return x(i) + x.bandwidth() /2 ; })
     .y(function(d) { return 200 - y(d); });


		var s = svg.selectAll("path").data([data]).enter()
    	.append("path")
    	.attr("d", function(d) { return line(d); })