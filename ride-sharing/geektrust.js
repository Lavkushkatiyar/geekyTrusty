const { parseRideCommands } = require("./src/utils/parser.js");
const { createInputReader } = require("./src/utils/input_reader.js");
const { findMatchedDriver } = require("./src/domain/getDrivers.js");
const { handleStartRide, handleStopRide } = require("./src/domain/rides.js");
const { getBillData } = require("./src/compute/billData.js");
const { formatBill } = require("./src/compute/formatBill.js");
const fs = require("fs");

const main = (inputFilePath) => {
  const { readInputFile } = createInputReader(fs);
  const rawInput = readInputFile(inputFilePath);
  const {
    driverRegistrations,
    riderRegistrations,
    rideStartRequests,
    rideStopRequests,
    matchRequests,
    billRequests,
  } = parseRideCommands(rawInput);

  const matchedDriver = findMatchedDriver(
    driverRegistrations,
    riderRegistrations,
    matchRequests,
  );

  const startRide = handleStartRide(rideStartRequests, matchedDriver);

  const stopRide = handleStopRide(rideStopRequests, startRide);

  const billData = getBillData(billRequests, stopRide, riderRegistrations);
  const formattedOutput = formatBill(
    matchedDriver,
    startRide,
    stopRide,
    billData,
  );

  console.log(formattedOutput);
};

/* istanbul ignore next */
if (require.main === module) {
  main(process.argv[2]);
}

module.exports = { main };
