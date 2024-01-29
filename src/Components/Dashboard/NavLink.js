import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import {
  faBagShopping,
  faBarsProgress,
  faBell,
  faCaretSquareLeft,
  faChartPie,
  faGear,
  faLayerGroup,
  faSheetPlastic,
  faSquarePlus,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
export const NavLinks = [
  {
    name: "Users",
    to: "users",
    icon: faUsers,
    role: ["1995"],
  },
  {
    name: "AddUser",
    to: "user/add",
    icon: faUserPlus,
    role: ["1995"],
  },

  {
    name: "Categories",
    to: "/dashboard/categories",
    icon: faLayerGroup,
    role: ["1995", "1999"],
  },
  {
    name: "AddCategory",
    to: "category/add",
    icon: faSquarePlus,
    role: ["1995", "1999"],
  },


  {
    name: "Products",
    to: "/dashboard/products",
    icon: faProductHunt,
    role: ["1995", "1999"],
  },

  {
    name: "AddProduct",
    to: "product/add",
    icon: faSquarePlus,
    role: ["1995", "1999"],
  },
  {
    name: "Orders",
    to: "orders",
    icon: faBagShopping,
    role: ["1995"],
  },
  {

    name: "Notifications",
    to: "notifications",
    icon: faBell,
    role: ["1995"],
  },
  {
    name: "Statistic",
    to: "statistic",
    icon: faChartPie,
    role: ["1995"],
  },
  {
    name: "Settings",
    to: "settings",
    icon: faGear,
    role: ["1995"],
  },

];
