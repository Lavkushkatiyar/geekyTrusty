jest.mock("../src/utils/parser.js");
jest.mock("../src/domain/train_merger.js");
jest.mock("../src/domain/schedule_formatter.js");

const { extractCarriages } = require("../src/utils/parser.js");
const { generateMergeSchedule } = require("../src/domain/train_merger.js");
const { buildScheduleOutput } = require("../src/domain/schedule_formatter.js");

const { generateTrainSchedule } = require("../geektrust.js");

jest.mock("../src/utils/input_reader.js", () => ({
  createInputReader: jest.fn(),
}));

const { createInputReader } = require("../src/utils/input_reader.js");

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
      trainAArrival: ["A"],
      trainBArrival: ["B"],
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
    const mockReadInputFile = jest.fn().mockReturnValue("RAW_INPUT");

    createInputReader.mockReturnValue({
      readInputFile: mockReadInputFile,
    });

    extractCarriages.mockReturnValue({
      trainACarriages: [],
      trainBCarriages: [],
    });

    generateMergeSchedule.mockReturnValue({
      trainAArrival: [],
      trainBArrival: [],
      trainABdeparture: [],
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    generateTrainSchedule("input.txt");

    expect(consoleSpy).toHaveBeenCalledWith("JOURNEY_ENDED");

    consoleSpy.mockRestore();
  });

  test("handles errors gracefully", () => {
    const mockReadInputFile = jest.fn(() => {
      throw new Error("Failure");
    });

    createInputReader.mockReturnValue({
      readInputFile: mockReadInputFile,
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const exitSpy = jest
      .spyOn(process, "exit")
      .mockImplementation(() => {});

    generateTrainSchedule("input.txt");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
