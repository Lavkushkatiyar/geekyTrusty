#!/usr/bin/env node

const fs = require("fs");

const TRAIN_B_ROUTE = Object.freeze({
  TVC: 0,
  SRR: 300,
  MAQ: 600,
  MAO: 1000,
  PNE: 1400,
  HYB: 2000,
  NGP: 2400,
  ITJ: 2700,
  BPL: 2800,
  PTA: 3800,
  NJP: 4200,
  GHY: 4700,
});

const TRAIN_A_ROUTE = Object.freeze({
  CHN: 0,
  SLM: 350,
  BLR: 550,
  KRN: 900,
  HYB: 1200,
  NGP: 1600,
  ITJ: 1900,
  BPL: 2000,
  AGA: 2500,
  NDL: 2700,
});

const MERGED_TRAIN_ROUTE = Object.freeze({
  NGP: 1600,
  ITJ: 1900,
  BPL: 2000,
  AGA: 2500,
  NDL: 2700,
  PTA: 3800,
  NJP: 4200,
  GHY: 4700,
});

const sortCarriagesByDistanceDesc = (carriages, route) =>
  [...carriages].sort((a, b) => route[b] - route[a]);

const mergeTrainsCarriages = (trainACarriages, trainBCarriages) =>
  trainACarriages.concat(trainBCarriages);

const filterCarriagesBeyondMergePoint = (
  carriages,
  route,
  mergeStation = "HYB",
) => {
  const mergeDistance = route[mergeStation];
  return carriages.filter((carriage) => route[carriage] > mergeDistance);
};

const generateMergedDeparturePlan = (trainACarriages, trainBCarriages) => {
  const trainAArrival = filterCarriagesBeyondMergePoint(
    trainACarriages,
    TRAIN_A_ROUTE,
  );

  const trainBArrival = filterCarriagesBeyondMergePoint(
    trainBCarriages,
    TRAIN_B_ROUTE,
  );

  const merged = mergeTrainsCarriages(trainAArrival, trainBArrival);

  const trainABdeparture = sortCarriagesByDistanceDesc(
    merged,
    MERGED_TRAIN_ROUTE,
  );

  return { trainAArrival, trainBArrival, trainABdeparture };
};

const buildScheduleOutput = ({
  trainAArrival,
  trainBArrival,
  trainABdeparture,
}) => {
  const trainAText = trainAArrival.join(" ");
  const trainBText = trainBArrival.join(" ");
  const departureText = trainABdeparture.join(" ");

  return `ARRIVAL TRAIN_A ENGINE ${trainAText}\n\nARRIVAL TRAIN_B ENGINE ${trainBText}\n\nDEPARTURE TRAIN_AB ENGINE ENGINE ${departureText}`;
};

const parseCarriages = (train) => {
  const [, , ...carriages] = train.trim().split(" ");
  return carriages;
};

const extractCarriages = (input) => {
  const [trainA, trainB] = input.trim()
    .split(/\r?\n/)
    .filter(Boolean);

  return {
    trainACarriages: parseCarriages(trainA),
    trainBCarriages: parseCarriages(trainB),
  };
};

const readInputFile = (inputFilePath) => {
  if (inputFilePath) return fs.readFileSync(inputFilePath, "utf8");
  return fs.readFileSync(0, "utf8");
};

const prepareScheduleFromInput = (fileContent) => {
  const { trainACarriages, trainBCarriages } = extractCarriages(fileContent);

  return generateMergedDeparturePlan(
    trainACarriages,
    trainBCarriages,
  );
};

const printScheduleOrEnd = (schedule) => {
  if (!schedule.trainABdeparture?.length) {
    console.log("JOURNEY_ENDED");
    return;
  }

  console.log(buildScheduleOutput(schedule));
};

const generateTrainSchedule = (inputFilePath) => {
  try {
    const journeyInput = readInputFile(inputFilePath);
    const schedule = prepareScheduleFromInput(journeyInput);
    printScheduleOrEnd(schedule);
    return process.exit(0);
  } catch (err) {
    console.error("Error: program failed", err?.message ?? "");
    return process.exit(1);
  }
};

generateTrainSchedule(process.argv[2]);
