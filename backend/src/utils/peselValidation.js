export const isValidPesel = (pesel) => {
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += parseInt(pesel[i]) * weights[i];
  }

  const controlDigit = (10 - (sum % 10)) % 10;
  //   console.log("CYFRA KONTROLNA: ", controlDigit);
  //   console.log("OSTATNI CYFRA W PESELU: ", pesel[10]);
  return controlDigit === parseInt(pesel[10]);
};
