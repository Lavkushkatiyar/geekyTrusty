const {
  MERGED_TRAIN_ROUTE,
  TRAIN_A_ROUTE,
  TRAIN_B_ROUTE,
} = require("../constants/routes.js");

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
  return carriages.filter((carriage) => route[carriage] >= mergeDistance);
};

const generateMergeSchedule = (trainACarriages, trainBCarriages) => {
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
module.exports = {
  generateMergeSchedule,
  sortCarriagesByDistanceDesc,
  filterCarriagesBeyondMergePoint,
  mergeTrainsCarriages,
};
