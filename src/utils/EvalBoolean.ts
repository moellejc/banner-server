let evalBoolean = (value: string): boolean => {
  const cleanValue = value.toLowerCase().trim();
  if (cleanValue === "true" || cleanValue === "1") {
    return true;
  }
  return false;
};

export { evalBoolean };
