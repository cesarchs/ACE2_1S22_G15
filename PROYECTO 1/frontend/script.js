//Select canvas from DOM
const ctx = document.querySelector('#chart1');
const ctx2 = document.querySelector('#chart2');
const ctx3 = document.querySelector('#chart3');
const ctx4 = document.querySelector('#chart4');
const ctx5 = document.querySelector('#chart5');

//Data
const chart1Data = [0, 0, 0, 0, 0, 0];
const chart2Data = [0, 0, 0, 0, 0, 0];
const chart3Data = [0, 0, 0, 0, 0, 0];
const chart4Data = [0, 0, 0, 0, 0, 0];
const chart5Data = [0, 0, 0, 0, 0, 0];

//Labels
const labels = ['17:01', '17:02', '17:03', '17:04', '17:05', '17:06'];

//URL
const url = 'http://localhost:8080';

const myChart1 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Cantidad de susciedad en el agua',
            data: chart1Data,
            borderColor: 'rgb(8, 196, 52)',
            backgroundColor: 'rgb(8, 196, 52)'
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(ctx) {
                        const label = ctx.dataset.label;
                        return `${label}: ${ctx.parsed.y} fotodiodos`;
                    }
                }
            }
        }
    }
});

const myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Humedad en el suelo',
            data: chart2Data,
            backgroundColor: 'rgb(6, 64, 145)',
            borderColor: 'rgb(6, 64, 145)',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(ctx) {
                        const label = ctx.dataset.label;
                        return `${label}: ${ctx.parsed.y}%`;
                    }
                }
            }
        }
    }
});

const myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Cantidad de suciedad en el agua postfiltrada',
            data: chart3Data,
            backgroundColor: 'rgb(6, 64, 145)',
            borderColor: 'rgb(6, 64, 145)',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(ctx) {
                        const label = ctx.dataset.label;
                        return `${label}: ${ctx.parsed.y} fotodiodos`;
                    }
                }
            }
        }
    }
});

const myChart4 = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Cantidad de agua filtrada',
            data: chart4Data,
            backgroundColor: 'rgb(6, 64, 145)',
            borderColor: 'rgb(6, 64, 145)',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(ctx) {
                        const label = ctx.dataset.label;
                        return `${label}: ${ctx.parsed.y} cm`;
                    }
                }
            }
        }
    }
});

const myChart5 = new Chart(ctx5, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Cantidad de agua filtrada',
            data: chart5Data,
            backgroundColor: 'rgb(6, 64, 145)',
            borderColor: 'rgb(6, 64, 145)',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(ctx) {
                        const label = ctx.dataset.label;
                        return `${label}: ${ctx.parsed.y} cm`;
                    }
                }
            }
        }
    }
});

//Get data by date
function getDataForGraphs() {
    fetch(`${url}/${document.querySelector('#day').value}`).then(
        res => res.json()
    ).then(
        data => {
            labels.length = 0;
            chart1Data.length = 0;
            chart2Data.length = 0;
            chart3Data.length = 0;
            chart4Data.length = 0;
            chart5Data.length = 0;
            for(let i=0; i<data.labels.length; i++) {
                labels[i] = data.labels[i];
                chart1Data[i] = data.Agua_vivienda[i];
                chart2Data[i] = data.humedad[i];
                chart3Data[i] = data.Agua_filtrada[i];
                chart4Data[i] = data.Distancia[i];
                chart5Data[i] = data.Distancia[i];
            }
            updateCharts();
        }
    ).catch(
        err => {
            console.log(err);
            alert('Error al mostrar los datos');
        }
    );
}

function updateCharts() {
    myChart1.update();
    myChart2.update();
    myChart3.update();
    myChart4.update();
    myChart5.update();
}