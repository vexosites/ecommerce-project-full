export class CookiesService{
    constructor(response){
        this.req = response;
    }
    send(name, item, age){
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