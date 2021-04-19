const { HomePage } = require('../src/components/HomePage');
const { StaticPage } = require('../src/components/StaticPage');

module.exports = [
    {
        path: '/',
        exact: true,
        component: HomePage,
    },
    {
        path: '/*',
        component: StaticPage,
    }
];