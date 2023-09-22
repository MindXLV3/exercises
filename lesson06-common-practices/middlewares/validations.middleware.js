import Joi from 'joi';
import _ from 'lodash';

export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            const _schema = Joi.object(schema);

            const valid = _schema.validate(_.pick(req, Object.keys(schema)), {allowUnknown: true});
            const {error} = valid;
            if (error) {
                return res.status(400).json({
                    error: "Validate error",
                    msg: error
                }); 
            } else {
                next()
            }
        } catch (error) {
            return res.status(400).json({
                error: "Validate error",
                msg: error
            }); 
        }
    }
}