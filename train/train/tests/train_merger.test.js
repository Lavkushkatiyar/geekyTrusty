const {
  sortCarriagesByDistanceDesc,
  filterCarriagesBeyondMergePoint,
  mergeTrainsCarriages,
  generateMergeSchedule,
} = require("../src/domain/train_merger.js");

const {
  TRAIN_A_ROUTE,
} = require("../src/constants/routes.js");

describe("filterCarriagesBeyondMergePoint", () => {
  test("keeps stations at or after HYB", () => {
    const carriages = ["SLM", "HYB", "NGP"];

    const result = filterCarriagesBeyondMergePoint(
      carriages,
      TRAIN_A_ROUTE,
      "HYB",
    );

    expect(result).toEqual(["HYB", "NGP"]);
  });
});

describe("sortCarriagesByDistanceDesc", () => {
  test("sorts by descending distance", () => {
    const route = { A: 100, B: 300, C: 200 };
    const carriages = ["A", "C", "B"];

    const result = sortCarriagesByDistanceDesc(carriages, route);

    expect(result).toEqual(["B", "C", "A"]);
  });
});

describe("mergeTrainsCarriages", () => {
  test("concatenates both train lists", () => {
    const result = mergeTrainsCarriages(
      ["A", "B"],
      ["C"],
    );

    expect(result).toEqual(["A", "B", "C"]);
  });
});

describe("generateMergeSchedule", () => {
  test("generates correct merged schedule", () => {
    const trainA = ["NDL", "SLM", "NGP"];
    const trainB = ["PTA", "SRR"];

    const result = generateMergeSchedule(trainA, trainB);

    expect(result.trainAArrival).toContain("NDL");
    expect(result.trainBArrival).toContain("PTA");
    expect(result.trainABdeparture.length).toBeGreaterThan(0);
  });
});
