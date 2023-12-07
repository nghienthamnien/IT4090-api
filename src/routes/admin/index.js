module.exports = (Router) => {
    Router.use('/admin/auth', require('./admin.auth.route'));
    Router.use('/admin/attribute', require('./admin-attribute-route'));
    Router.use('/admin/catalog', require('./admin-catalog-route'));

    return Router;
};
