.DEFAULT_GOAL:=all

all: init install

# updates "yarn.lock"
.PHONY: reinit
reinit:
	@yarn install

.PHONY: init
init:
	@yarn install \
    --frozen-lockfile \
    --non-interactive

.PHONY: install
install:
	@yarn start

.PHONY: clean
clean:
	@rm -rf ./node_modules/

.PHONY: clean-reset
clean-reset: clean
	@rm -rf ./yarn.lock
	@"$(MAKE)" reinit
