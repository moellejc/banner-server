let evalBoolean = (value: string): boolean => {
  const cleanValue = value.toLowerCase().trim();
  if (cleanValue === "true") {
    return true;
  }
  return false;
};

export { evalBoolean };
