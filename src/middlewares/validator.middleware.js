export const validate = (schema, source = 'body') => {
    return (request, response, next) => {
        const { error, value } = schema.validate(request[source], {
            abortEarly: false,
            stripUnknown: true,
            errors: {
                wrap: {
                    label: false
                }
            }
        });

        if (!error) {
            request[source] = value;
            return next();
        }

        const errorBag = error.details.reduce((acc, detail) => {
            acc[detail.path[0]] = {
                message: detail.message
            };

            return acc;
        }, {});

        response.status(400).json({
            message: "ValidationError",
            errors: { ...errorBag }
        })

    };
};

export const validateBody = (schema) => validate(schema, 'body');
export const validateQuery = (schema) => validate(schema, 'query');

export default validate;