import { Controller, viewResult, assign, http, Fort, worker, HTTP_METHOD, textResult } from "fortjs";
export class DefaultController extends Controller {

    @http.get("/")
    async index() {
        const result = await viewResult("../front-end/build/index.html");
        return result;
    }
}