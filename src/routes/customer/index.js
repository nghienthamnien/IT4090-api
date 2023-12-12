module.exports = (Router) => {
    Router.use('/product', require('./product-route'));
    Router.use('/catalog', require('./catalog-route'));
    Router.use('/auth', require('./auth-route'));

    return Router;
};
