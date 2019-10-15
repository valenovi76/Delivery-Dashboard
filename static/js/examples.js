var ontimelatecount = d3.nest()

  .key(function(d) { return d.On_Time; })
  .rollup(function(v) { return v.length; })
  .entries(data);
})

function show_created_completed(ndx) {
    //assign months
var parseDate = moment(CHD,"MM-DD-YYYY");
var formatMonth = moment(CHD,"MMM");

    transactions.forEach(function(d) {
      d.date = +parseDate(d.CHD);
      var month = formatMonth(d.CHD);
      d.month = month;
    });

    //group by month and then category
    var byCategory = d3.nest()
      .key(function(d) { return d.month; })
      .entries(orderData);

    var dim = ndx.dimension(dc.pluck('month'));
    var group = dim.group();

    dc.barChart("#bar_line")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Completed")
        .yAxis().ticks(20);

    function newFunction() {
        return d3.nest()
            .key(function(d) { return d.CHD_Month; })
            .rollup(function(v) { return v.length; })
            .entries(ndx);
    }
};
