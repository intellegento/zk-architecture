const ChunkArray = (array, cols = 1) => {
  return array.reduce((acc, item, index) => {
    const column = index % cols;
    if (acc[column]) {
      acc[column].push(item);
    } else {
      acc[column] = [item];
    }
    return acc;
  }, []);
};

export default ChunkArray;
