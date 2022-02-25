const  mysqlClient = require("mysql");

const conexion = mysqlClient.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'practica1',
    port: 3306
})

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA')
    }
})

async function getday(dia){
    let query = `select * from datos where convert(fecha,date) = '${dia}' ;`;
    conexion.query(query,function(error,results,fields){
        if(error)
            throw error;

        results.forEach(result => {
            console.log(result);
        });
    })
}

async function getday2(dia) {
    return new Promise((resolve, reject) => {
        let query = `select * from datos where convert(fecha,date) = '${dia}' ;`;
        conexion.query(query,function(error,results,fields){
            return error ? reject(error) : resolve(results);
        });
    })
  }

async function insert(data){
    var arraydatos = data.split(',');
    let query = `insert into datos(Temp_Int,Temp_Ext,Humedad,Luz,Co2) values(${arraydatos[0]},${arraydatos[1]},${arraydatos[2]},${arraydatos[3]},${arraydatos[4].replace(';','')})`;
    conexion.query(query,function(error,results,fields){
        if(error)
            throw error;
        console.log('insert 1');
    })
}

function getDataBydate(day) {
    const query = `SELECT DATE_FORMAT(fecha, '%H:%i') AS hora, ROUND(AVG(Temp_Int), 2) AS 'temp_int', 
                    ROUND(AVG(Temp_Ext), 2) AS 'temp_ext', ROUND(AVG(Humedad),2) AS humedad, ROUND(AVG(Luz),2) AS luz, ROUND(AVG(Co2),2) AS co2
                    FROM datos
                    WHERE fecha BETWEEN '${day} 00:00:00' AND '${day} 23:59:59'
                    GROUP BY DATE_FORMAT(fecha, '%H:%i')
                    ORDER BY DATE_FORMAT(fecha, '%H:%i');`;
    return new Promise((resolve, reject) => {
        conexion.query(query, function(err, res) {
            if(err) return reject(err);
            resolve(res);
        });
    });
}

function getLastData() {
    const query = 'SELECT * FROM datos ORDER BY fecha DESC LIMIT 1';
    return new Promise((resolve, reject) => {
        conexion.query(query, function(err, res) {
            if(err) return reject(err);
            resolve(res);
        });
    });
}

module.exports={
    getday,
    insert,
    getDataBydate,
    getLastData
}
