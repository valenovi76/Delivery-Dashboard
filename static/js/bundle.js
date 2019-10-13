
var chart = c3.generate({
    bindto: '#chart',
    data: {

        url:'/data/orders.csv',
        x: 'Order_Status',
                type: 'line'

        },
    tooltip: {
        show: false
    },
            point: {
        show: false
    }
});