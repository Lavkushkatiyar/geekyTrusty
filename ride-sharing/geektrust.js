const { parser } = require("./src/parser.js");
const { readFile } = require("./src/utils/input_reader.js");
const { findMatchedDriver } = require("./src/domain/getDrivers.js");
const { handleStartRide } = require("./src/domain/rides.js");
const main = (path) => {
  const inputData = readFile(path);
  const { ADD_DRIVER, ADD_RIDER, START_RIDE, END_RIDE, MATCH, BILL } = parser(
    inputData,
  );
  const matchedDriver = findMatchedDriver(ADD_DRIVER, ADD_RIDER, MATCH);

  const startRide = handleStartRide(START_RIDE, matchedDriver);
  console.log(startRide);
};
main();
