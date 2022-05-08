const url = 'http://localhost:8080';

/** PARTE DE DASHBOARD */

const { createApp } = Vue;

createApp({
    data() {
        return {
            methane: 0,
            temperature: 0,
            socket: null
        }
    },
    mounted() {
        this.socket = io(url, {
            transports: ['websocket']
        });
        this.socket.on('data', data => {
            this.methane = data.methane;
            this.temperature = data.temperature;
        });
    }
}).mount('#app');


/** Reporteria */

const ctx1 = document.getElementById('chart1').getContext('2d');
const ctx2 = document.getElementById('chart2').getContext('2d');
const ctx3 = document.getElementById('chart3').getContext('2d');


/** Configuración de grafica de metano vs tiempo */
const myChart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [
            {
                label: 'Cantidad de metano (ppm)',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: '#1F3A93',
                borderColor: '#1F3A93',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                title: {
                    text: 'Tiempo (m)',
                    display: true
                }
            }
        }
    }
});

const myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [{
            label: 'Temperatura del tanque (°C)',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: '#EB9532',
            borderColor: '#EB9532',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                title: {
                    text: 'Tiempo (m)',
                    display: true
                }
            }
        }
    }
});

const myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['0', '0', '0', '0', '0'],
        datasets: [{
            label: 'Cantidad de metano (ppm)',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: '#1F3A93',
            borderColor: '#1F3A93',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                title: {
                    text: 'Temperatura (°C)',
                    display: true
                }
            }
        }
    }
});

document.getElementById('btn-filter').addEventListener('click', () => {
    fetch(`${url}/${document.getElementById('input-date').value}`).then(
        res => res.json()
    ).then(
        data => {
            const labels = [];
            const labelsTemp = [];
            for(let i=0; i<data.labels.length; i++) {
                labels.push(`${i}`);
                labelsTemp.push(data.Temperatura[i].toString());
            }
            myChart.data.labels = labels;
            myChart2.data.labels = labels;
            myChart3.data.labels = labelsTemp;
            myChart.data.datasets[0].data = data.Metano;
            myChart2.data.datasets[0].data = data,Temperatura;
            myChart3.data.datasets[0].data = data.Metano;
            myChart.update();
            myChart2.update();
            myChart3.update();
        }
    ).catch(
        err => {
            console.log(err);
            alert('Error al mostrar los datos');
        }
    );
});