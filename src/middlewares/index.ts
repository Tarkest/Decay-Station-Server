import {validate} from "joi";

export const validatorMiddleware = schema => (req, res, next) => {
    const {body} = req;
    const {error} = validate(body, schema);
    if (error) {
        res.status(400).send(error);
    }
    next();
};
