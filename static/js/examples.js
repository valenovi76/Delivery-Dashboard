var ontimelatecount = d3.nest()

  .key(function(d) { return d.On_Time; })
  .rollup(function(v) { return v.length; })
  .entries(data);
})