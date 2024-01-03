import { Controller, TGuard, guards, http, textResult } from "fortjs";
import { auth } from "fortjs-passport";


export class AuthController extends Controller { 
    @http.post('/login')
    @guards(auth.guard('local') as TGuard)
    async doLogin(){
        const {user} = this.request as any;

        console.log("user login: ", user);
        return textResult(`Welcome ${user.name}`);
    }
}
