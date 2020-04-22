FROM python:3.8-slim

# Prevents Python from writing pyc 
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdin/stdout
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN chmod +x /boot.sh

CMD [ "/boot.sh" ]