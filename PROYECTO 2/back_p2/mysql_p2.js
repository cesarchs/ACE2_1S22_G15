const  mysqlClient = require("mysql");

const conexion = mysqlClient.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123ABC',
    database: 'proyecto2',
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
    let query = `select * from datos where fecha = '${dia}' ;`;
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
    let query = `insert into datos(Temperatura,CH4,chispa,flujo_gas,encendido,apagado) values(${arraydatos[0]},${arraydatos[1]},${arraydatos[2]},${arraydatos[3]},${arraydatos[4]},${arraydatos[5].replace(';','')})`;
    conexion.query(query,function(error,results,fields){
        if(error)
            throw error;
        console.log('insert 1');
    })
}

function getDataBydate(day) {
    const query = `SELECT DATE_FORMAT(hora_completa, '%H:%i') AS hora, ROUND(AVG(Temperatura), 2) AS 'temperatura', 
                    ROUND(AVG(CH4), 2) AS 'metano'
                    FROM datos
                    WHERE fecha = '${day}'
                    GROUP BY DATE_FORMAT(hora_completa, '%H:%i')
                    ORDER BY DATE_FORMAT(hora_completa, '%H:%i');`;
    return new Promise((resolve, reject) => {
        conexion.query(query, function(err, res) {
            if(err) return reject(err);
            resolve(res);
        });
    });
}

function getLastData() {
    const query = 'SELECT * FROM datos ORDER BY fecha_completa DESC LIMIT 1';
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
