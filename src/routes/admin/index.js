module.exports = (Router) => {
    Router.use('/admin/auth', require('./admin.auth.route'));
    Router.use('/admin/attribute', require('./admin-attribute-route'));
    Router.use('/admin/catalog', require('./admin-catalog-route'));
    Router.use('/admin/product', require('./admin-product-route'));

    return Router;
};
