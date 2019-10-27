//load data
queue()
.defer(d3.csv, "/data/orders.csv")
.await(makeGraphs);

// Make graphs function
function makeGraphs(error, orderData) {

    var ndx = crossfilter(orderData);
    //var completeOrders = ndx.dimension(function(d){return d.Completed_Month});
//completeOrders.filter(function(d){return d ==="N/A"})

orderData.forEach(function(d){
d.CT_Ex_Delayed_Days=parseInt(d.CT_Ex_Delayed_Days)})

//orderData.forEach(function(d){
//d.Created_Month= d3.time.format("%m-%Y").parse(d.Created_Month)})


    show_wip_group_selector(ndx);
    show_product_selector(ndx);
    show_project_selector(ndx);
    show_created(ndx);
    show_completed(ndx);
    show_order_wip(ndx);
    show_ct_avg(ndx);
    show_ontime_late(ndx);
    //show_order_type(ndx);


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

//created line js
function show_created(ndx) {
var dim = ndx.dimension(dc.pluck('Created_Month'));
var group =dim.group();

dc.lineChart("#created")
.width(400)
.height(300)
.margins({top: 30, right: 40, bottom: 50, left: 50})
.dimension(dim)
.group(group)
.transitionDuration(500)
.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.elasticY(true)
.xAxisLabel("FY 2019-2020 Month")
.yAxis().ticks(20);
 }

//completed line js
function show_completed(ndx) {
var dim = ndx.dimension(dc.pluck('Completed_Month'));
dim.filter(function(d) {return d >0});
var group = dim.group();

dc.lineChart("#completed")

.width(400)
.height(300)
.margins({top: 30, right: 40, bottom: 50, left: 50})
.dimension(dim)
.group(group)
.transitionDuration(500)
.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.elasticY(true)
.xAxisLabel("FY 2019-2020 Month")
.yAxis().ticks(20);
 }

//WIP pie js
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
//CT Avg line js
function show_ct_avg(ndx){
var dim = ndx.dimension(dc.pluck("Completed_Month"));

function add_item(p,v){
p.count ++;
p.total += v.CT_Ex_Delayed_Days;
p.average = p.total/p.count;
return p;
}
function remove_item(p,v){
p.count--;
if(p.count==0){
p.total=0;
p.average=0;}else{
p.total -= v.CT_Ex_Delayed_Days;
p.average = p.total/p.count;
}
return p;
}
function initialise(){
    return{count:0, total:0, average:0};
}


var group= dim.group().reduce(add_item,remove_item,initialise);


dc.lineChart("#ct_avg")
.width(400)
.height(300)
.margins({top: 10, right: 50, bottom: 30, left: 50})
.dimension(dim)
.group(group)
.valueAccessor(function(d){
return d.value.average})
.transitionDuration(500)
.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.elasticY(true)
.xAxisLabel("FY 2019-2020 Month")
.yAxis().ticks(20);

}
//CT perf js

//OnTime vs Late js
function show_ontime_late(ndx){
    function rankbyrftperf (dimension,rank){
        return dimension.group().reduce(
        function(p,v){
            p.total++;
                if(v.rank == rank) {
                    p.match++;
                }
                return p;
            },

        function (p, v) {
                p.total--;
                if(v.rank == rank) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    var dim = ndx.dimension(dc.pluck("Completed_Month"));
    var rftOnTime = rankbyrftperf(dim,"On-Time");
    var rftLate = rankbyrftperf(dim,"Late");



    dc.barChart("#ontime_perf")
    .width(400)
    .height(300)
    .dimension(dim)
    .group(rftOnTime,"On-Time")
    .stack(rftLate, "Late")
    .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total) * 100;
            } else {
                return 0;
            }
        })
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .legend(dc.legend().x(320).y(20).itemHeight(15).gap(5))
    .margins({top: 10, right: 100, bottom: 30, left: 30});
}
