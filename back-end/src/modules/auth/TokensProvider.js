export class TokensProvider {
  constructor(jwtProvider) {
    this.jwtProvider = jwtProvider
  }
   async generate(payload, time) {
    const token = await this.jwtProvider.generate(payload, time);
    return token;
  }
  async verify(token){
    try {
       const decoded = await this.jwtProvider.verify(token);
       console.log("decoded", decoded)
    if(decoded.payload.role != 'ADMIN'){
      return {
        ...decoded,
        isAdmin: false,
        valid: true
      }
    }
    return {
      ...decoded,
      isAdmin: true,
      valid: true
    };
    } catch (error) {
      if(!error.valid){
        throw {
          valid: false
        }

      if(error.expired){
         throw await {
          payload: this.jwtProvider.decode(error.token),
          expired: true,
          valid: true
        }
      }
      throw error
    }
  }
}

  isOlder9Min(iat) {
    const now = Math.floor(Date.now() / 1000);
    const nineMin = 60 * 9;
    if((now - iat) >= nineMin){
        return true;
    }
    return false;
  }
}

import joseProvider from "../../infra/jose/joseProvider.js";

export default new TokensProvider(joseProvider);