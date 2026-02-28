const drivers = {};
const riders = {};
const rides = {};
const match = {};
const bill = {};

const handleAddDriver = ([id, x, y]) => {
  drivers[id] = { x: Number(x), y: Number(y) };
  return drivers;
};

const handleAddRider = ([id, x, y]) => {
  riders[id] = { x: Number(x), y: Number(y) };
  return riders;
};

const handleMatch = ([riderId]) => {
  match[riderId] = riderId;
  return match;
};

const handleStartRide = ([rideId, driverId, riderId]) => {
  rides[rideId] = { driverId, riderId, started: true };
  return rides;
};

const handleStopRide = ([rideId, x, y, time]) => {
  rides[rideId] = {
    ...rides[rideId],
    endX: Number(x),
    endY: Number(y),
    time: Number(time),
    stopped: true,
  };
  return rides;
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
