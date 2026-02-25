const {
  filterCarriagesBeyondMergePoint,
} = require("../src/domain/train_merger.js");
const { TRAIN_A_ROUTE } = require("../src/constants/routes.js");

describe("filterCarriagesBeyondMergePoint", () => {
  test("keeps stations at or after HYB", () => {
    const carriages = ["SLM", "NGP"];

    const result = filterCarriagesBeyondMergePoint(
      carriages,
      TRAIN_A_ROUTE,
      "HYB",
    );

    expect(result).toEqual(["NGP"]);
  });
});
