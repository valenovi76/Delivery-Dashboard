var chart = c3.generate({
     bindto: '#chart',
    data: {
        x: "Age_Status",
        url: '/data/created_completed.csv'
    },
    type:"pie"
});
