const buildScheduleOutput = ({
  trainAArrival,
  trainBArrival,
  trainABdeparture,
}) => {
  const trainAText = trainAArrival.join(" ");
  const trainBText = trainBArrival.join(" ");
  const departureText = trainABdeparture.join(" ");

  return `ARRIVAL TRAIN_A ENGINE ${trainAText}\nARRIVAL TRAIN_B ENGINE ${trainBText}\nDEPARTURE TRAIN_AB ENGINE ENGINE ${departureText}`;
};
module.exports = { buildScheduleOutput };
