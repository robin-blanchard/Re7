# Re7

This repository aims at building a recipe manager web app using Django and React technologies.

## Frontend

The frontend has been developed using React and Create React App.

##### Run the frontend server

First, go to `frontend` subfolder.
To install dependencies and run the frontend on the development server:
```
npm install && npm start
```
To run the frontend inside a Docker container:
```
docker build -t re7-frontend .
docker run -d --name frontend -p 8080:80 -e PORT=80 re7-frontend
```
To deploy frontend container to Heroku app:
```
heroku login
heroku container:login
heroku container:push web
heroku container:release web
```