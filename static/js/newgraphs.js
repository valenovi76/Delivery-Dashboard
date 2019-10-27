
var completedChart = dc.lineChart('#completed-chart');
var createdChart = dc.lineChart('#created-chart');
var WipChart= dc.pieChart('#wip-chart');
var AvgCTChart = dc.lineChart('#AvgCT-chart');
var RFTPerfChart = dc.barChart('#RFTPerf-chart');

queue()
.defer(d3.csv, "data/orders.csv"),

function (data) {
    var dateFormatSpecifier = '%m/%d/%Y';
    var dateFormat = d3.time.format(dateFormatSpecifier);
    var dateFormatParser = d3.time.format(dateFormatSpecifier).parse;
    var numberFormat = d3.format('.2f');

    data.forEach(function (d) {
        d.dd = dateFormatParser(d.date);
        d.month = d3.timeMonth(d.dd); // pre-calculate month for better performance
        d.close = +d.close; // coerce to number
        d.open = +d.open;
    });
},
    function (error, rows) {
  console.log(rows);
dc.renderAll();
};