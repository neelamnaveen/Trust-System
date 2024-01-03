import { Length, Contains, IsIn, IsEmail } from "class-validator";

export class User {
    _id?: number;

    @Length(5)
    name: string;

    @IsEmail()
    emailId: string;

    @Length(5)
    password?: string;

    @Length(5)
    contactNumber?: string;

    @Length(5)
    userSecret?: string;

    @Length(5)
    platformId?: string;

    @Length(5)
    DOB?: string;

    @Length(5)
    organization?: string;

    constructor(user: any) {
        this._id = Number(user.id);
        this.name = user.name;
        this.emailId = user.emailId;
        this.password = user.password;
        this.contactNumber = user.contactNumber;
        this.userSecret = user.userSecret;
        this.platformId = user.platformId;
        this.DOB = user.DOB;
        this.organization = user.organization;
    }
}