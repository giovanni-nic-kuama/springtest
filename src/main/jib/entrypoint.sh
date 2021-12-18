#!/bin/sh

echo "Spinning Db container... Sleeping for 10s..." && sleep 10
exec java $JAVA_OPTS \
  -cp $( cat /app/jib-classpath-file ) \
  $( cat /app/jib-main-class-file )