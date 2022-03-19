create database proyecto1;
use proyecto1;
create table datos
(
id_data int auto_increment primary key,
fecha timestamp default current_timestamp,
Distancia double,
Humedad double,
Agua_vivienda double,
Agua_filtrada double
);
