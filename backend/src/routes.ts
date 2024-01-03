import { DefaultController } from "@/controllers/default_controller";
import { IControllerRoute } from "fortjs";
import { UserController } from "./controllers/user_controller";
import { AuthController } from "./controllers/auth_controller";
import { LoanController } from "./controllers/loan_controller";

export const routes: IControllerRoute[] = [{
    path: "/*",
    controller: DefaultController
},
{
    path: "/user",
    controller: UserController
},
{
    path: "/loan",
    controller: LoanController
},
{
    path: "/auth",
    controller: AuthController
}
]