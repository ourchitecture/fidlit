.DEFAULT_GOAL:=all

all: install

.PHONY: install
install:
	@./install.sh

.PHONY: deploy
deploy:
	@./deploy.sh

.PHONY: push
push: deploy

.PHONY: dev
dev: install
	@./dev.sh

.PHONY: debug
debug: dev
