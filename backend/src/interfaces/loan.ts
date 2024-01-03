import { Document } from "mongoose";
export interface ILoan extends Document {
    _id: string;
    date: string;
    typeOfLoan : string;
    place : string;
    principle : string;
    interest : string;
    platformId : string;
    lenderUserId : string;
    borrowerUserId : string;
    status : string;
}
