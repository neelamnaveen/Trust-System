import { Guard, textResult, HTTP_STATUS_CODE } from "fortjs";

export class LoanValidatorGuard extends Guard {

    async check() {
        const loan = {
            date: this.body.date,
            typeOfLoan : this.body.typeOfLoan,
            place : this.body.place,
            principle : this.body.principle,
            interest : this.body.interest,
            platformId : this.body.platformId,
            lenderUserId : this.body.lenderUserId,
            borrowerUserId : this.body.borrowerUserId,
            status : this.body.status            
        };
        const errMsg = this.validate(loan);
        if (errMsg == null) {
            // pass loan to worker method, so that they dont need to parse again  
            this.data.loan = loan;
            // returning null means - guard allows request to pass  
            return null;
        } else {
            return textResult(errMsg, HTTP_STATUS_CODE.BadRequest);
        }
    }
    
    validate(loan) {
        let errMessage;
            // if (loan.date == null || loan.date.length < 10) {
            //     errMessage = "date length should be greater than 10";
            // }
            // else if (loan.typeOfLoan == null || loan.typeOfLoan.length < 10) {
            //     errMessage = "typeOfLoan length should be greater than 10";
            // }
            // else if (loan.place == null || loan.place.length < 10) {
            //     errMessage = "place length should be greater than 10";
            // }
            // else if (loan.principle == null || loan.principle.length < 10) {
            //     errMessage = "principle length should be greater than 10";
            // }
            // else if (loan.interest == null || loan.interest.length < 10) {
            //     errMessage = "interest length should be greater than 10";
            // }
            // else if (loan.platformId == null || loan.platformId.length < 10) {
            //     errMessage = "platformId length should be greater than 10";
            // }
            // else if (loan.status == null || loan.status.length < 10) {
            //     errMessage = "status length should be greater than 10";
            // }
        return errMessage;
    }
}