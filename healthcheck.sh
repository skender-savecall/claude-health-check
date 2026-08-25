#!/usr/bin/env bash
# Health check ping to healthchecks.io
curl -fsS -m 10 --retry 3 -o /dev/null https://hc-ping.com/8afa62bd-9828-44fb-a406-33f9384b1fbe
