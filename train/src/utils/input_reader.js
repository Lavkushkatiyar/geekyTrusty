const createInputReader = (fileSystem) => {
  const readInputFile = (inputFilePath) => {
    if (!inputFilePath) return null;
    try {
      return fileSystem.readFileSync(inputFilePath, "utf8");
    } catch {
      return null;
    }
  };

  return { readInputFile };
};
module.exports = {
  createInputReader,
};
