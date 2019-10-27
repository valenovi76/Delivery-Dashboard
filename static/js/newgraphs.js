d3.csv( "/data/orders.csv", function (data){
var ndx = crossfilter(data);
var completeOrders = ndx.dimension(function(d){return d.Completed_Month});
completeOrders.filter(function(d){return d !=="N/A"});
})
