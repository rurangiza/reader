NAME := reader-api-dev

ENTRYPOINT := main

DEPENDENCIES_FILE := dev.txt

PORT_IN := 5000
PORT_OUT := 5050

all: run

run:
	@echo "Starting the server (Makefile)"
	uvicorn $(ENTRYPOINT):app --reload --reload-include="*.py" --reload-exclude=".venv/*" --port $(PORT_OUT)

install:
	@echo "Installing dependencies"
	@pip install -r requirements/$(DEPENDENCIES_FILE)

build:
	@echo "Building image for api"
	docker build -t $(NAME) -f Dockerfile.dev .
	@echo "Starting the container"
	docker container run -p $(PORT_OUT):$(PORT_IN) $(NAME)
