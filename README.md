# Trabajo realizado por Pablo Piedad Garrido.

Para poder visualizar el proyecto correctamente necesitará instalar nodeJS, lo cual puede realizar siguiendo esta URL: https://nodejs.org/en/

Luego de haber instalado nodeJS, y por consiguiente, npm, podrá:

1. Iniciar la API REST realizada con laravel poniendo en su terminal de comandos lo siguiente: **_php artisan serve_**

- Probablemente necesite instalar WAMP o XAMPP para tener una conexión con una base de datos local, la cual deberá crear colocándole el siguiente nombre: **laravel_api**

- Después de haber realizado esto, podrá utilizar el comando **_php artisan migrate_** para migrar todos los datos a la base de datos y tener ya la API en funcionamiento

2. Instalar todos los paquetes utilizados para la realización del proyecto con **_npm install_** y, luego, poner en funcionamiento la aplicación frontend con **_npm start_**

En caso de querer utilizar Docker, podrá hacerlo abriendo una terminal en la carpeta donde se encuentra la aplicación y escribiendo el siguiente comando: **_docker-compose up --build_**. 

Con este comando, se descargarán e inicializarán los contenedores para que pueda interactuar con la aplicación, a la cual podrá acceder colocando en la barra de navegación de su navegador la dirección http://127.0.0.1:3000.
