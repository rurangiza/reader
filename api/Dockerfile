FROM python:3.11

WORKDIR /api

COPY requirements/prod.txt requirements/base.txt ./requirements/

RUN python3 -m pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements/prod.txt

RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

COPY . .

EXPOSE 5050

CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:5000", "main:app"]
