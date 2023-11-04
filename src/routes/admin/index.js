module.exports = (Router) => {
    Router.use('/admin/auth', require('./admin.auth.route'));

    return Router;
};
