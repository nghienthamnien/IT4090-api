module.exports = (Router) => {
    Router.use('/product', require('./product-route'));
    Router.use('/catalog', require('./catalog-route'));

    return Router;
};
