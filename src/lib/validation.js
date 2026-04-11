export const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Email inválido",
  },
  dni: {
    pattern: /^\d{7,10}$/,
    message: "DNI debe tener 7-10 dígitos",
  },
  phone: {
    pattern: /^\d{7,12}$/,
    message: "Teléfono debe tener 7-12 dígitos",
  },
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
    message: "Mínimo 8 caracteres, 1 mayúscula y 1 número",
  },
  name: {
    pattern: /^[a-záéíóúñ\s]{2,50}$/i,
    message: "Nombre debe tener 2-50 caracteres alfabéticos",
  },
  required: {
    validate: (value) => value && value.toString().trim().length > 0,
    message: "Este campo es requerido",
  },
};

export const validate = (value, rules = []) => {
  for (const rule of rules) {
    if (rule === "required") {
      if (!validationRules.required.validate(value)) {
        return validationRules.required.message;
      }
    } else if (validationRules[rule]) {
      const ruleObj = validationRules[rule];
      if (ruleObj.pattern && !ruleObj.pattern.test(value)) {
        return ruleObj.message;
      }
      if (ruleObj.validate && !ruleObj.validate(value)) {
        return ruleObj.message;
      }
    }
  }
  return null;
};

export const validateForm = (formData, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach((field) => {
    const error = validate(formData[field] || "", schema[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};
