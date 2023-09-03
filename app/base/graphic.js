let graphic_home 
let pg = document.body.getAttribute('page')
function make_graphic(page){
    if(page == 'home'){
        const gphc_home = document.getElementById('myChart_home');
        graphic_home = new Chart(gphc_home, {
            type: 'line',
            data: {
                labels: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun','jul','ago','set','out','nov','dez','out','nov','dez'],
                datasets: [{
                    label: '$ ',
                    backgroundColor: '#2196f3',
                    borderColor:'#2196f3',
                    data: [12, 19, 3, 5, 2, 3,8,10,6,12,11,18],
                    borderWidth: 2,
                    tension: 0.5,
                    pointBorderWidth:false,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            color: "#2196f3"
                        },
                        grid: {
                            display: false,
                        },
                    },
                y: {
                    display:false,
                    drawBorder: false,
                        beginAtZero: true ,
                        grid: {
                            display: false,
                        },
                    },
                    
                },
                plugins: {
                    legend: {
                        display: false, 
                    },  
                }
            }
        });
    }
}
