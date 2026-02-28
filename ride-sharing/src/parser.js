const drivers = [];
const riders = [];
const startRides = [];
const endRides = [];
const match = [];
const bill = [];

const handleAddDriver = ([id, x, y]) => {
  const driver = { id, x: Number(x), y: Number(y) };
  drivers.push(driver);
  return drivers;
};

const handleAddRider = ([id, x, y]) => {
  riders.push({ id, x: Number(x), y: Number(y) });
  return riders;
};

const handleMatch = ([riderId]) => {
  match.push(riderId);
  return match;
};

const handleStartRide = ([rideId, nthDriver, riderId]) => {
  startRides.push({ rideId, nthDriver, riderId });
  return startRides;
};

const handleStopRide = ([rideId, x, y, time]) => {
  endRides.push({
    rideId,
    endX: Number(x),
    endY: Number(y),
    time: Number(time),
  });
  return endRides;
};

const handleBill = ([billData]) => {
  bill[billData] = billData;
  return bill;
};

const instructionHandlers = {
  "ADD_DRIVER": handleAddDriver,
  "ADD_RIDER": handleAddRider,
  "MATCH": handleMatch,
  "START_RIDE": handleStartRide,
  "STOP_RIDE": handleStopRide,
  "BILL": handleBill,
};

const parseInstructions = (inputData) => {
  const instructions = {};
  for (const input of inputData) {
    const [instruction, ...instructionData] = input.split(" ");
    const data = instructionHandlers[instruction](instructionData);
    instructions[instruction] = data;
  }
  return instructions;
};

const parser = (rawInput) => {
  const inputData = rawInput.split("\n");
  return parseInstructions(inputData);
};
module.exports = {
  parser,
};
