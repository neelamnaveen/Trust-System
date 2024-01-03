import { Schema, model } from "mongoose";
import { ILoan } from "@/interfaces/loan";

const schemaObj = new Schema({
    date: { type: String },
    typeOfLoan : { type: String },
    place : { type: String },
    principle : { type: String },
    interest : { type: String },
    platformId : { type: String },
    lenderUserId : { type: String },
    borrowerUserId : { type: String },
    status : { type: String }
});

export const LoanSchema = model<ILoan>('Loan', schemaObj);