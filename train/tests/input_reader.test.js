const { createInputReader } = require("../src/utils/input_reader.js");

describe("createInputReader", () => {
  test("should return  file content when valid path provided", () => {
    const mockFs = {
      readFileSync: jest.fn().mockReturnValue("TRAIN_A ENGINE NDL"),
    };

    const { readInputFile } = createInputReader(mockFs);

    const result = readInputFile("input.txt");

    expect(result).toBe("TRAIN_A ENGINE NDL");
    expect(mockFs.readFileSync).toHaveBeenCalledWith("input.txt", "utf8");
  });

  test("should return  null when inputFilePath is undefined", () => {
    const mockFs = {
      readFileSync: jest.fn(),
    };

    const { readInputFile } = createInputReader(mockFs);

    const result = readInputFile(undefined);

    expect(result).toBeNull();
    expect(mockFs.readFileSync).not.toHaveBeenCalled();
  });

  test("should return  null when inputFilePath is empty string", () => {
    const mockFs = {
      readFileSync: jest.fn(),
    };

    const { readInputFile } = createInputReader(mockFs);

    const result = readInputFile("");

    expect(result).toBeNull();
    expect(mockFs.readFileSync).not.toHaveBeenCalled();
  });

  test("should return null when readFileSync throws error", () => {
    const mockFs = {
      readFileSync: jest.fn(() => {
        throw new Error("File not found");
      }),
    };

    const { readInputFile } = createInputReader(mockFs);

    const result = readInputFile("invalid.txt");

    expect(result).toBeNull();
  });

  test("should not throw error even if filesystem crashes", () => {
    const mockFs = {
      readFileSync: jest.fn(() => {
        throw new Error("Unexpected failure");
      }),
    };

    const { readInputFile } = createInputReader(mockFs);

    expect(() => readInputFile("file.txt")).not.toThrow();
  });
});
