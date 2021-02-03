let evalBoolean = (value: string): boolean => {
  if (!value) return false;

  const cleanValue = value.toLowerCase().trim();
  if (cleanValue === "true") {
    return true;
  }
  return false;
};

export { evalBoolean };
