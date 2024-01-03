import { Fort, IHttpResult, Wall, redirectResult } from "fortjs";
import passport from "passport";
import { executeMiddleWare } from "../utils";

/**
 * Set property related to express framework
 *
 * @export
 * @class ExpressWall
 * @extends {Wall}
 */
export class ExpressWall extends Wall {

    async createExpressSession() {
        const session = this.session;
        const sessionData = await session.getAll();
        const promises = [];
        const expressSession = {
            async save(callback) {
                try {
                    await Promise.all(promises);
                    callback(null);
                } catch (error) {
                    callback(error);
                }
            },
            async regenerate(callback) {
                await session.clear();
                callback(null);
            },
            async destroy(callback) {
                await expressSession.regenerate(callback);
            }
        }

        return new Proxy(expressSession, {
            get(target, p, receiver) {
                switch (p) {
                    case "regenerate":
                    case "save":
                        return Reflect.get(target, p, receiver);
                }
                return sessionData[p as string];
            },
            set(target, p, newValue, receiver) {
                sessionData[p as string] = newValue;
                promises.push(
                    session.set(p as string, newValue)
                );
                return true;
            }
        });
    }

    async onIncoming(): Promise<void | IHttpResult> {
        const expressSession = await this.createExpressSession();
        Object.assign(this.request, {
            session: expressSession,
            redirect(url) {
                return redirectResult(url);
            }
        });
        if (this['componentProp_'].global.shouldParseCookie) {
            await executeMiddleWare.call(this, passport.session());
        }
    }
}