import { RequestHandler } from "express";
import formidable, { File } from "formidable";

export const fileParser: RequestHandler = async (req, _res, next) => {

    try {
        const form = formidable();
        const [fields, files] = await form.parse(req);

        console.log("reached 0", req)

        if (!req.body) req.body = {};

        for (let key in fields) {
            req.body[key] = fields[key]![0];
        }

        if (!req.files) req.files = {};

        for (let key in files) {
            const actualFiles = files[key];

            if (!actualFiles) break;

            req.files[key] = actualFiles[0];

        }

        console.log("reached 1")

        next();
    } catch (error) {
        console.log("reached 2")
        console.log(error)
    }
};