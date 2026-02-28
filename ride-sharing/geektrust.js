const { parser } = require("./src/parser.js");
const { readFile } = require("./src/utils/input_reader.js");
const main = (path) => {
  const inputData = readFile(path);
  const { ADD_DRIVER, ADD_RIDER, START_RIDE, MATCH, BILL } = parser(inputData);
};
main();
