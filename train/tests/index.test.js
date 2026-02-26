jest.mock("../src/utils/parser.js");
jest.mock("../src/domain/train_merger.js");
jest.mock("../src/domain/schedule_formatter.js");
jest.mock("../src/utils/input_reader.js", () => ({
  createInputReader: jest.fn(),
}));

const { extractCarriages } = require("../src/utils/parser.js");
const { generateMergeSchedule } = require("../src/domain/train_merger.js");
const { buildScheduleOutput } = require("../src/domain/schedule_formatter.js");
const { createInputReader } = require("../src/utils/input_reader.js");
const { generateTrainSchedule } = require("../geektrust.js");

describe("generateTrainSchedule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("prints formatted schedule when departure exists", () => {
    const mockReadInputFile = jest.fn().mockReturnValue("RAW_INPUT");

    createInputReader.mockReturnValue({
      readInputFile: mockReadInputFile,
    });

    extractCarriages.mockReturnValue({
      trainACarriages: ["A"],
      trainBCarriages: ["B"],
    });

    generateMergeSchedule.mockReturnValue({
      trainABdeparture: ["B", "A"],
    });

    buildScheduleOutput.mockReturnValue("FORMATTED_OUTPUT");

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    generateTrainSchedule("input.txt");

    expect(mockReadInputFile).toHaveBeenCalledWith("input.txt");
    expect(consoleSpy).toHaveBeenCalledWith("FORMATTED_OUTPUT");

    consoleSpy.mockRestore();
  });

  test("prints JOURNEY_ENDED when no departure bogies", () => {
    createInputReader.mockReturnValue({
      readInputFile: jest.fn().mockReturnValue("RAW_INPUT"),
    });

    extractCarriages.mockReturnValue({
      trainACarriages: [],
      trainBCarriages: [],
    });

    generateMergeSchedule.mockReturnValue({
      trainABdeparture: [],
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    generateTrainSchedule("input.txt");

    expect(consoleSpy).toHaveBeenCalledWith("JOURNEY_ENDED");

    consoleSpy.mockRestore();
  });

  test("does nothing when rawInput is null", () => {
    createInputReader.mockReturnValue({
      readInputFile: jest.fn().mockReturnValue(null),
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    generateTrainSchedule("input.txt");

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test("does nothing when inputFilePath is undefined", () => {
    createInputReader.mockReturnValue({
      readInputFile: jest.fn().mockReturnValue(null),
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    generateTrainSchedule(undefined);

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
