FROM python:3.7
COPY ./flask/requirements.txt /flask/requirements.txt
WORKDIR /flask
RUN pip install -r requirements.txt
COPY ./flask /flask