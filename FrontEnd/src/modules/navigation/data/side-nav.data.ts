import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['calculator', 'addProfiles'],
    },
    {
        text: 'ADD-ONS',
        items: ['solver', 'queryAirport'],
    },
    {
        text: 'Documentation',
        items: ['instructions'],
    },
];

export const sideNavItems: SideNavItems = {
    calculator: {
        icon: 'calculator',
        text: 'Calculator',
        link: '/dashboard/calculator',
    },
    addProfiles: {
        icon: 'plane',
        text: 'Profiles',
        link: '/dashboard/profiles',
    },
    queryAirport: {
        icon: 'plane-departure',
        text: 'Runway Query',
        link: '/dashboard/runway-query',
    },
    instructions: {
        icon: 'file',
        text: 'Download Instructions',
        link: '/dashboard/instructions',
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
        icon: 'question-circle',
        text: 'Solver',
        link: '/dashboard/solver',
    }
};
