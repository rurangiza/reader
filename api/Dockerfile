FROM python:3.11

WORKDIR /api

COPY requirements/prod.txt requirements/base.txt

RUN pip install --no-cache-dir -r requirements/prod.txt

COPY . /api

EXPOSE 5000

CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:5000", "main:app"]
