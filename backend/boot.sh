#!/bin/sh

python manage.py collectstatic --no-input
exec gunicorn re7.wsgi:application --bind 0.0.0.0:$PORT