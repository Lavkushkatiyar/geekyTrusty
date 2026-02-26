const { extractCarriages } = require("../src/utils/parser.js");

describe("extractCarriages", () => {
  test("parses input correctly", () => {
    const input = `TRAIN_A ENGINE NDL NGP
TRAIN_B ENGINE PTA`;

    const result = extractCarriages(input);

    expect(result).toEqual({
      trainACarriages: ["NDL", "NGP"],
      trainBCarriages: ["PTA"],
    });
  });
});
