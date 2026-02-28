const { parser } = require("./src/parser.js");
const { readFile } = require("./src/utils/input_reader.js");
const { findMatchedDriver } = require("./src/domain/getDrivers.js");
const { handleStartRide, handleStopRide } = require("./src/domain/rides.js");
const { getBillData } = require("./src/compute/billData.js");
const main = (path) => {
  const inputData = readFile(path);
  const { ADD_DRIVER, ADD_RIDER, START_RIDE, STOP_RIDE, MATCH, BILL } = parser(
    inputData,
  );
  const matchedDriver = findMatchedDriver(ADD_DRIVER, ADD_RIDER, MATCH);

  const startRide = handleStartRide(START_RIDE, matchedDriver);

  const stopRide = handleStopRide(STOP_RIDE, startRide);

  const billData = getBillData(BILL, stopRide, ADD_RIDER);
  console.log(billData);
};
main();
