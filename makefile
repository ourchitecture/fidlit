site_path=./src/fidlit.app/

.DEFAULT_GOAL:=all

# NOTE: Do not defer to project `all` since `install`
#       is a little different in the root.
.PHONY: all
all: init check install

.PHONY: reinit
reinit:
	@cd $(site_path) \
	&& "$(MAKE)" $@

.PHONY: init
init:
	@cd $(site_path) \
	&& "$(MAKE)" $@

.PHONY: check
check:
	@cd $(site_path) \
	&& "$(MAKE)" $@

.PHONY: update
update:
	@cd $(site_path) \
	&& "$(MAKE)" $@

.PHONY: install
install:
	@rm -rf ./docs/ \
	&& cd $(site_path) \
	&& "$(MAKE)" $@ \
	&& cp -r ./www/ ../../docs/

.PHONY: search-index
search-index:
	@cd $(site_path) \
	&& "$(MAKE)" $@

.PHONY: start
start:
	@cd $(site_path) \
	&& "$(MAKE)" $@

.PHONY: dev
dev:
	@cd $(site_path) \
	&& "$(MAKE)" $@

.PHONY: sync
sync:
	@git-town sync

.PHONY: pr
pr:
	@git-town new-pull-request

.PHONY: main
main:
	@git sync
	@git checkout main
	@git sync
	@git prune-branches

# kept for posterity
# .PHONY: create
# create:
# 	@npx @ionic/cli start \
# 		fidlit.app \
# 		blank \
# 		--type=angular \
# 		--no-git
# output moved to "./src/fidlit.app
