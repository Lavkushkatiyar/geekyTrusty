const { parseRideCommands } = require("./src/utils/parser.js");
const { readFile } = require("./src/utils/input_reader.js");
const { findMatchedDriver } = require("./src/domain/getDrivers.js");
const { handleStartRide, handleStopRide } = require("./src/domain/rides.js");
const { getBillData } = require("./src/compute/billData.js");
const main = (path) => {
  const inputData = readFile(path);
  const {
    driverRegistrations,
    riderRegistrations,
    rideStartRequests,
    rideStopRequests,
    matchRequests,
    billRequests,
  } = parseRideCommands(inputData);

  const matchedDriver = findMatchedDriver(
    driverRegistrations,
    riderRegistrations,
    matchRequests,
  );

  const startRide = handleStartRide(rideStartRequests, matchedDriver);

  const stopRide = handleStopRide(rideStopRequests, startRide);

  const billData = getBillData(billRequests, stopRide, riderRegistrations);
  console.log(billData);

  // console.log(matchedDriver, startRide, stopRide, billData);
};
main();
