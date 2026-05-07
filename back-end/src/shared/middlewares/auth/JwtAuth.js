class AuthMiddlewares {
  constructor(AuthService){
    this.AuthService = AuthService;
  }
 async adminAuth (req, res, next) {

    const {
    "access-token": access_token,
    "refresh-token": refresh_token
    } = req.cookies;  

    console.log('tokens', 'access-token', access_token, 'refresh-token', refresh_token)

    if(!access_token || !refresh_token) return res.status(401).json({error: 'tokens are required'})

    console.log('1')
    let result;
    try {
       result = await this.AuthService.verify(access_token, refresh_token);
      console.log('result', result)
    } catch (error) {

      console.log('error', error)

      if (!error.valid) return res.status(401).json({ error: "invalid token" });

    if (!error.isAdmin) return res.status(403).json({ error: "user is not authorized" });
    }
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
    console.log('loginnnn')
    return next();
}

async userAuth(req, res, next){
  const {
    "access-token": access_token,
    "refresh-token": refresh_token
  } = req.cookies;  

const result = await this.AuthService.verify(access_token, refresh_token);

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

import { MakeAuthModule } from "../../../modules/auth/auth.composition.js";
const AuthService = MakeAuthModule()

export default new AuthMiddlewares(AuthService);

