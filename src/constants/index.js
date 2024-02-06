import {
  addPost,
  error,
  people,
  home,
  info,
  searchNav,
  success,
  warning,
  explore,
  saveIcon,
} from "../../public/assets/icons";

export const navbar = [
  {
    label: "home",
    alt: "home",
    iconUrl: home,
    linkRoute: "/",
  },
  {
    label: "explore",
    alt: "explore",
    iconUrl: explore,
    linkRoute: "/explore",
  },
  {
    label: "create",
    alt: "create",
    iconUrl: addPost,
    linkRoute: "/create-post",
  },
  {
    label: "social",
    alt: "social",
    iconUrl: people,
    linkRoute: "/social",
  },
  {
    label: "search",
    alt: "search",
    iconUrl: searchNav,
    linkRoute: "/search",
  },
  {
    label: "saved",
    alt: "saved",
    iconUrl: saveIcon,
    linkRoute: "/saved",
  },
];

export const toastType = {
  success: success,
  info: info,
  warning: warning,
  error: error,
};

export const profileFilterNav = [
  "post",
  "following",
  "follower",
  "liked"
];

export const socialFilterNav = [
  "suggest",
  "following",
  "follower",
];

export const searchFilterNav = [
  "post",
  "people",
  "location",
];
