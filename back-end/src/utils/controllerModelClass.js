async function Controller(req, res, validator, service, cookies) {
  try {
    let result;
    if(validator){
      const data = await validator(req);
      result = await service(data);
    }
    result = await service();

    if (cookies) {
      for (const cookie of cookies) {
        const valueSplited = cookie.value.split('.'); // pega a propriedade dinâmica
        const cookieValue = result[valueSplited[0]]?.[valueSplited[1]]; // opcional

        if (cookieValue !== undefined) {
          res.cookie(cookie.name, cookieValue, { ...cookie.config });
        } else {
          console.warn(`Propriedade ${cookie.value} não encontrada em result`);
        }
      }
    }

    return res.status(result.statusCode || 200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
}

export default Controller;