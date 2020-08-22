import Loadable from '~/utils/Loadable/';

const routes = [
    {
        exact: true,
        path: '/home',
        component: Loadable(() => import(/* webpackChunkName: "js/home" */ '../views/pages/Home')),
        name: 'home'
    }
];

export default routes;
