let labels = [
    '5',
    '4',
    '3',
    '2',
    '1'
];

const url = 'http://localhost:8080';
let dataInternalTemperature = [0, 0, 0, 0, 0];
let dataExternalTemperature = [0, 0, 0, 0, 0];
let dataHumidityGround = [0, 0, 0, 0, 0];
let dataAmountOfLight = [0, 0, 0, 0, 0];
let dataCO2 = [0, 0, 0, 0, 0];

const dataChart1 = {
    labels,
    datasets: [
        {
            label: 'Temperatura Interior',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataInternalTemperature
        },
        {
            label: 'Temperatura Ambiente',
            backgroundColor: 'rgba(190, 10, 204, 0.8)',
            borderColor: 'rgba(190, 10, 204, 0.8)',
            data: dataExternalTemperature
        }
    ]
};

const dataChart2 = {
    labels,
    datasets: [
        {
            label: 'Temperatura Interior',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataInternalTemperature,
            yAxisID: 'y'
        },
        {
            label: 'Humedad en la tierra',
            backgroundColor: 'rgb(156, 108, 45)',
            borderColor: 'rgb(156, 108, 45)',
            data: dataHumidityGround,
            yAxisID: 'y1'
        }
    ]
};

const dataChart3 = {
    labels,
    datasets: [
        {
            label: 'Temperatura Interior',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataInternalTemperature,
            yAxisID: 'y'
        },
        {
            label: 'Cantidad de luz',
            backgroundColor: 'rgb(130, 218, 245)',
            borderColor: 'rgb(130, 218, 245)',
            data: dataAmountOfLight,
            yAxisID: 'y1'
        }
    ]
};

const dataChart4 = {
    labels,
    datasets: [
        {
            label: 'Calidad del aire',
            backgroundColor: 'rgb(3, 236, 252)',
            borderColor: 'rgb(3, 236, 252)',
            data: dataCO2
        }
    ]
};

const chart1Config = {
    type: 'line',
    data: dataChart1,
    options: {
        animation: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hora'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Grados Centigrados (°C)'
                },
                min: 0,
                max: 100
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.formattedValue + ' °C';
                    }
                }
            }
        }
    }
};

const chart2Config = {
    type: 'line',
    data: dataChart2,
    options: {
        animation: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hora'
                }
            },
            y: {
                position: 'left',
                title: {
                    display: true,
                    text: 'Grados Centigrados (°C)'
                },
                min: 0,
                max: 100
            },
            y1: {
                position: 'right',
                title: {
                    display: true,
                    text: 'Humedad'
                },
                min: 0,
                max: 1023
            }
        },
    }
};

const chart3Config = {
    type: 'line', 
    data: dataChart3,
    options: {
        animation: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hora'
                }
            },
            y: {
                position: 'left',
                title: {
                    display: true,
                    text: 'Grados Centigrados (°C)'
                },
                min: 0,
                max: 100
            },
            y1: {
                position: 'right',
                title: {
                    display: true,
                    text: 'Cantidad de Luz'
                },
                min: 0,
                max: 1500
            }
        },
    }
};

const chart4Config = {
    type: 'line',
    data: dataChart4, 
    options: {
        animation: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hora'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Calidad del aire'
                },
                ticks: {
                    callback: function(value) {
                        if(value === 500) return 'Muy Buena';
                        if(value === 1000) return 'Buena';
                        if(value === 1500) return 'Mala';
                        return '';
                    },
                    stepSize: 100
                },
                min: 350,
                max: 1500
            },
        },
    }
};

const chart1 = new Chart(
    document.querySelector('#temp'),
    chart1Config
);

const chart2 = new Chart(
    document.querySelector('#humidity'),
    chart2Config
);

const chart3 = new Chart(
    document.querySelector('#lumen'),
    chart3Config
);

const chart4 = new Chart(
    document.querySelector('#co2'),
    chart4Config
);

function GetRandowmTemp() {
    return Math.floor(Math.random() * 60);
}

function refreshValues(value, data) {
    for(let i=0; i < 5; i++) {
        if(i === 4) {
            data[i] = value;
            continue;
        }
        data[i] = data[i+1];
    }
}

function showReport() {
    fetch(`${url}/${document.querySelector('#day').value}`).then(
        res => res.json()
    ).then(
        data => {
            console.log(data);
            labels.length = 0;
            dataInternalTemperature.length = 0;
            dataExternalTemperature.length = 0;
            dataHumidityGround.length = 0;
            dataAmountOfLight.length = 0;
            dataCO2.length = 0;
            for(let i=0; i<data.labels.length; i++) {
                labels[i] = data.labels[i];
                dataInternalTemperature[i] = data.tempInt[i];
                dataExternalTemperature[i] = data.tempExt[i];
                dataHumidityGround[i] = data.humidity[i];
                dataAmountOfLight[i] = data.light[i];
                dataCO2[i] = data.co2[i];
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
    chart1.update();
    chart2.update();
    chart3.update();
    chart4.update();
}