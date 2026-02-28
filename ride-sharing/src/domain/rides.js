const handleStartRide = (rideCoordinate, drivers) => {
  const matchedDrivers = [];

  for (const { rideId, nthDriver, riderId } of rideCoordinate) {
    const driver = drivers.find((driver) => driver.match === riderId);
    const matchedDriver = driver.driverInRange[nthDriver - 1];
    if (matchedDriver) {
      matchedDrivers.push({ rideId, matchedDriver });
    }
  }
  return matchedDrivers;
};

module.exports = {
  handleStartRide,
};
