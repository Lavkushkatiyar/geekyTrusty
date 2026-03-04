const travelCost = {
  base: 50,
  perKm: 6.5,
  perMinute: 2,
  serviceTax: 20,
};

const calculateDistance = (startX, startY, destinationX, destinationY) =>
  Math.sqrt((destinationX - startX) ** 2 + (destinationY - startY) ** 2);

const calculateSubtotal = (distance, timeInMinutes, costConfig) => {
  return (
    costConfig.base +
    distance * costConfig.perKm +
    timeInMinutes * costConfig.perMinute
  );
};

const applyServiceTax = (amount, taxPercent) => {
  return amount + (amount * taxPercent) / 100;
};

const calculateRideFare = (rideData, rider, costConfig) => {
  const { destinationX, destinationY, timeInMinutes, rideId } =
    rideData.endRide;

  const distance = calculateDistance(
    rider.x,
    rider.y,
    destinationX,
    destinationY,
  ).toFixed(2);

  const subtotal = calculateSubtotal(distance, timeInMinutes, costConfig);
  const total = applyServiceTax(subtotal, costConfig.serviceTax);
  return { rideId, driver: rideData.driverId, amount: total.toFixed(2) };
};

const getBillData = (_BILL, endRideData, riders) =>
  endRideData.map((rideData, index) =>
    calculateRideFare(rideData, riders[index], travelCost),
  );

module.exports = {
  getBillData,
  calculateDistance,
  calculateSubtotal,
  applyServiceTax,
  calculateRideFare,
};
