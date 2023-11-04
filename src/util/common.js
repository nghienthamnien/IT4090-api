module.exports = {
    randomString(length) {
        let text = '';
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i += 1)
            text += possible.charAt(
                Math.floor(Math.random() * possible.length),
            );
        return text;
    },
    APISuccess(msg, payload) {
        if (payload) return { success: true, msg, payload };
        return { success: true, msg };
    },
    APIError(name, msg) {
        if (msg) return { success: false, name, msg };
        return { success: false, name };
    },
    ServiceSuccess(msg, statusCode, data) {
        if (data)
            return {
                err: null,
                result: { msg, statusCode, data },
            };
        return { err: null, result: { msg, statusCode } };
    },
    ServiceError(name, statusCode, msg) {
        if (msg) return { err: { name, statusCode, msg }, result: null };
        return { err: { name, statusCode }, result: null };
    },
    ValidationError(msg) {
        if (msg) return { name: 'Validation Error', statusCode: 400, msg };
        return { name: 'Validation Error', statusCode: 400 };
    },
};
