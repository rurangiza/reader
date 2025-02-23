FROM python:3.11

WORKDIR /api

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    poppler-utils \
    tesseract-ocr \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./

RUN python3 -m pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

COPY . .

EXPOSE 5050

CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:5000", "main:app"]
