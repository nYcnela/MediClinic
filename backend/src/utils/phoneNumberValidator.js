export const validatePhoneNumber = (fullPhoneNumber) => {
  const continuousNumber = fullPhoneNumber.replaceAll(" ", "");

  if (
    (continuousNumber.startsWith("0048") && continuousNumber.length === 13) ||
    (continuousNumber.startsWith("+48") && continuousNumber.length === 12) ||
    (!continuousNumber.startsWith("0048") && !continuousNumber.startsWith("+48") && continuousNumber.length === 9)
  ) {
    const digits = continuousNumber.replace(/^\D+/g, ""); // usuwa prefiks nienumeryczny

    if (!/^\d+$/.test(digits)) {
      throw new Error("Numer telefonu zawiera znaki inne niż cyfry!");
    }

    return true;
  } else {
    throw new Error("Wprowadzony numer telefonu nie jest poprawny!");
  }
}
