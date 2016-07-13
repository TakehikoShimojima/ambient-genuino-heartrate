var async = require('async');
var ambient = require('ambient-lib');
ambient.connect(100, 'WriteKey');

var NobleDevice = require('noble-device');

var idOrLocalName = process.argv[2];

if (!idOrLocalName) {
  console.log("node hrm-device.js [ID or local name]");
  process.exit(1);
}

var HRMDevice = function(device) {
  NobleDevice.call(this, device);
};

HRMDevice.is = function(device) {
  var localName = device.advertisement.localName;
  return (device.id === idOrLocalName || localName === idOrLocalName);
};

NobleDevice.Util.inherits(HRMDevice, NobleDevice);
NobleDevice.Util.mixin(HRMDevice, NobleDevice.DeviceInformationService);
NobleDevice.Util.mixin(HRMDevice, NobleDevice.HeartRateMeasumentService);

var previous = 0;

HRMDevice.discover(function(device) {
  console.log('discovered: ' + device);

  device.on('disconnect', function() {
    console.log('disconnected!');
    process.exit(0);
  });

    device.on('measumentChange', function(data) {
        console.log("update measument: " + data);
        var _t = new Date();
        var current = _t.getTime();
        if ((current - previous) > 5000) {
            ambient.send({d1: data}, function(err, res, body) {
                if (err) {
                    console.log(err);
                }
                console.log(res.statusCode);
            });
            previous = current;
        }
    });

  device.connectAndSetUp(function(callback) {
    console.log('connectAndSetUp');
    device.notifyMeasument(function(counter) {
      console.log('notifyMeasument');
    });
  });
});
