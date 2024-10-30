import { check } from "express-validator";

const phoneNumberValidator = () => {
  return check("phoneNumber")
    .notEmpty()
    .withMessage("Nie wprowadzono numeru telefonu!")
    .custom((fullPhoneNumber) => {
      const continuousNumber = fullPhoneNumber.replaceAll(" ", "");

      if (
        (continuousNumber.startsWith("0048") && continuousNumber.length === 13) ||
        (continuousNumber.startsWith("+48") && continuousNumber.length === 12) ||
        (!continuousNumber.startsWith("0048") && !continuousNumber.startsWith("+48") && continuousNumber.length === 9)
      ) {
        const digits = continuousNumber.replace(/^\D+/g, ""); 

        if (/^\d+$/.test(digits)) {
          return true; 
        }
      }
      
      return false;
    })
    .withMessage("Wprowadzony numer telefonu nie jest poprawny lub zawiera inne znaki niż cyfry!");
};

export default phoneNumberValidator