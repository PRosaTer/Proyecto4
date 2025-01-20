export const registerUser = async ({
  name,
  email,
  password,
  address,
  phone,
}) => {
  if (!name || !email || !password || !address || !phone) {
    return {
      success: false,
      error: "Por favor, completa todos los campos.",
    };
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: "El correo electrónico no es válido.",
    };
  }

  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return {
      success: false,
      error:
        "El número de teléfono no es válido. Debe contener solo números y entre 10 y 15 dígitos.",
    };
  }

  try {
    const response = await fetch(
      "https://proyecto4-qrq4.onrender.com/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, address, phone }),
      }
    );

    if (!response.ok) {
      if (response.status === 409) {
        return {
          success: false,
          error: "El correo electrónico ya está registrado.",
        };
      } else {
        throw new Error("Error al registrar usuario");
      }
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      error: "Error, este mail ya existe",
    };
  }
};
