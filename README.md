# Re7

This repository aims at building a recipe manager web app using Django and React technologies.

## Frontend

The frontend has been developed using React and Create React App.

##### Run the frontend server

First, go to `frontend` subfolder.
To install dependencies and run the frontend on the development server:

```
npm install
REACT_APP_BACKEND_URL=http://127.0.0.1:8000/ npm start
```

To run the frontend inside a Docker container:

```
docker build -t re7-frontend . --build-arg REACT_APP_BACKEND_URL=http://127.0.0.1:8000/
docker run -d --name frontend -p 3000:80 -e PORT=80 re7-frontend
```

To deploy frontend container to Heroku app:

```
heroku login
heroku git:remote -a frontend_app_name
heroku container:login
heroku container:push web --arg REACT_APP_BACKEND_URL=https://backend_app_name.herokuapp.com/
heroku container:release web
```

## Backend

First, go to `frontend` subfolder.
To install packages, create a virtual environment and run:

```
python -m pip install -r requirements.txt
```

To run the backend locally (make sure the PostgreSQL server is running; to do so, run `docker container start db` once it has been built\*) on http://127.0.0.1:8000/:

```
python manage.py runserver
```

To run the backend inside a Docker container:

```
docker-compose up -d
```

\*You will now be able to run the PostgreSQL alone.

and visit http://localhost:9090/api/

To deploy backend to Heroku:

```
heroku login
heroku git:remote -a backend_app_name
heroku container:login
heroku addons:create heroku-postgresql:hobby-dev
heroku config set SECRET_KEY=secrety_key
heroku config:set ALLOWED_HOSTS='.herokuapp.com'
heroku config:set CORS_ORIGIN_WHITELIST='https://frontend_app_name.herokuapp.com'
heroku config:set GOOGLE_APPLICATION_CREDENTIALS=google_credentials_file.json
heroku config:set DEBUG=False
heroku container:push web
heroku container:release web
```

When deploying for the first time, you also need to migrate and create a superuser:

```
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```
