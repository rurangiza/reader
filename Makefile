NAME			:= reader

PROFILE 		:= dev

API_IMAGE_NAME 	:= $(NAME)-api
APP_IMAGE_NAME 	:= $(NAME)-frontend
DB_IMAGE_NAME 	:= $(NAME)-graphdb

BLUE			:=	\033[34m
GREEN			:=	\033[32m
RESET			:=	\033[0m

all: build

build:
	@echo "$(BLUE)Building the app$(RESET)"
	@docker compose --profile $(PROFILE) up --build

clean:
	@echo "$(BLUE)Cleaning$(RESET)"
	@docker compose --profile $(PROFILE) down -v

fclean: clean
	@docker rmi -f $(APP_IMAGE_NAME)
	@docker rmi -f $(API_IMAGE_NAME)
	@docker rmi -f $(DB_IMAGE_NAME)

reset: fclean
	find . -not -path '*/.venv/*' -type d -name '__pycache__' -exec rm -r {} +
	
re: fclean all

status:
	@echo "$(BLUE)Images$(RESET)"
	@docker images
	@echo "$(BLUE)Containers$(RESET)"
	@docker container ls
	@echo "$(BLUE)Containers (including stopped)$(RESET)"
	@docker container ls -a

git:
	@echo "$(BLUE)Pushing to Git$(RESET)"
	git add .
	git commit -m "$m"
	git push
	@echo "ALL is on your GIT ✔️"

.PHONY: all build clean fclean re reset git