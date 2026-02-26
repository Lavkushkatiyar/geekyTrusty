const { buildScheduleOutput } = require("../src/domain/schedule_formatter.js");

describe("buildScheduleOutput", () => {
  test("formats schedule correctly", () => {
    const mockSchedule = {
      trainAArrival: ["NDL", "NGP"],
      trainBArrival: ["PTA"],
      trainABdeparture: ["PTA", "NDL", "NGP"],
    };

    const result = buildScheduleOutput(mockSchedule);

    expect(result).toBe(
      `ARRIVAL TRAIN_A ENGINE NDL NGP
ARRIVAL TRAIN_B ENGINE PTA
DEPARTURE TRAIN_AB ENGINE ENGINE PTA NDL NGP`,
    );
  });
});
test("preserves bogie order", () => {
  const mockSchedule = {
    trainAArrival: ["A", "B", "C"],
    trainBArrival: ["D"],
    trainABdeparture: ["D", "C", "B", "A"],
  };

  const result = buildScheduleOutput(mockSchedule);

  expect(result.includes("A B C")).toBe(true);
  expect(result.includes("D C B A")).toBe(true);
});
