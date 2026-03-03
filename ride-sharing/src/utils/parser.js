const driverRegistrations = [];
const riderRegistrations = [];
const rideStartRequests = [];
const rideStopRequests = [];
const matchRequests = [];
const billRequests = [];

const registerDriver = ([driverId, x, y]) => {
  driverRegistrations.push({
    driverId,
    x: Number(x),
    y: Number(y),
  });
  return driverRegistrations;
};

const registerRider = ([riderId, x, y]) => {
  riderRegistrations.push({
   riderId: riderId.trim(),
    x: Number(x),
    y: Number(y),
  });
  return riderRegistrations;
};

const registerMatchRequest = ([riderId]) => {
  matchRequests.push(riderId.trim());
  return matchRequests;
};

const registerRideStartRequest = ([rideId, driverRank, riderId]) => {
  rideStartRequests.push({
    rideId,
    driverRank,
   riderId: riderId.trim(),
  });
  return rideStartRequests;
};

const registerRideStopRequest = ([rideId, x, y, timeInMinutes]) => {
  rideStopRequests.push({
    rideId,
    destinationX: Number(x),
    destinationY: Number(y),
    timeInMinutes: Number(timeInMinutes),
  });
  return rideStopRequests;
};

const registerBillRequest = ([rideId]) => {
  billRequests.push(rideId);
  return billRequests;
};

const instructionHandlers = {
  ADD_DRIVER: registerDriver,
  ADD_RIDER: registerRider,
  MATCH: registerMatchRequest,
  START_RIDE: registerRideStartRequest,
  STOP_RIDE: registerRideStopRequest,
  BILL: registerBillRequest,
};

const parseCommandLines = (inputLines) => {
  for (const line of inputLines) {
    const [command, ...commandArgs] = line.split(" ");
    instructionHandlers[command](commandArgs);
  }

  return {
    driverRegistrations,
    riderRegistrations,
    matchRequests,
    rideStartRequests,
    rideStopRequests,
    billRequests,
  };
};

const parseRideCommands = (rawInput) => {
  const inputLines = rawInput.split("\n")
  return parseCommandLines(inputLines);
};

module.exports = {
  parseRideCommands,
};
