queue()
    .defer(d3.csv, "data/inprogress_orders.csv")

    .await(makeGraphs);

function makeGraphs(error, orderData) {
    var ndx = crossfilter(orderData);

   show_wip_group_selector(ndx);
    show_order_wip(ndx);

    dc.renderAll();
}

function show_wip_group_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Group'));
    var group = dim.group();

    dc.selectMenu("#wip_group_selector")
       .dimesion(dim)
        .group(group);

}

//function show_order_wip(ndx) {
    //var dim = ndx.dimension(dc.pluck('Age_Status'));
    //var group = dim.group();

    //dc.barChart("#wip")
      //  .width(400)
        //.height(300)
        //.margins({top: 10, right: 50, bottom: 30, left: 50})
        //.dimension(dim)
        //.group(group)
        //.transitionDuration(500)
        //.x(d3.scale.ordinal())
        //.xUnits(dc.units.ordinal)
        //.elasticY(true)
        //.xAxisLabel("Age_Status")
        //.yAxis().ticks(20);
//}
