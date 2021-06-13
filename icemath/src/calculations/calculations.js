export const calculateIce = (
  water_start_temp,
  water_start_units,
  water_finish_temp,
  water_finish_units,
  water_amount,
  water_amount_units,
  result_units
) => {
  // Calculates the amount of ice needed to cool water down to the temperature specified

  var t_s = temperatureToC(water_start_temp, water_start_units);
  var t_f = temperatureToC(water_finish_temp, water_finish_units);
  var m_w = waterAmountToGrams(water_amount, water_amount_units);

  // calculate the result in grams of ice
  var result = (4.186 * m_w * (t_s - t_f)) / (334 + 4.186 * t_f);


  result = iceFromGramsToUnits(result, result_units)
  result = Math.round(result * 100) / 100;
  console.log(result);
  return result;
};

export const waterAmountToGrams = (amount, units) => {
  // Takes a value and its units (can be kg, g, or gal) and returns the value in grams
  var ret_amount;

  switch (units) {
    case "g":
      ret_amount = amount;
      break;
    case "gal":
      ret_amount = amount * 3785.4118;
      break;
    case "kg":
      ret_amount = amount * 1000;
      break;
    default:
      throw new Error('Water volume/mass units not recognized');
  }

  return ret_amount
}

export const temperatureToC = (value, units) => {
  // Takes a temperature and its units (can be F or C) and returns the temperature in C
  var ret_temperature;

  switch (units) {
    case "C":
      ret_temperature = value;
      break;
    case "F":
      ret_temperature = ((value - 32) * 5) / 9;
      break;
    default:
      throw new Error('Temperature units not recognized');
  }

  return ret_temperature;
}

export const iceFromGramsToUnits = (value, desired_units) => {
  // Takes the ice amount in grams and converts it to the desired units
  var ret_ice;

  switch (desired_units) {
    case "g":
      ret_ice = value;
      break;
    case "gal":
      ret_ice = value / 3785.4118;
      break;
    case "kg":
      ret_ice = value / 1000;
      break;
    case "lbs":
      ret_ice = 0.00220462 * value;
      break;
    default:
      throw new Error('Temperature units not recognized');
  }

  return ret_ice;
}