const distance = (x1, y1, x2, y2) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

const driverInRange = (driver, rider) =>
  distance(driver.x, driver.y, rider.x, rider.y) <= 5;

const sortDriverOnDistance = (matchedDrivers) => {
  const sortedDrivers = matchedDrivers.sort((a, b) => a.dist - b.dist);
  return sortedDrivers.map((driver) => driver.id);
};

const getDriversInRange = (rider, drivers) => {
  const matchedDrivers = [];
  for (const driver of drivers) {
    if (driverInRange(driver, rider)) {
      const dist = distance(driver.x, driver.y, rider.x, rider.y);
      matchedDrivers.push({ id: driver.id, dist });
    }
  }
  return sortDriverOnDistance(matchedDrivers);
};

const findMatchedDriver = (drivers, riders) => {
  for (const rider of riders) {
    const driverInRange = getDriversInRange(rider, drivers);
    console.log(driverInRange);

    // buildDriverMatchedOutput(driverInRange, rider);
  }
};

module.exports = {
  findMatchedDriver,
};
