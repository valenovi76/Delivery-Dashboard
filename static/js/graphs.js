queue()
    .defer(d3.csv,"data/orders.csv")
    .await(makeGraphs);
    
function makeGraphs(error,ordersData){
    
}
