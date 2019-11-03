//load data
queue()
.defer(d3.csv, "/data/orders.csv")
.await(makeGraphs);


// Make graphs function
function makeGraphs(error, orderData) {

    var ndx = crossfilter(orderData);


orderData.forEach(function(d){
d.CT_Ex_Delayed_Days=parseInt(d.CT_Ex_Delayed_Days)})




    show_wip_group_selector(ndx);
    show_product_selector(ndx);
    show_project_selector(ndx);
    show_created(ndx);
    show_completed(ndx);
    show_order_order_type(ndx);
    show_ct_avg(ndx);
    show_SLT_perf(ndx);
    show_ontime_late(ndx);
    show_percent_RFT_OnTime(ndx);
    show_percent_CT_Pass(ndx);
    show_monthly_delivery(ndx);



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

// KPIS values -RFT %

function show_percent_RFT_OnTime(ndx) {
    var percentageThatAreOnTime = ndx.groupAll().reduce(
        function(p, v) {
            p.total++;
                if(v.On_Time === "On-Time") {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.On_Time === "On-Time") {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
    );

    dc.numberDisplay("#RFTPerc")
        .formatNumber(d3.format(".1%"))
        .valueAccessor(function (d) {
            if (d.count == 0) {
                return 0;
            } else {
                return ( d.match/d.total );
            }
        })
        .group(percentageThatAreOnTime)
}

// KPIS values - CT %

function show_percent_CT_Pass(ndx) {
    var percentageThatArePassed = ndx.groupAll().reduce(
        function(p, v) {
            p.total++;
                if(v.SLT_Status === "Pass") {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.SLT_Status === "Pass") {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
    );

    dc.numberDisplay("#CTPerc")
        .formatNumber(d3.format(".1%"))
        .valueAccessor(function (d) {
            if (d.count == 0) {
                return 0;
            } else {
                return ( d.match/d.total );
            }
        })
        .group(percentageThatArePassed)
}

//KPIS values - Monthly deliveries
function show_monthly_delivery(ndx){
    var avgMonthlyDeliveries = ndx.groupAll().reduce(
        function(p, v) {
            p.total++;
                if(v.Order_Status === "Completed") {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.Order_Status === "Completed") {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
    );

    dc.numberDisplay("#avg_monthly_delivery")
        .formatNumber(d3.format(".1f"))
        .valueAccessor(function (d) {
            if (d.total == 0) {
                return 0;
            } else {
                return ( d.match/6 );
            }
        })
        .group(avgMonthlyDeliveries)
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
function show_order_order_type(ndx) {
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
function show_SLT_perf(ndx){

    function SLTPerfByMonth(dimension, SLT_Status) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.SLT_Status == SLT_Status) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.SLT_Status == SLT_Status) {
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
    var PassByMonth = SLTPerfByMonth(dim, "Pass");
    var FailByMonth = SLTPerfByMonth(dim, "Fail");

    dc.barChart("#ct_perf")
        .width(400)
        .height(300)
        .dimension(dim)
        .group(PassByMonth, "Pass")
        .stack(FailByMonth, "Fail")
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

  //On time vs Late stacked-bars graph

   function show_ontime_late(ndx) {

    function RFTPerfByMonth(dimension, On_Time) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.On_Time == On_Time) {
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

    var dim = ndx.dimension(dc.pluck("Completed_Month"));
    var OnTimeByMonth = RFTPerfByMonth(dim, "On-Time");
    var LateByMonth = RFTPerfByMonth(dim, "Late");

    dc.barChart("#ontime_perf")
        .width(400)
        .height(300)
        .dimension(dim)
        .group(OnTimeByMonth, "On-Time")
        .stack(LateByMonth, "Late")
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