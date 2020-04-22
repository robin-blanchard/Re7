#!/bin/sh

exec gunicorn re7.wsgi:application --bind 0.0.0.0:$PORT