export class CookiesService{
    send(res, name, item, age){
        try {
            const cookie = res.cookie(name, item, {
                maxAge: age,
                httpOnly: true,
                secure: false,
                sameSite: 'lax'
            });
            return cookie;
        } catch (error) {
            return error
        }
    }
}