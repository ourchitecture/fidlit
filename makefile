capability_models_path=./src/capability-models/
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
	@cd $(capability_models_path) \
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

.PHONY: clean
clean:
	@cd $(capability_models_path) \
	&& "$(MAKE)" $@
	@cd $(site_path) \
	&& "$(MAKE)" $@

.PHONY: clean-reset
clean-reset:
	@cd $(capability_models_path) \
	&& "$(MAKE)" $@
	@cd $(site_path) \
	&& "$(MAKE)" $@

.PHONY: ws
ws:
	@code -r $(site_path)fidlit-app.code-workspace

.PHONY: capability-models
capability-models:
	@cd $(capability_models_path) \
	&& "$(MAKE)" install
	@cp \
		$(capability_models_path)dist/airline-industry-capabilities.json \
		$(site_path)src/api/examples/industries/airlines/capabilities.json
	@cp \
		$(capability_models_path)dist/aerospace-and-defense-industry-capabilities.json \
		$(site_path)src/api/examples/industries/aerospace-and-defense/capabilities.json
	@cp \
		$(capability_models_path)dist/automotive-industry-capabilities.json \
		$(site_path)src/api/examples/industries/automotive/capabilities.json
	@cp \
		$(capability_models_path)dist/banking-industry-capabilities.json \
		$(site_path)src/api/examples/industries/banking/capabilities.json
	@cp \
		$(capability_models_path)dist/broadcasting-industry-capabilities.json \
		$(site_path)src/api/examples/industries/broadcasting/capabilities.json

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
