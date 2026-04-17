async function Controller(req, res, validator, service, cookies) {
  console.log('controll-model', validator);

  try {
    let result;

    if (validator) {
      const data = await validator(req);
      result = await service(data);
    } else {
      result = await service();
    }

    if (cookies && Array.isArray(cookies)) {
      for (const cookie of cookies) {
        let cookieValue;

        // 🔥 suporta função (melhor abordagem)
        if (typeof cookie.value === "function") {
          cookieValue = cookie.value(result);
        }

        // 🔥 suporta string tipo "user.token"
        else if (typeof cookie.value === "string") {
          const valueSplited = cookie.value.split(".");
          cookieValue = result?.[valueSplited[0]]?.[valueSplited[1]];
        }

        // ⚠️ valor inválido
        else {
          console.warn(
            `Tipo inválido para cookie.value em "${cookie.name}". Esperado function ou string.`
          );
          continue;
        }

        if (cookieValue !== undefined) {
          res.cookie(cookie.name, cookieValue, { ...cookie.config });
        } else {
          console.warn(
            `Propriedade ${cookie.value} não encontrada em result`
          );
        }
      }
    }

    return res.status(result?.statusCode || 200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);

    return res.status(error?.statusCode || 500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
}

export default Controller;