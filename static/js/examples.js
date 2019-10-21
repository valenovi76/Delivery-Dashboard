var chart = c3.generate({
    bindto: '#chart',
    data: {
    url: '/data/c3_test.csv',
    columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
  }

});