import {CookieIcon, LayoutDashboard, ShoppingCart, Users} from 'lucide-react';

export type SidebarLinks = {
    title: string;
    link: string;
    icon: JSX.Element;
};

export const adminLinks: SidebarLinks[] = [
    {
        title: 'Dashboard',
        link: '/admin/dashboard',
        icon: <LayoutDashboard/>,
    },
    {
        title: 'Users',
        link: '/admin/users',
        icon: <Users/>,
    },
    {
        title: 'Foods',
        link: '/admin/foods',
        icon: <CookieIcon/>,
    },
    {
        title: 'Orders',
        link: '/admin/orders',
        icon: <ShoppingCart/>,
    },
];

export const roles = ['USER', 'ADMIN'];

export const categories = [
    {
        title: 'Burger',
        value: 'burger',
    },
    {
        title: 'Schwarma',
        value: 'schwarma',
    },
    {
        title: 'Pizza',
        value: 'pizza',
    },
];

export const featured = [
    {title: 'Yes', value: true},
    {title: 'No', value: false},
];

export const navLinks = [
    {title: 'Home', link: '/'},
    {title: "All Foods", link: "/foods"},
    {title: 'Burger', link: '/foods?category=burger'},
    {title: 'Pizza', link: '/foods?category=pizza'},
    {title: 'Schwarma', link: '/foods?category=schwarma'},
];

export const cartTitles = [
    "Image", "Name", "Category", "Price"
]

export const ratingsNumber = [1, 2, 3, 4, 5]