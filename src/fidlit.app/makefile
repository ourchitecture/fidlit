port_app:=4200
port_host:=4200

.DEFAULT_GOAL:=all

# NOTE: Do not defer to project `all` since `install`
#       is a little different in the root.
.PHONY: all
all: init check install

.PHONY: install2
install2:
	@./install2

.PHONY: init
init:
	@./init.sh

.PHONY: check-lint
check-lint:
	@./check-lint.sh

.PHONY: check-unit
check-unit:
	@./check-unit.sh

.PHONY: check-e2e
check-e2e:
	@./check-e2e.sh

.PHONY: check
check: check-lint check-unit check-e2e

.PHONY: install
install:
	@./install.sh

.PHONY: dev
dev:
	@PORT_APP=$(port_app) \
	PORT_HOST=$(port_host) \
	./dev.sh

.PHONY: start
start: dev

.PHONY: serve
serve: dev

.PHONY: update-ng
update-ng:
	@./update-ng.sh

.PHONY: clean
clean:
	@rm -rf ./.pnpm-store ./node_modules/ ./dist/

.PHONY: clean-reset
clean-reset: clean
	@rm -rf ./.angular/ ./yarn.lock ./pnpm-lock.yaml
	@PNPM_CLEAN_INSTALL=1 "$(MAKE)" init

.PHONY: root-ws
root-ws:
	@code -r ../../
