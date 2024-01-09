
import { UserValidatorGuard } from "@/guards/user_validator_guard";
import { UserService } from "@/services/user_service";
import { worker, Controller, HTTP_METHOD, HTTP_STATUS_CODE, http, jsonResult, route, singleton, guards } from "fortjs";

export class UserController extends Controller {

    service: UserService;
    constructor(@singleton(UserService) service: UserService) {
        super();
        this.service = service;
    }

    @worker(HTTP_METHOD.Get)
    @http.get("/")
    async getUsers() {
        return jsonResult(await this.service.getAllUsers());
    }

    @worker(HTTP_METHOD.Get)
    @route("/{emailId}")
    async getUser() {
        return jsonResult(await UserService.getUserByEmail(this.param.emailId));
    }

    @worker(HTTP_METHOD.Post)
    @route("/")
    @guards(UserValidatorGuard)
    async addUser() {
        try{
            let res = await UserService.getUserByEmail(this.data.user.emailId)
    
            if(res) return jsonResult({"message":"user already existed with same email"}, HTTP_STATUS_CODE.Forbidden);
            
            let newUser = this.service.addUser(this.data.user);
            
            return jsonResult(newUser, HTTP_STATUS_CODE.Created);
        } catch(err) {
            return err.message;
        }
    }

    @worker(HTTP_METHOD.Put)
    @guards(UserValidatorGuard)
    @route("/")
    async updateUser() {
        const user = this.data.user;
        return this.service.updateUser(user);
    }

    // @worker(HTTP_METHOD.Delete)
    // @route("/{id}")
    // async removeByQueryString() {
    // const userId = this.param.id;
    // // const user = this.service.getUserById(userId);
    // if (user != null) {
    //     this.service.removeUserById(userId);
    //     return textResult("user deleted");
    // } else {
    //     return textResult("invalid user", 404);
    // }
    // }
}