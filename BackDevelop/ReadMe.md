# Backend Server for the EV-Charger

- This server uses Django and django restframework for the to create apis and communicate with database and the database is MySQL. Just like any other python project, It can be run using python virtual environment and in order to create virtual environment, make sure you have `virtualenv` program installed and enter on the current project directory

  - `python -m virtualenv evcharger-env`

- Virtual environment can be activated using the following command (this is in windows)

  - `{ENV_NAME\Scripts\activate}`

* After that we can install all packages and libraries used by this program using following command:
  - `pip install -r .\requirements.txt`
  - `pip freeze` can be used to see the packages and their version used by the current project

-- note --
if you encounter error while dowloading mysqlclient using WSL in windows. This link can be helpful https://stackoverflow.com/a/76588599.

super_user creds
username: admin
email: admin@email.com
password: admin
