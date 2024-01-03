import { Controller } from "fortjs";

export function executeMiddleWare(this: Controller, middleWare) {
    return new Promise((res, rej) => {
        middleWare(this.request, this.response, (err) => {
            if (err) {
                return rej(err);
            }
            res(null);
        });
    });
}