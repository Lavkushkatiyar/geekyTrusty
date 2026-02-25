const STDIN_FILE_DESCRIPTOR = 0;

const createInputReader = (fileSystem) => {
  const readInputFile = (inputFilePath) => {
    if (inputFilePath) {
      return fileSystem.readFileSync(inputFilePath, "utf8");
    }

    return fileSystem.readFileSync(STDIN_FILE_DESCRIPTOR, "utf8");
  };

  return { readInputFile };
};

module.exports = { createInputReader };
