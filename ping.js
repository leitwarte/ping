Ping = {};

/**
 * Determine online status of a host.
 * @param {string} host - hostname or IP.
 * @returns {string} status as offline or online
 */
Ping.host = function (host) {
  var hostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
  var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (hostnameRegex.test(host) || ipv4Regex.test(host)){
    var Future = Npm.require('fibers/future');
    var ping = Npm.require('jjg-ping');
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
  }
  else {
    throw new Meteor.Error('invalid-host-argument', 'Not a valid target to ping (host neither hostname or ip)');
    console.log('not a valid argument for ping');
  }
};

/**
 * Ping a range of IPs without waiting for the result (to refresh the ARP table of the switch).
 * @param {array} IP list - array of IP addresses
 * @returns {undefined}
 */
Ping.range = function (range){
	var i, ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	var Future = Npm.require('fibers/future');
	var ping   = Npm.require('jjg-ping');

	var futures = _.map(range, function(ip) {
		// Set up a future for the current job
		var future = new Future();
		// A callback so the job can signal completion
		var onComplete = future.resolver();

		/// Make async call
		ping.system.ping(ip, function (latency, status) {
			// Do whatever you need with the results here!
			// Inform the future that we're done with it
			onComplete(null, {
				ip      : ip,
				latency : latency,
				online  : status,
				status  : status ? 'online' : 'offline'
			});
		});
		// Return the future
		return future;
	});

	Future.wait(futures);
	// and grab the results out.
	return _.invoke(futures, 'get');
};

