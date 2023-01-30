.DEFAULT_GOAL:=all

# NOTE: Do not defer to project `all` since `install`
#       is a little different in the root.
.PHONY: all
all: init check install

# updates "yarn.lock"
.PHONY: reinit
reinit:
	@yarn install

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

.PHONY: check-e2e
check-e2e:
	@yarn e2e

.PHONY: check
check: check-lint check-unit check-e2e

.PHONY: install
install:
	@yarn build

.PHONY: start
start:
	@yarn start

.PHONY: dev
dev: start

.PHONY: update
update:
	@yarn ng update \
    @angular/common@^15 \
    @angular/core@^15 \
    @angular/forms@^15 \
    @angular/platform-browser@^15 \
    @angular/platform-browser-dynamic@^15 \
    @angular/router@^15 \
    @angular/service-worker@^15 \
    @angular-devkit/build-angular@^15 \
    @angular-eslint/builder@^15 \
    @angular-eslint/eslint-plugin@^15 \
    @angular-eslint/eslint-plugin-template@^15 \
    @angular-eslint/template-parser@^15 \
    @angular/cli@^15 \
    @angular/compiler@^15 \
    @angular/compiler-cli@^15 \
    @angular/language-service@^15 \
    --create-commits
