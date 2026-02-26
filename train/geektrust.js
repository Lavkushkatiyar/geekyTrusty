const fs = require("fs");
const { createInputReader } = require("./src/utils/input_reader.js");
const { extractCarriages } = require("./src/utils/parser.js");
const { generateMergeSchedule } = require("./src/domain/train_merger.js");
const { buildScheduleOutput } = require("./src/domain/schedule_formatter.js");

const generateTrainSchedule = (inputFilePath) => {
  const { readInputFile } = createInputReader(fs);
  const rawInput = readInputFile(inputFilePath);

  if (!rawInput) return;

  const { trainACarriages, trainBCarriages } = extractCarriages(rawInput);

  const schedule = generateMergeSchedule(
    trainACarriages,
    trainBCarriages,
  );

  if (!schedule.trainABdeparture.length) {
    console.log("JOURNEY_ENDED");
    return;
  }

  console.log(buildScheduleOutput(schedule));
};

/* istanbul ignore next */
if (require.main === module) {
  generateTrainSchedule(process.argv[2]);
}

module.exports = { generateTrainSchedule };
