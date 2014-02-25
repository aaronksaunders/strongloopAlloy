function doClick(e) {
    alert($.label.text);
}

$.index.open();

var SL = require('StrongLoopLib');
var model = SL.createStrongLoopModel("users");

//
// YOU MUST RUN COMMAND slc lb model car TO CREATE THE CAR OBJECT
//
var carModel, car = SL.createStrongLoopModel("cars");
var collection = SL.createStrongLoopCollection("cars");

//
// USE THE CONSOLE TO CREATE THE ACCOUNT
//
model.login({
    "email" : "foo@bar.com",
    "password" : "bar"
}).then(function(_data) {
    Ti.API.info('model.login: _data ' + JSON.stringify(_data, null, 2));
    carModel = SL.createStrongLoopModel("cars");
    return carModel.save({
        "make" : "fiat",
        "model" : "128",
        "year" : "1985"
    });
}).then(function(_data) {
    Ti.API.info('carModel.save: _data ' + JSON.stringify(_data, null, 2));
    carModel = SL.createStrongLoopModel("cars");
    return carModel.get(1);
}).then(function(_dataCollection1) {
    Ti.API.info('carModel.get(1): _dataCollection1 ' + JSON.stringify(_dataCollection1, null, 2));

    collection = SL.createStrongLoopCollection("cars");
    return collection.fetch();

}).then(function(_dataCollection) {
    Ti.API.info('collection.fetch(): _dataCollection ' + JSON.stringify(_dataCollection, null, 2));

    collection = SL.createStrongLoopCollection("cars");
    return collection.count();
}).then(function(_dataCollection1) {
    Ti.API.info('collection.count(): _dataCollection1 ' + JSON.stringify(_dataCollection1, null, 2));

}, function fail(_error) {
    Ti.API.error('_error ' + JSON.stringify(_error.error.message));
});
