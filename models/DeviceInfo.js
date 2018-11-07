var mongoose = require('mongoose');

var deviceInfoSchema = mongoose.Schema({
    board: String,
    brand: String,
    model: String,
    prduct: String,
    serial: String,
    vin: String,
    btaddr: String,
    // wifi mac addr
    wifiaddr: String,
    // iccid of device
    iccid: String,
});

deviceInfoSchema.methods.getSerail = () => {
    return this.serial;
};

var DeviceInfo = mongoose.Model('DeviceInfo', deviceInfoSchema);
module.exports = DeviceInfo;

