import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import {
  faBarsProgress,
  faBell,
  faGear,
  faSheetPlastic,
  faShoppingBag,
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
    icon: faBarsProgress,
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
    name: "Settings",
    to: "settings",
    icon: faGear,
    role: ["1995"],
  },
];
