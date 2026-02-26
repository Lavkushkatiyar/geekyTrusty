const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const runProgram = (input) => {
  const inputPath = path.join(__dirname, "temp_input.txt");
  fs.writeFileSync(inputPath, input);

  const output = execSync(
    `node ${path.join(__dirname, "../geektrust.js")} ${inputPath}`,
  ).toString();

  return output.trim();
};

describe("Failing Geektrust Test Cases", () => {
  test("Test Case 1", () => {
    const input = `TRAIN_A ENGINE NDL NDL KRN GHY SLM NJP NGP BLR
TRAIN_B ENGINE NJP GHY AGA PNE MAO BPL PTA`;

    const expected = `ARRIVAL TRAIN_A ENGINE NDL NDL GHY NJP NGP
ARRIVAL TRAIN_B ENGINE NJP GHY AGA BPL PTA
DEPARTURE TRAIN_AB ENGINE ENGINE GHY GHY NJP NJP PTA NDL NDL AGA BPL NGP`;

    expect(runProgram(input)).toBe(expected);
  });

  test("Test Case 3", () => {
    const input = `TRAIN_A ENGINE BLR AGA BLR HYB ITJ BPL
TRAIN_B ENGINE PTA HYB BPL ITJ SRR NJP`;

    const expected = `ARRIVAL TRAIN_A ENGINE AGA HYB ITJ BPL
ARRIVAL TRAIN_B ENGINE PTA HYB BPL ITJ NJP
DEPARTURE TRAIN_AB ENGINE ENGINE NJP PTA AGA BPL BPL ITJ ITJ`;

    expect(runProgram(input)).toBe(expected);
  });

  test("Test Case 4", () => {
    const input = `TRAIN_A ENGINE NGP KRN NGP NDL HYB BPL
TRAIN_B ENGINE GHY PTA NJP PNE MAQ BPL`;

    const expected = `ARRIVAL TRAIN_A ENGINE NGP NGP NDL HYB BPL
ARRIVAL TRAIN_B ENGINE GHY PTA NJP BPL
DEPARTURE TRAIN_AB ENGINE ENGINE GHY NJP PTA NDL BPL BPL NGP NGP`;

    expect(runProgram(input)).toBe(expected);
  });
});
