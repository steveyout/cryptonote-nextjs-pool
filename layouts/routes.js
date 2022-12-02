/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav.
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from 'layouts/dashboard';
import Tables from 'layouts/tables';
import Billing from 'layouts/billing';
import RTL from 'layouts/rtl';
import Notifications from 'layouts/notifications';
import Profile from 'layouts/profile';
import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';

// @mui icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
const routes = [
  {
    type: 'collapse',
    name: 'Dashboard',
    key: '/',
    icon: <DashboardOutlinedIcon />,
    route: '/dashboard',
    href: '/',
    component: <Dashboard />,
  },
  {
    type: 'collapse',
    name: 'Worker Statistics',
    key: '/workers',
    icon: <SignalCellularAltOutlinedIcon />,
    route: '/tables',
    href: '/workers',
    component: <Tables />,
  },
  {
    type: 'collapse',
    name: 'Getting Started',
    key: '/getting-started',
    icon: <StartOutlinedIcon />,
    route: '/billing',
    href: '/getting-started',
    component: <Billing />,
  },
  {
    type: 'collapse',
    name: 'Pool Blocks',
    key: '/pool-blocks',
    icon: <ViewInArOutlinedIcon />,
    route: '/rtl',
    href: '/pool-blocks',
    component: <RTL />,
  },
  {
    type: 'Payments',
    name: 'Notifications',
    key: '/payments',
    icon: <PaymentsOutlinedIcon />,
    route: '/notifications',
    href: '/payments',
    component: <Notifications />,
  },
  {
    type: 'collapse',
    name: 'Top 10 Miners',
    key: '/top-miners',
    href: '/top-miners',
    icon: <EmojiEventsOutlinedIcon />,
    route: '/profile',
    component: <Profile />,
  },
  {
    type: 'collapse',
    name: 'Market/Calculator',
    key: '/calculator',
    icon: <StorefrontOutlinedIcon />,
    route: '/authentication/sign-in',
    href: '/calculator',
    component: <SignIn />,
  },
  {
    type: 'collapse',
    name: 'Settings',
    key: '/settings',
    icon: <SettingsOutlinedIcon />,
    href: '/settings',
    route: '/authentication/sign-up',
    component: <SignUp />,
  },
  {
    type: 'collapse',
    name: 'FAQ',
    key: '/faq',
    href: '/faq',
    icon: <QuizOutlinedIcon />,
    route: '/authentication/sign-up',
    component: <SignUp />,
  },
  {
    type: 'collapse',
    name: 'Telegram Group',
    key: 'telegram',
    icon: <TelegramIcon />,
    route: process.env.NEXT_PUBLIC_TELEGRAM,
    href: process.env.NEXT_PUBLIC_TELEGRAM,
    component: <SignUp />,
  },
  {
    type: 'collapse',
    name: 'Discord',
    key: 'discord',
    icon: <WhatshotIcon />,
    route: process.env.NEXT_PUBLIC_DISCORD,
    href: process.env.NEXT_PUBLIC_DISCORD,
    component: <SignUp />,
  },
  {
    type: 'collapse',
    name: 'Contact Us',
    key: 'contact-us',
    icon: <PermPhoneMsgOutlinedIcon />,
    route: process.env.NEXT_PUBLIC_EMAIL,
    href: process.env.NEXT_PUBLIC_EMAIL,
    component: <SignUp />,
  },
];

export default routes;
