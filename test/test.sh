#!/usr/bin/env bash

# Start dev server for test
pid_file=$(mktemp)
exec 3< <(node scripts/start.js& echo $! > ${pid_file})

# Check if the server started
server_started=false
while read line; do
   echo "$line"
   case "$line" in
   *Compiled*)
     server_started=true
     break
     ;;
   *)
     # noop
     ;;
   esac
done <&3

# Close the file descriptor
exec 3<&-

# Start test if server started successfully
if $server_started; then
    npm run test
    kill $(cat ${pid_file})
    exit 0
else
    echo "[Error] failed to start server for test."
    exit 1
fi
