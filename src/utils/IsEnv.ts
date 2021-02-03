let isPROD = (): boolean => {
  return process.env.APP_ENV?.trim().toLocaleUpperCase() === "PROD";
};

let isDEV = (): boolean => {
  return process.env.APP_ENV?.trim().toLocaleUpperCase() === "DEV";
};

let isTEST = (): boolean => {
  return process.env.APP_ENV?.trim().toLocaleUpperCase() === "TESTING";
};

export { isPROD };
export { isDEV };
export { isTEST };
