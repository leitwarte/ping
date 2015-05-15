Ping = {};

console.log("moooooooooooooooooooo");

Ping.host = function(host){
  var Future = Npm.require('fibers/future');
  var ping = Meteor.npmRequire('jjg-ping')
  var future = new Future();

  ping.system.ping(host, function(latency, status){
    var statusText = "offline";
    status ? statusText = "online" : statusText = "offline"  
    future.return({latency: latency, online: status, status: statusText});
  });

  return future.wait();
}