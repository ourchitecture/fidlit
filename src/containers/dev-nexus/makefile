.DEFAULT_GOAL:=all

all: install

.PHONY: install
install:
	@./install

.PHONY: start
start: install

.PHONY: dev
dev: install

.PHONY: stop
stop:
	@./stop

.PHONY: restart
restart: stop start
