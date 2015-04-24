# process_healthcheck

A small node app to provide a healthcheck for running services that do not handle inbound web requests. It depends on the services using the `init` framework.

When requested it runs `/etc/init.d/<service_name> status`

It responds with a `200` only iff the returned status is `0`

[Information about init](http://refspecs.linuxbase.org/LSB_3.1.0/LSB-Core-generic/LSB-Core-generic/iniscrptact.html)

## Installation
  TODO

## Usage
  Bring the app up with. Both `--port/-p` and `--watch/-w` options are required.
  `node app.js --port <port> --watch <service_name>`

  
