import { LoanService } from "@/services/loan_service";
import { LoanValidatorGuard } from "@/guards/loan_validator_guard";
import { worker, Controller, HTTP_METHOD, HTTP_STATUS_CODE, http, jsonResult, textResult, route, singleton, guards, shields, Guard, TGuard, Fort } from "fortjs";
import { auth } from "fortjs-passport";

@shields(auth.shield("isAuthenticated"))
export class LoanController extends Controller {

    service: LoanService;
    constructor(@singleton(LoanService) service: LoanService) {
        super();
        this.service = service;
    }

    @http.get("/")
    async getLoans() {
        return jsonResult(await this.service.getAllLoans());
    }

    @worker(HTTP_METHOD.Post)
    @route("/")
    @guards(LoanValidatorGuard)
    async addLoan() {
        Fort.logger.log(`Request received to create new loan`);

        const {user} = this.request as any;

        const newLoan = await this.service.addLoan(this.data.loan, user);

        Fort.logger.log(`Request completed to create new loan`);

        return jsonResult(newLoan, HTTP_STATUS_CODE.Created);
    }

    @worker(HTTP_METHOD.Put)
    @route("/")
    // @guards(LoanValidatorGuard)
    async updateLoan() {
        // const loan = this.data.loan;
        Fort.logger.log(`Request received to update loan ${this.body._id}`);

        let updateLoan = this.service.updateLoan(this.body);

        Fort.logger.log(`Request completed to update a loan ${updateLoan}`);

        return jsonResult(updateLoan, HTTP_STATUS_CODE.Created);

    }

    @worker(HTTP_METHOD.Delete)
    @route("/{id}")
    async removeByQueryString() {
        const loanId = this.param.id;

        Fort.logger.log(`Request received to delete a loan ${loanId}`);
        const loan = this.service.getLoanById(loanId);
        if (loan != null) {
            this.service.removeLoanById(loanId);
            return textResult("loan deleted");
        } else {
            return textResult("invalid loan", 404);
        }
    }
}