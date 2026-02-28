const travelCost = {
  base: 50,
  perKm: 6.5,
  perMinute: 2,
  serviceTax: 20,
};

const calculateDistance = (startX, startY, endX, endY) =>
  Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

const calculateSubtotal = (distance, time, costConfig) => {
  return (
    costConfig.base +
    distance * costConfig.perKm +
    time * costConfig.perMinute
  );
};

const applyServiceTax = (amount, taxPercent) => {
  return amount + (amount * taxPercent) / 100;
};

const calculateRideFare = (rideData, rider, costConfig) => {
  const { endX, endY, time, rideId } = rideData.endRide;

  const distance = calculateDistance(rider.x, rider.y, endX, endY);
  const subtotal = calculateSubtotal(distance, time, costConfig);
  const total = applyServiceTax(subtotal, costConfig.serviceTax);

  return {
    rideId,
    driver: rideData.driverId,
    amount: total.toFixed(2),
  };
};

const getBillData = (_BILL, endRideData, riders) =>
  endRideData.map((rideData, index) =>
    calculateRideFare(rideData, riders[index], travelCost)
  );

module.exports = {
  getBillData,
};
