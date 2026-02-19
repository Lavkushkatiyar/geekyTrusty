const routeForTrain_B = () => {
  return {
    "TVC": 0,
    "SRR": 300,
    "MAQ": 600,
    "MAO": 1000,
    "PNE": 1400,
    "HYB": 2000,
    "NGP": 2400,
    "ITJ": 2700,
    "BPL": 2800,
    "PTA": 3800,
    "NJP": 4200,
    "GHY": 4700,
  };
};

const routeForTrain_A = () => {
  return {
    "CHN": 0,
    "SLM": 350,
    "BLR": 550,
    "KRN": 900,
    "HYB": 1200,
    "NGP": 1600,
    "ITJ": 1900,
    "BPL": 2000,
    "AGA": 2500,
    "NDL": 2700,
  };
};

const routeForMergeTrain = () => {
  return {
    "NGP": 1600,
    "ITJ": 1900,
    "BPL": 2000,
    "AGA": 2500,
    "NDL": 2700,
    "PTA": 3800,
    "NJP": 4200,
    "GHY": 4700,
  };
};

const buildScheduleOutput = ({ trainAArrival, trainBArrival, departure }) => {
  const trainAText = trainAArrival.join(" ");
  const trainBText = trainBArrival.join(" ");
  const departureText = departure.join(" ");

  return `ARRIVAL TRAIN_A ENGINE ${trainAText}
ARRIVAL TRAIN_B ENGINE ${trainBText}
DEPARTURE TRAIN_AB ENGINE ENGINE ${departureText}`;
};

const sortCarriagesByDistanceDesc = (carriages, route) => { // name
  return [...carriages].sort((carriageA, carriageB) =>
    route[carriageB] - route[carriageA]
  );
};

const mergeTrainsCarriages = (trainACarriages, trainBCarriages) => {
  return trainACarriages.concat(trainBCarriages);
};

const filterCarriagesBeyondMergePoint = (
  carriages,
  route,
  mergeStation = "HYB",
) => {
  const mergeStationDistance = route[mergeStation];

  const isAfterMergePoint = (carriage) =>
    // function inside a function
    route[carriage] > mergeStationDistance;

  return carriages.filter(isAfterMergePoint);
};

const generateMergedDeparturePlan = (trainACarriages, trainBCarriages) => {
  const trainARoute = routeForTrain_A();
  const trainBRoute = routeForTrain_B();
  const trainABRoute = routeForMergeTrain();
  const trainAArrival = filterCarriagesBeyondMergePoint(
    trainACarriages,
    trainARoute,
  );

  const trainBArrival = filterCarriagesBeyondMergePoint(
    trainBCarriages,
    trainBRoute,
  );

  const mergeTrain = mergeTrainsCarriages(trainAArrival, trainBArrival);
  const trainABdeparture = sortCarriagesByDistanceDesc(
    mergeTrain,
    trainABRoute,
  );

  return { trainAArrival, trainBArrival, trainABdeparture };
};

const parseCarriages = (train) => {
  const [_trainName, _engine, ...carriages] = train.trim().split(" ");
  return carriages;
};

const extractCarriages = (input) => {
  const [trainA, trainB] = input.trim().split(/\r?\n/);
  const trainACarriages = parseCarriages(trainA);
  const trainBCarriages = parseCarriages(trainB);
  return { trainACarriages, trainBCarriages };
};

const main = (inputFilePath) => {
  try {
    const input = Deno.readTextFileSync(inputFilePath);

    const { trainACarriages, trainBCarriages } = extractCarriages(input);

    const mergedCarriagesOrder = generateMergedDeparturePlan(
      trainACarriages,
      trainBCarriages,
    );
    if (mergedCarriagesOrder.trainABdeparture.length === 0) { //
      console.log("JOURNEY_ENDED");
      return;
    }

    const mergedSchedule = buildScheduleOutput(mergedCarriagesOrder);
    console.log(mergedSchedule);
  } catch {
    console.error("Error: program fails ");
    Deno.exit(1);
  }
};

export {
  buildScheduleOutput,
  extractCarriages,
  filterCarriagesBeyondMergePoint,
  generateMergedDeparturePlan,
  main,
  mergeTrainsCarriages,
  parseCarriages,
  routeForMergeTrain,
  routeForTrain_A,
  routeForTrain_B,
  sortCarriagesByDistanceDesc,
};
