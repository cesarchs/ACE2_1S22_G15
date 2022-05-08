const SerialPort = require("serialport");
const ReadLine = require("@serialport/parser-readline");
const express = require("express");
const cors = require("cors");
const { Server } = require('socket.io');
const http = require('http');

const mysqlController = require("./mysql_p2");


const port = new SerialPort("COM4", { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimiter: "\n" }));
/**
 * App Variables 3
 */
 const port2 = 8080;
 const app = express();
 const server = http.createServer(app);
 const io = new Server(server, {
   cors: {
     origin: '*',
     methods: ['GET', 'POST']
   }
 });

 /**
  *  App Configuration
  */
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors());

/**
 * Middlewares
 * CORS
 * MORGAN
 * EXPRESS.JSON
 * EXPRESS.URLENCONDED
 */
 

port.on("open", () => {
	console.log("Se abrió la comunicación");
});

parser.on("data", (data) => {
  mysqlController.insert(data);
  const arrayDatos = data.split(',');
  io.emit('data', {
    temperature: arrayDatos[0],
    methane: arrayDatos[1]
  });
	//console.log(data);
});

io.on('connection', () => {
  console.log('User connected to socket');
});


//Routes
app.get('/:date', async (req, res) => {
  try {
    const data = await mysqlController.getDataBydate(req.params.date);
    const labels = [];
    const Temperatura = [];
    const Metano = [];
    for (let item of data) {
      labels.push(item.hora);
      Temperatura.push(item.temperatura);
      Metano.push(item.metano);
    }
    return res.status(200).json({
      labels,
      Temperatura,
      Metano
    }); 
  } catch (error) {
    console.log(error);
  }
  res.status(500).json({});
});

app.get('/last/data', async (req, res) => {
  try {
    const data = await mysqlController.getLastData();
    return res.status(200).json(data[0]); 
  } catch (error) {
    console.log(error);
  }
  res.status(500).json({});
});

server.listen(port2, () => {
    console.log(`Listening to requests on http://localhost:${port2}`);
  });