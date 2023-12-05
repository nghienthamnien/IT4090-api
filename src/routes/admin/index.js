module.exports = (Router) => {
    Router.use('/admin/auth', require('./admin.auth.route'));
    Router.use('/admin/attribute', require('./admin-attribute-route'));

    return Router;
};
