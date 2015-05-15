Ping = {};

/**
 * Determine online status of a host.
 * @param {string} host - hostname or IP.
 * @returns {string} status as offline or online
 */
Ping.host = function (host) {
  var hostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
  var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  check(host, Match.OneOf(hostnameRegex, ipv4Regex));
  var Future = Npm.require('fibers/future');
  var ping = Meteor.npmRequire('jjg-ping');
  var future = new Future();

  ping.system.ping(host, function (latency, status) {
    var statusText = 'offline';
    status ? statusText = 'online' : statusText = 'offline';
    future.return({
      latency: latency,
      online: status,
      status: statusText
    });
  });

  return future.wait();
};
