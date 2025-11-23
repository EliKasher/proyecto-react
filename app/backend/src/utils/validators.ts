const passwordValidator = {
  validator: function (password: string) {
    // Regex que verifica:
    // Al menos una mayúscula (?=.*[A-Z])
    // Al menos una minúscula (?=.*[a-z])
    // Al menos un número (?=.*\d)
    // Mínimo 8 caracteres .{8,}
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password);
  },
  errorMessage:
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.",
};

const urlRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const rutFormatRegex = /^\d{7,8}-(\d|k)$/i;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const chileanPhoneRegex = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/;

export const urlValidation = (url: string) => {
  return urlRegex.test(url);
};

export const validateRut = (rut: string): { isValid: boolean; msg: string } => {
  if (!rutFormatRegex.test(rut)) {
    return {
      isValid: false,
      msg: "Formato incorrecto. Ejemplo: 12345678-9.",
    };
  }

  function isRutValid(rut: string) {
    const [digits, lastDigit] = rut.toLowerCase().split("-");
    if (!digits || !lastDigit)
      return { isValid: false, msg: "El rut no cumple con el formato" };

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

export const validateEmail = (email: string) => emailRegex.test(email);

export const validatePhone = (phone: string) => chileanPhoneRegex.test(phone);

export default {
  passwordValidator,
  urlValidation,
  validateRut,
  validateEmail,
  validatePhone,
};
