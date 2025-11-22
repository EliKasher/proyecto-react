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

export default {
  passwordValidator,
};
