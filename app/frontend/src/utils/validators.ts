const urlRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const rutFormatRegex = /^\d{7,8}-(\d|k)$/i;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const chileanPhoneRegex = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/;

const urlValidation = (url: string) => {
  return urlRegex.test(url);
};

const validateRut = (rut: string): { isValid: boolean; msg: string } => {
  if (!rutFormatRegex.test(rut)) {
    return {
      isValid: false,
      msg: "Formato incorrecto. Ejemplo: 12345678-9.",
    };
  }

  function isRutValid(rut: string) {
    const [digits, lastDigit] = rut.toLowerCase().split("-");
    if (!digits || !lastDigit) return false;

    const reverseDigits = digits.split("").reverse();

    const digitsMultiplied = reverseDigits.map(
      (digit, index) => Number(digit) * (2 + (index % 6))
    );

    const sum = digitsMultiplied.reduce((acc, val) => acc + val, 0);
    const mod = sum % 11;
    const check = 11 - mod;

    const expected = check === 11 ? "0" : check === 10 ? "k" : String(check);

    return lastDigit === expected;
  }

  if (!isRutValid(rut)) {
    return { isValid: false, msg: "El RUT no es válido." };
  }

  return { isValid: true, msg: "" };
};

const validateEmail = (email: string) => emailRegex.test(email);

const validatePhone = (phone: string) => chileanPhoneRegex.test(phone);

export { urlValidation, validateRut, validateEmail, validatePhone };
