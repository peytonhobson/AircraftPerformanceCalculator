import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'ADDONS',
        items: ['solver'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'calculator',
        text: 'Calculator',
        link: '/dashboard',
    },
    // layouts: {
    //     icon: 'columns',
    //     text: 'Layouts',
    //     submenu: [
    //         {
    //             text: 'Static Navigation',
    //             link: '/dashboard/static',
    //         },
    //         {
    //             text: 'Light Sidenav',
    //             link: '/dashboard/light',
    //         },
    //     ],
    // },
    // pages: {
    //     icon: 'book-open',
    //     text: 'Pages',
    //     submenu: [
    //         {
    //             text: 'Authentication',
    //             submenu: [
    //                 {
    //                     text: 'Login',
    //                     link: '/auth/login',
    //                 },
    //                 {
    //                     text: 'Register',
    //                     link: '/auth/register',
    //                 },
    //                 {
    //                     text: 'Forgot Password',
    //                     link: '/auth/forgot-password',
    //                 },
    //             ],
    //         },
    //         {
    //             text: 'Error',
    //             submenu: [
    //                 {
    //                     text: '401 Page',
    //                     link: '/error/401',
    //                 },
    //                 {
    //                     text: '404 Page',
    //                     link: '/error/404',
    //                 },
    //                 {
    //                     text: '500 Page',
    //                     link: '/error/500',
    //                 },
    //             ],
    //         },
    //     ],
    // },
    solver: {
        icon: 'chart-area',
        text: 'Solver',
        link: '/solver',
    },
};
