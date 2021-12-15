padding = (...args) => {
  const [str, len, char] = args;
  return (Array(len).join(char) + str).substr(-len);
}

differenceBetweenHours = (...args) => {
  const [startTime, endTime, delimiter] = args;
  const times = coversionTimeChainToTimeNumberRefactoring(startTime, endTime);
  const diff = new Date(times.endofworktime - times.startofworktime);

  return padding(diff.getUTCHours(), 2, 0) + '' + delimiter + '' + padding(diff.getUTCMinutes(), 2, 0);
}

coversionTimeChainToTimeNumberRefactoring = (startTime, endTime) => {
  const day = "0 ";
  const startofworktime = new Date(day + startTime).getTime();
  const endofworktime = new Date(day + endTime).getTime();

  return { startofworktime, endofworktime }
}

module.exports = {
  differenceBetweenHours,
  coversionTimeChainToTimeNumberRefactoring
};
