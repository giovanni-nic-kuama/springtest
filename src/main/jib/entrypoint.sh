#!/bin/sh

echo "Ciao SpringTest"
exec java $JAVA_OPTS \
  -cp $( cat /app/jib-classpath-file ) \
  $( cat /app/jib-main-class-file )