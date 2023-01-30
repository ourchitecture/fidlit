.DEFAULT_GOAL:=all

# NOTE: Do not defer to project `all` since `install`
#       is a little different in the root.
.PHONY: all
all: init check install

.PHONY: init
init:
	@yarn install \
    --frozen-lockfile \
    --non-interactive

.PHONY: check-lint
check-lint:
	@yarn lint

.PHONY: check-unit
check-unit:
	@yarn test

.PHONY: check
check: check-lint check-unit

.PHONY: install
install:
	@yarn build

.PHONY: start
start:
	@yarn start

.PHONY: dev
dev: start
