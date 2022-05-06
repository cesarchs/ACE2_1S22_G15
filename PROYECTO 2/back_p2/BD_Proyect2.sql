create database proyecto2;
use proyecto2;
create table datos
(
id_data int auto_increment primary key,
fecha_completa timestamp default current_timestamp,
hora_completa time default (CURTIME()),
hora int  default (hour(CURTIME())),
fecha date default (CURDATE()),
Temperatura double,
CH4 double,
chispa int,
flujo_gas int,
encendido int default 0,
apagado int default 0
);

insert into datos(Temperatura,CH4,chispa,flujo_gas,encendido,apagado) values()