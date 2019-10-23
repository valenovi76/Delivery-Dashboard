//load data
queue()
.defer(d3.csv, "/data/orders.csv")
.await(makeGraphs);


//d3.csv("/data/orders.csv").then(function(data) {


// Make graphs function
function makeGraphs(error, orderData) {
    var ndx = crossfilter(orderData);

    show_wip_group_selector(ndx);
    show_product_selector(ndx);
    show_project_selector(ndx);
    show_created(ndx);
    show_completed(ndx);
    show_order_wip(ndx);
    show_order_type(ndx);


    dc.renderAll();
}


//Selector js
function show_wip_group_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Channel'));
    var group = dim.group();
    var select = dc.selectMenu("#wip_group_selector")
        .dimension(dim)
        .group(group);

}
function show_product_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Product'));
    var group = dim.group();
    var select = dc.selectMenu("#product_selector")
        .dimension(dim)
        .group(group);

}
function show_project_selector(ndx){
    var dim=ndx.dimension(dc.pluck('Project'));
    var group= dim.group();
    var select = dc.selectMenu("#project_selector")
        .dimension(dim)
        .group(group);
}

//created-completed js
function show_created(ndx) {
var dim = ndx.dimension(dc.pluck('Created_Month'));
var group = dim.group();

dc.lineChart("#created")
.width(400)
.height(300)
.margins({top: 10, right: 50, bottom: 30, left: 50})
.dimension(dim)
.group(group)
.transitionDuration(500)
.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.elasticY(true)
.xAxisLabel("FY 2019-2020 Month")
.yAxis().ticks(20);
 }

//completed line
function show_completed(ndx) {
var dim = ndx.dimension(dc.pluck('Completed_Month'));
var group = dim.group();

dc.lineChart("#completed")
.width(400)
.height(300)
.margins({top: 10, right: 50, bottom: 30, left: 50})
.dimension(dim)
.group(group)
.transitionDuration(500)
.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.elasticY(true)
.xAxisLabel("FY 2019-2020 Month")
.yAxis().ticks(20);
 }

//WIP js
function show_order_wip(ndx) {
    var dim = ndx.dimension(dc.pluck('Age_Status'));
    var group = dim.group();

    dc.pieChart("#wip")
        .width(400)
        .height(300)
        .slicesCap(4)
        .innerRadius(100)
        .dimension(dim)
        .group(group)
        .legend(dc.legend())
}

//Order Type js (pie)
function show_order_type(ndx) {
    var dim = ndx.dimension(dc.pluck('On_Time'));
    var group = dim.group();



        dc.barChart("#ontime_perf")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("OnTime vs Late")
        .yAxis().ticks(20);
}
