import { Shield, textResult,  redirectResult } from "fortjs";
export class UserAuthentication extends Shield {

    async protect() {
        const isExist = await this.session.isExist('userId');
        if (isExist) { // user is authenticated so allow
            return null;
        } else { //user is not authenticated, so redirect to login page
            return redirectResult("/");
        }
    }
}