// import { Fort } from 'fortjs';
// import passport from 'passport';
// import { ExpressWall } from './walls';

// interface IPassportAuthInitOptions {
//     serializeUser?: (user, done) => void;
//     deserializeUser?: (user, done) => void;
// }

// export class PassportAuth {

//     static passport = passport;

//     static init(options: IPassportAuthInitOptions = {}) {

//         passport.serializeUser(options.serializeUser || function (user, done) {
//             done(null, user);
//         });

//         passport.deserializeUser(options.serializeUser || function (user, done) {
//             done(null, user);
//         });

//         // register express wall to allow setting of express property
//         if (!Fort.walls) {
//             Fort.walls = [];
//         }
//         Fort.walls.push(ExpressWall);
//     }
// }