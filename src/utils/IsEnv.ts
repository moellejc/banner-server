let isPROD = (): boolean => {
  return process.env.APP_ENV?.trim().toLocaleUpperCase() === "PROD";
};

let isQA = (): boolean => {
  return process.env.APP_ENV?.trim().toLocaleUpperCase() === "QA";
};

let isDEV = (): boolean => {
  return process.env.APP_ENV?.trim().toLocaleUpperCase() === "DEV";
};

let isTEST = (): boolean => {
  return process.env.APP_ENV?.trim().toLocaleUpperCase() === "TESTING";
};

export { isPROD };
export { isQA };
export { isDEV };
export { isTEST };
