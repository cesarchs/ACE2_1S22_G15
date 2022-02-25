const SerialPort = require("serialport");
const ReadLine = require("@serialport/parser-readline");
const express = require("express");
const cors = require("cors");

const mysqlController = require("./mysql_A");


const port = new SerialPort("COM3", { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimiter: "\n" }));
/**
 * App Variables 3
 */
 const port2 = 8080;
 const app = express();
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
	//console.log(data);
});


//Routes
app.get('/:date', async (req, res) => {
  try {
    const data = await mysqlController.getDataBydate(req.params.date);
    const labels = [];
    const tempInt = [];
    const tempExt = [];
    const humidity = [];
    const light = [];
    const co2 = [];
    for (let item of data) {
      labels.push(item.hora);
      tempInt.push(item.temp_int);
      tempExt.push(item.temp_ext);
      humidity.push(item.humedad);
      light.push(item.luz);
      co2.push(item.co2);
    }
    return res.status(200).json({
      labels,
      tempInt,
      tempExt,
      humidity,
      light,
      co2
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

/**
 * Socket io
 
io.on("connection", (socket) => {
  console.log("We have a new conecction!!");
  socket.on("top", async (data) => {
      mysqlController.insert(data);
  })

  socket.on("dia", async (dia) => {
    mysqlController.getday(dia);
  });

  let top='hola 4'
  socket.emit("top", top);
})

*/
/**
 * Server Activation
 */
 app.listen(port2, () => {
  console.log(`Listening to requests on http://localhost:${port2}`);
});