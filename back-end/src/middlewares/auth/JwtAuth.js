class AuthMiddlewares {
  constructor(TokenService){
    this.tokenService = TokenService
  }
 async adminAuth (req, res, next) {

    const {
    "access-token": access_token,
    "refresh-token": refresh_token
    } = req.cookies;  

    console.log('tokens', 'access-token', access_token, 'refresh-token', refresh_token)

    if(!access_token || !refresh_token) return res.status(401).json({error: 'invalid tokens'})

    const result = await this.tokenService.verify(access_token, refresh_token);

    console.log('result', result)

    if (!result.valid) return res.status(401).json({ error: "invalid token" });

    if (!result.idAdmin) return res.status(403).json({ error: "user don't have access" });

    if (result.access_token) {
      res.cookie("access-token", result.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      });
    }
    if (result.refresh_token) {
      res.cookie("refresh-token", result.refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }
    return next();
}

async userAuth(req, res, next){
  const {
    "access-token": access_token,
    "refresh-token": refresh_token
  } = req.cookies;  

const result = await this.tokenService.verify(access_token, refresh_token);

if(!result.valid) return res.status(401).json({error: 'invalid token'});

if(result.access_token){
    res.cookie("access-token", result.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
}
if(result.refresh_token){
  res.cookie("refresh-token", result.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

next()
}

}

import TokensService from "../../services/TokensService.js";

export default new AuthMiddlewares(TokensService)

