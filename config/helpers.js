const interpolate = (str, values) => {
  return str.replace(/{([^{}]*)}/g, (a, b) => {
    const r = values[b];
    return typeof r === "string" || typeof r === "number" ? r : a;
  });
};

const getLocalDateAndTime = () => {
  return new Date().toLocaleString("nl-BE", {
    timeZone: "Europe/Brussels",
  });
};

export { interpolate, getLocalDateAndTime };
