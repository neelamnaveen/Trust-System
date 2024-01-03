import { LoanSchema } from "@/db_schemas/loan";
import { Loan } from '@/models/loan';
import { Controller, Fort, singleton } from "fortjs";
import keccak256 from "keccak256";
import { UserService } from "./user_service";

interface IUpdateLoan {
    _id: string;
    status?: string;
}

export class LoanService {

    userService: UserService;
    constructor(@singleton(UserService) userService: UserService){
        this.userService = new UserService;
    }

    async addLoan(loan: Loan, user) {

        let otherParticipant = await this.userService.getUserByPlatformId(loan.platformId);

        if(loan.typeOfLoan === "Lending"){
            loan.lenderUserId = keccak256(user.DOB + user.userSecret).toString('hex');
            loan.borrowerUserId = keccak256(otherParticipant.DOB + otherParticipant.userSecret).toString('hex');
        } else {
            loan.lenderUserId = keccak256(otherParticipant.DOB + otherParticipant.userSecret).toString('hex');
            loan.borrowerUserId = keccak256(user.DOB + user.userSecret).toString('hex');
        }

        const loanObj = new LoanSchema(loan);
        return await loanObj.save();
    }

    async getLoanById(id: string) {
        const loan = await LoanSchema.findById(id);
        return loan;
    }

    async getLoanByEmail(email: string) {
        const loan = await LoanSchema.find({emailId:email});
        return loan;
    }

    async getAllLoans() {
        const loans = await LoanSchema.find();
        return loans;
    }

    async removeLoanById(id: string) {
        return await LoanSchema.deleteOne({ _id: id });
    }

    async updateLoan(loan: any) {
        if(loan.status === "approved") loan.status="Paid"

        const updateLoan = await LoanSchema.updateOne({ _id: loan._id }, {
            status: loan.status
        });

        return updateLoan;
    }
}