include deploy/build.env

# export all variable from build.env
$(eval export $(shell sed -ne 's/ *#.*$$//; /./ s/=.*$$// p' deploy/build.env))

compose_file=./deploy/docker-compose.yml

.PHONY: up
up:
	docker-compose -f $(compose_file) -p $(project_name) up
	
.PHONE: down
down:
	docker-compose -f $(compose_file) -p $(project_name) down

.PHONY: start
start:
	docker-compose -f $(compose_file) -p $(project_name) start

.PHONY: stop
stop:
	docker-compose -f $(compose_file) -p $(project_name) stop

.PHONY: build
build:
	docker-compose -f $(compose_file) -p $(project_name) build