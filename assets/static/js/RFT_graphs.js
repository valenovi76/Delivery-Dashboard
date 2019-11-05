
// Make graphs function
function makeGraphs(error, orderData) {

    var ndx = crossfilter(orderData);


orderData.forEach(function(d){
d.CT_Ex_Delayed_Days=parseInt(d.CT_Ex_Delayed_Days)})





    show_RFT_OnTime_Line(ndx);


    dc.renderAll();
}


//Selector js
function show_wip_group_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Channel'));
    var group = dim.group();
    var select = dc.selectMenu("#RFT_Channel_selector")
        .dimension(dim)
        .group(group);

}
function show_product_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Product'));
    var group = dim.group();
    var select = dc.selectMenu("#RFT_product_selector")
        .dimension(dim)
        .group(group);

}
function show_project_selector(ndx){
    var dim=ndx.dimension(dc.pluck('Project'));
    var group= dim.group();
    var select = dc.selectMenu("#RFT_project_selector")
        .dimension(dim)
        .group(group);

}

//RFT onTime line js
function show_RFT_OnTime_Line(ndx) {
function RFTOnTimePerfByMonth(dimension, On_Time) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.On_Time === "On_Time") {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.On_Time == On_Time) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
}
var dim = ndx.dimension(dc.pluck('Completed_Month'));
var OnTimeByMonth = RFTOnTimePerfByMonth(dim, "On-Time");

dc.lineChart("#RFT_OnTime_Line")
.width(400)
.height(300)
.margins({top: 30, right: 40, bottom: 50, left: 50})
.dimension(dim)
.group(OnTimeByMonth)
.transitionDuration(500)
.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.elasticY(true)
.xAxisLabel("FY 2019-2020 Month")
.yAxis().ticks(20);
};