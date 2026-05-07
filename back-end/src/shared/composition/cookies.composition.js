import { CookiesService } from "../services/cookies.service.js";

export function MakeCookiesModule(){
    return new CookiesService();
}