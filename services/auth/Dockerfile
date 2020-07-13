FROM python:3.8
WORKDIR /coorseo-api/
COPY application/requirements.txt application/
RUN pip3.8 install -r application/requirements.txt

COPY . .

ENV FLASK_APP=application
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
ENV FLASK_RUN_HOST=https://api.coorseo.com
ENV FLASK_RUN_PORT=5000

ENTRYPOINT ["python3.8"]
EXPOSE 5000
CMD ["run.py"]
