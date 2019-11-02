//load data
//queue()
//.defer(d3.csv, "/data/orders.csv")
//.await(makeGraphs);


// Make graphs function
function makeGraphs(error, orderData) {

    var ndx = crossfilter(orderData);

    show_project_selector_RFT(ndx);
    show_product_selector_RFT(ndx);
    show_channel_group_selector(ndx);
    show_ontime_late(ndx);
    show_ct_avg(ndx);


    dc.renderAll();
}


//Selector js
function show_channel_group_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Channel'));
    var group = dim.group();
    var select = dc.selectMenu("#RFT_Channel_selector")
        .dimension(dim)
        .group(group);

}
function show_product_selector_RFT(ndx){
    var dim = ndx.dimension(dc.pluck('Product'));
    var group = dim.group();
    var select = dc.selectMenu("#RFT_product_selector")
        .dimension(dim)
        .group(group);

}
function show_project_selector_RFT(ndx){
    var dim=ndx.dimension(dc.pluck('Project'));
    var group= dim.group();
    var select = dc.selectMenu("#RFT_project_selector")
        .dimension(dim)
        .group(group);

}


//ontime vs late RFT page

    function show_ontime_late(ndx){
    var dim = ndx.dimension(dc.pluck('On_Time'));
    var group = dim.group();

    dc.barChart("#RFT_OnTime_Late")
    .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("RFTPerf")
        .yAxis().ticks(20);
   }

//ontime % performance

function show_ct_avg(ndx){
var dim = ndx.dimension(dc.pluck("Completed_Month"));

function add_item(p,v){
p.count ++;
p.total_onTime += v.SLT_Status;
p.perc = p.total_onTime/p.count*100;
return p;
}
function remove_item(p,v){
p.count--;
if(p.count==0){
p.total=0;
p.perc=0;}else{
p.total_onTime -= v.SLT_Status;
p.perc = p.total_onTime/p.count*100;
}
return p;
}
function initialise(){
    return{count:0, total:0, perc:0};
}


var group= dim.group().reduce(add_item,remove_item,initialise);


dc.lineChart("#RFT_Perc")
.width(400)
.height(300)
.margins({top: 10, right: 50, bottom: 30, left: 50})
.dimension(dim)
.group(group)
.valueAccessor(function(d){
return d.value.perc})
.transitionDuration(500)
.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.elasticY(true)
.xAxisLabel("FY 2019-2020 Month")
.yAxis().ticks(20);

}