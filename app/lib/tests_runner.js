function run() {
    var Alloy = require('alloy');

    var tijasmine = require("tijasmine/tijasmine");
    var reporter = new (require("tijasmine/tijasmine-console").ConsoleReporter);

    tijasmine.addSpecModules("specs/barcode_spec");
    tijasmine.addReporter(reporter);
    tijasmine.execute();
}

exports.run = run;
