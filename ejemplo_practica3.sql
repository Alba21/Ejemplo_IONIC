drop database if exists practica3;
CREATE DATABASE IF NOT EXISTS Practica3;
USE Practica3;

#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
CREATE TABLE IF NOT EXISTS Usuario(
	id_usuario int auto_increment not null,
    nombre varchar(250) not null,
    password_ varchar(250) not null,
    primary key(id_usuario),
    ultima_conexion datetime default CURRENT_TIMESTAMP()
);

CREATE TABLE IF NOT EXISTS Mensaje(
	id_mensaje int auto_increment not null,
    contenido varchar(500),
    estado_eliminado bool default false,
    id_remitente int not null,
    id_destinatario int not null,
    primary key(id_mensaje),
	fecha_envio datetime default now(),
    foreign key(id_remitente) references usuario(id_usuario),
    foreign key(id_destinatario) references usuario(id_usuario)
);

INSERT INTO Usuario(nombre, password_) VALUES ('Albita',':3');
INSERT INTO Usuario(nombre, password_) VALUES ('Patito1',':3');
INSERT INTO Usuario(nombre, password_) VALUES ('Patito2',':3');
INSERT INTO Usuario(nombre, password_) VALUES ('Patito3',':3');


INSERT INTO mensaje(contenido, id_remitente, id_destinatario) VALUES ('Hola!',2,1);
DO SLEEP(2); 
INSERT INTO mensaje(contenido, id_remitente, id_destinatario) VALUES ('holiii c:',1,2);
DO SLEEP(2);
INSERT INTO mensaje(contenido, id_remitente, id_destinatario) VALUES ('Tengo un error :(',2,1);
DO SLEEP(2);
INSERT INTO mensaje(contenido, id_remitente, id_destinatario) VALUES ('</3',1,2);
DO SLEEP(2);
INSERT INTO mensaje(contenido, id_remitente, id_destinatario) VALUES('Donde vas a calificar?',3,1);
DO SLEEP(2);
INSERT INTO mensaje(contenido, id_remitente, id_destinatario) VALUES('No entregaste :(',1,4);

# Todos los mensajes de todas las conversaciones de un usuario.
SELECT mensaje.contenido, rem.nombre as remitente, dest.nombre as destinatario, mensaje.fecha_envio
from mensaje, usuario as rem, usuario as dest
 where rem.id_usuario = id_remitente and dest.id_usuario = id_destinatario and (mensaje.id_remitente = 4 or mensaje.id_destinatario = 4)
 ORDER BY fecha_envio asc;
 
# Todos los mensajes entre dos usuarios
SELECT mensaje.contenido, rem.nombre as remitente, dest.nombre as destinatario, mensaje.fecha_envio
from mensaje, usuario as rem, usuario as dest
 where rem.id_usuario = id_remitente and dest.id_usuario = id_destinatario 
 and ((mensaje.id_remitente = 1 and mensaje.id_destinatario = 2) or ((mensaje.id_remitente = 2 and mensaje.id_destinatario = 1)))
 ORDER BY fecha_envio asc;
 
 #Todas los usuarios con los que el usuario 1 tiene una conversacion.
 SELECT contacto.nombre
 from mensaje, usuario as contacto
 where (mensaje.id_destinatario = contacto.id_usuario and mensaje.id_remitente = 1) or
 (mensaje.id_destinatario = 1 and mensaje.id_remitente = contacto.id_usuario)
 GROUP BY contacto.nombre;
 
 