const formatDriversMatched = (matchedDrivers = []) =>
  matchedDrivers
    .filter((entry) =>
      entry && entry.driverInRange && entry.driverInRange.length
    )
    .map((entry) => "DRIVERS_MATCHED " + entry.driverInRange.join(" "));

const formatRideStarted = (startedRides = []) =>
  startedRides
    .filter((ride) => ride && ride.rideId)
    .map((ride) => "RIDE_STARTED " + ride.rideId);

const formatRideStopped = (stoppedRides = []) =>
  stoppedRides
    .filter((entry) => entry && entry.endRide && entry.endRide.rideId)
    .map((entry) => "RIDE_STOPPED " + entry.endRide.rideId);

const formatBills = (bills = []) =>
  bills
    .filter((bill) => bill && bill.rideId && bill.driver)
    .map((bill) => {
      const amount = Number(bill.amount).toFixed(2);
      return "BILL " + bill.rideId + " " + bill.driver + " " + amount;
    });

const formatBill = (
  matchedDrivers,
  startedRides,
  stoppedRides,
  bills,
) =>
  [
    ...formatDriversMatched(matchedDrivers),
    ...formatRideStarted(startedRides),
    ...formatRideStopped(stoppedRides),
    ...formatBills(bills),
  ].join("\n");

module.exports = {
  formatBill,
};
