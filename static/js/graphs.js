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

//Order Type js
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