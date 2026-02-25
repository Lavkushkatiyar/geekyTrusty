const { createInputReader } = require("../src/utils/input_reader.js");

describe("inputReader", () => {
  test("reads from file when path provided", () => {
    const mockFs = {
      readFileSync: jest.fn().mockReturnValue("FILE"),
    };

    const { readInputFile } = createInputReader(mockFs);

    const result = readInputFile("input.txt");

    expect(mockFs.readFileSync)
      .toHaveBeenCalledWith("input.txt", "utf8");

    expect(result).toBe("FILE");
  });

  test("reads from STDIN when no path provided", () => {
    const mockFs = {
      readFileSync: jest.fn().mockReturnValue("STDIN"),
    };

    const { readInputFile } = createInputReader(mockFs);

    const result = readInputFile();

    expect(mockFs.readFileSync)
      .toHaveBeenCalledWith(0, "utf8");

    expect(result).toBe("STDIN");
  });
});
