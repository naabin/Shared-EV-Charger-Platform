install mysql on https://dev.mysql.com/downloads/mysql/  (MSI Installer)

create a database named evcharger
create a user named admin with password admin

    MySql commands:
        CREATE DATABASE evcharger;
        CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
        GRANT ALL PRIVILEGES ON evcharger.* TO 'admin'@'localhost';
        FLUSH PRIVILEGES;
        Connect evcharger

run pip install -r requirements.txt on terminal

run python manage.py makemigrations

run python manage.py migrate

run python manage.py runserver

cd to frontend/evcharge-frontend

run npm install

run npm start



