export class AuthService {
  constructor(TokensProvide, AuthRepository) {
    this.TokensProvider = TokensProvide;
    this.AuthRepository = AuthRepository;
  }
  async generateTokens(payload){
      const accessToken = await this.TokensProvider.generate(payload, '30m');
      const refreshToken = await this.TokensProvider.generate(payload, '15d');
      const result = await this.AuthRepository.create({userId: payload.userId, token: refreshToken}); 
      return {
        accessToken,
        refreshToken
      }
  }
  async generate(payload) {
    let access_token;
    let refresh_token;
    try {
      access_token = await this.TokensProvider.generate(payload, "30m");
      refresh_token = await this.TokensProvider.generate(
        { userId: payload.id },
        "15d"
      );
      console.log("refresh-tokend", refresh_token);
      console.log("access-tokken", access_token);
      const result = await this.AuthRepository.create({
        userId: payload.id,
        token: refresh_token,
      });
      console.log("result", result);

      console.log("access-token", access_token, "refresh-token", refresh_token);
      return { 
          access_token,
          refresh_token,
      }
    } catch (error) {
      console.log("error", error);
      if ( error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002') {
      console.log('duplicadooooo')
        const del = await this.AuthRepository.deleteByUserId(payload.id);
        console.log("delete", del);
        const result = await this.AuthRepository.create({
          userId: payload.id,
          token: refresh_token
        });
        return {
            access_token,
            refresh_token
          }/*  */
        };
      throw error;
    }
  }

  async verify(access_token, refresh_token) {
    try {
      const token = await this.TokensProvider.verify(access_token);

      console.log('token', token)

      if(!token.valid) throw { valid: false}

      console.log('58')

      if (!token.isAdmin) throw { isAdmin: false, valid: true};

      console.log('62')

      if(token.expired) throw {valid: true, isAdmin: true, expired: true}

      if (this.TokensProvider.isOlder9Min(token.payload.iat)) {
        return {
          access_token: await this.TokensProvider.generate(token, "30min"),
          valid: true,
          isAdmin: true
        };
      }

      return { access_token, valid: true, isAdmin: true };
    } catch (error) {
      if (error.valid && error.expired && error.isAdmin) {
        console.log('valid', 'expired')
        try {
          const refreshPayload = await this.TokensProvider.verify(refresh_token)
            .decoded.payload;

          const storedRefresh = await this.AuthRepository.get(
            refreshPayload.userId
          );
          if (!storedRefresh) throw new Error("Refresh token not found");
          const refreshToken = await this.TokensProvider.generate(
            refreshPayload,
            "15d"
          );
          return {
            valid: true,
            refreshToken,
          };
        } catch {
          throw { error: new Error("invalid Refresh token"), valid: false };
        }
      }
      console.log('error', error)
      throw error;
    }
  }
}