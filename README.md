./mvnw package jib:dockerBuild -Djib.extraDirectories.permissions="/entrypoint.sh"="755"