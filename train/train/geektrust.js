const fs = require("fs");
const { createInputReader } = require("./src/utils/input_reader.js");
const { extractCarriages } = require("./src/utils/parser.js");
const { generateMergeSchedule } = require("./src/domain/train_merger.js");
const { buildScheduleOutput } = require("./src/domain/schedule_formatter.js");

const generateTrainSchedule = (inputFilePath) => {
  try {
    const { readInputFile } = createInputReader(fs);
    const rawInput = readInputFile(inputFilePath);

    const {
      trainACarriages,
      trainBCarriages,
    } = extractCarriages(rawInput);

    const schedule = generateMergeSchedule(
      trainACarriages,
      trainBCarriages,
    );

    if (!schedule.trainABdeparture.length) {
      console.log("JOURNEY_ENDED");
      return;
    }

    console.log(buildScheduleOutput(schedule));
  } catch (error) {
    console.error("Error: program failed");
    process.exit(1);
  }
};
/* istanbul ignore next */
if (require.main === module) {
  generateTrainSchedule(process.argv[2]);
}

module.exports = { generateTrainSchedule };
