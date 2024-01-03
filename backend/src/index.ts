import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "@/routes";
import { PassportAuth } from "fortjs-passport";
import { Strategy } from "passport-local";
import mongoose from "mongoose";
import { UserService } from "./services/user_service";

async function initDatabase() {
    await mongoose.connect("", {

    });
    console.log('db connected');
}

export const createApp = async () => {
    Fort.folders = [{
        alias: "/",
        path: path.join("../front-end/build/")
    }];

    Fort.routes = routes;

    PassportAuth.init();

    PassportAuth.passport.use('local', new Strategy({
        usernameField: 'email',
        passwordField: 'password',
    },
        async function(email, password, done){

            const user= await UserService.getUserByEmail(email) as any;

            if(!user) { return done(null, false); }
            if(user.password !==  password) { return done(null, false); }
            return done(null, user);
        }
    ))
    
    await initDatabase();

    await Fort.create();
    process.env.APP_URL = `http://localhost:${Fort.port}`;
};
if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        Fort.logger.debug(`Your fort has been forged and is now ready for exploration at ${process.env.APP_URL}`);
    }).catch(err => {
        console.error(err);
    });
}

