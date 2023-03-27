FROM python:3.11.0-buster
WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install tensorflow==2.12.0
RUN pip install Pillow==9.4.0
RUN pip install Flask==2.2.3
RUN pip install Flask-RESTful==0.3.9

COPY . .
EXPOSE 5000
CMD [ "python", "./app.py" ]