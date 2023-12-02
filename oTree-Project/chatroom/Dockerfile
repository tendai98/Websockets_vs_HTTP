FROM python:3.9.18

WORKDIR /app
COPY . .
RUN apt update
RUN apt upgrade -y
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["sh", "start.sh"]
