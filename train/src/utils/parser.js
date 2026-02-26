const parseCarriages = (train) => {
  const [, , ...carriages] = train.trim().split(" ");
  return carriages;
};

const extractCarriages = (input) => {
  const [trainA, trainB] = input.trim()
    .split(/\r?\n/)
    .filter(Boolean);

  return {
    trainACarriages: parseCarriages(trainA),
    trainBCarriages: parseCarriages(trainB),
  };
};
module.exports = {
  extractCarriages,
};
