# leitwarte:ping
A simple package for sending ICMP pings to hosts. Part of the [Leitwarte](https://github.com/leitwarte) project.

## Usage
From server code call

```
var hostname = 'my.example.org';
var ip = '10.0.0.1';
Ping.host(hostname);
Ping.host(ip);
```

To ping multiple IP:
```
var iplist = ["10.0.0.2", "10.0.0.2", "10.0.0.3"];
Ping.range(iplist);
```
