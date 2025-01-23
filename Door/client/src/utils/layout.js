// app constants
import {
  LayoutColor,
  TopbarTheme,
  LayoutWidth,
  SideBarTypes,
} from "../constants";
import { LayoutActionTypes } from "../redux/layout/constants";

// actions

// Remove type definition and simplify to regular object
let config = {
  topbarTheme: TopbarTheme.TOPBAR_THEME_LIGHT,
  leftSideBarType: SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT,
};

// Remove parameter types
const getLayoutConfigs = (actionType, value) => {
  switch (actionType) {
    case LayoutActionTypes.CHANGE_LAYOUT_COLOR:
      switch (value) {
        case LayoutColor.LAYOUT_COLOR_DARK:
          config.topbarTheme = TopbarTheme.TOPBAR_THEME_DARK;
          break;
        case LayoutColor.LAYOUT_COLOR_LIGHT:
          config.topbarTheme = TopbarTheme.TOPBAR_THEME_LIGHT;
          break;
        default:
          return config;
      }
      break;

    case LayoutActionTypes.CHANGE_LAYOUT_WIDTH:
      switch (value) {
        case LayoutWidth.LAYOUT_WIDTH_FLUID:
          config.leftSideBarType = SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT;
          break;
        case LayoutWidth.LAYOUT_WIDTH_BOXED:
          config.leftSideBarType = SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED;
          break;
        default:
          return config;
      }
      break;
    default:
      return config;
  }
  return config;
};

// Remove parameter types
const changeBodyAttribute = (attribute, value) => {
  if (document.body) document.body.setAttribute(attribute, value);
};

export { getLayoutConfigs, changeBodyAttribute };
