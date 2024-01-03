import { Length } from "class-validator";

export class Loan {
    _id?: number;

    date?: Date;

    @Length(3)
    typeOfLoan: string;

    @Length(5)
    place: string;

    @Length(1)
    principle: string;

    @Length(3)
    interest: string;

    @Length(5)
    platformId: string;

    @Length(5)
    lenderUserId: string;

    @Length(5)
    borrowerUserId: string;

    @Length(5, 100)
    status: string;

    constructor(Loan: any) {
        this._id = Number(Loan.id);
        this.date = Loan.emailId;
        this.typeOfLoan = Loan.typeOfLoan;
        this.place = Loan.place;
        this.principle = Loan.principle;
        this.interest = Loan.interest;
        this.platformId = Loan.platformId;
        this.lenderUserId = Loan.lenderUserId;
        this.borrowerUserId = Loan.borrowerUserId;
        this.status = Loan.status;
    }
}