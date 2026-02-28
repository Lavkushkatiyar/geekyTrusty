const handleStartRide = (rideCoordinate, drivers) => {
  const matchedDrivers = [];

  for (const { rideId, nthDriver, riderId } of rideCoordinate) {
    const matchedDriver = drivers.find((driver) => driver.match === riderId);
    const driver = matchedDriver.driverInRange[nthDriver - 1];
    if (matchedDriver) {
      matchedDrivers.push({ rideId, driver });
    }
  }
  return matchedDrivers;
};

const handleStopRide = (endRideCoordinate, startRide) => {
  const endRidesInformation = [];
  for (const endRide of endRideCoordinate) {
    const driverId = startRide.find((ride) =>
      ride.rideId === endRide.rideId
    ).driver;
    endRidesInformation.push({ endRide, driverId });
  }
  return endRidesInformation;
};
module.exports = {
  handleStartRide,
  handleStopRide,
};
