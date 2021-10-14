import React from "react";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
import { Theme } from "../Theme";
import { createTheme } from "@mui/material";

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const GRID_SIZES = ["auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateGrid(globalStyles, theme, breakpoint) {
  // console.log("globalStyles", globalStyles)
  const styles = {};

  GRID_SIZES.forEach((size) => {
    const key = `grid-${breakpoint}-${size}`;

    if (size === true) {
      // For the auto layouting
      styles[key] = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: "100%",
      };
      return;
    }

    if (size === "auto") {
      styles[key] = {
        flexBasis: "auto",
        flexGrow: 0,
        maxWidth: "none",
      };
      return;
    }

    //   console.log("size", size)

    // Keep 7 significant numbers.
    const width = `${Math.round((size / 12) * 10e7) / 10e5}%`;

    // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41
    styles[key] = {
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width,
    };
  });

  // No need for a media query for the first size.
  if (breakpoint === "xs") {
    Object.assign(globalStyles, styles);
  } else {
    //  globalStyles[keys[upKey(breakpoint)]] = styles;
    //    globalStyles[keys["md"]] = styles;
    globalStyles[Theme.breakpoints.up(breakpoint)] = styles;
  }
  // console.log("breakpoint", upKey(breakpoint));
}

function getOffset(val, div = 1) {
  const parse = parseFloat(val);
  return `${parse / div}${String(val).replace(String(parse), "") || "px"}`;
}

function generateGutter(breakpoint) {
  const styles = {};

  SPACINGS.forEach((spacing) => {
    const themeSpacing = 8 * spacing;

    if (themeSpacing === 0) {
      return;
    }

    // console.log("spacing", spacing)
    styles[`spacing-${breakpoint}-${spacing}`] = {
      margin: `-${getOffset(themeSpacing, 1)}`,
      width: `calc(100% + ${getOffset(themeSpacing)})`,
      "& > $item": {
        padding: getOffset(themeSpacing, 1),
      },
    };
  });

  return styles;
}

export const styles = (theme) => ({
  /* Styles applied to the root element */
  root: {},
  /* Styles applied to the root element if `container={true}`. */
  container: {
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  /* Styles applied to the root element if `item={true}`. */
  item: {
    boxSizing: "border-box",
    margin: "0", // For instance, it's useful when used with a `figure` element.
  },
  /* Styles applied to the root element if `zeroMinWidth={true}`. */
  zeroMinWidth: {
    minWidth: 0,
  },
  /* Styles applied to the root element if `direction="column"`. */
  "direction-xs-column": {
    flexDirection: "column",
  },
  /* Styles applied to the root element if `direction="column-reverse"`. */
  "direction-xs-column-reverse": {
    flexDirection: "column-reverse",
  },
  /* Styles applied to the root element if `direction="rwo-reverse"`. */
  "direction-xs-row-reverse": {
    flexDirection: "row-reverse",
  },
  /* Styles applied to the root element if `wrap="nowrap"`. */
  "wrap-xs-nowrap": {
    flexWrap: "nowrap",
  },
  /* Styles applied to the root element if `wrap="reverse"`. */
  "wrap-xs-wrap-reverse": {
    flexWrap: "wrap-reverse",
  },
  /* Styles applied to the root element if `alignItems="center"`. */
  "align-items-xs-center": {
    alignItems: "center",
  },
  /* Styles applied to the root element if `alignItems="flex-start"`. */
  "align-items-xs-flex-start": {
    alignItems: "flex-start",
  },
  /* Styles applied to the root element if `alignItems="flex-end"`. */
  "align-items-xs-flex-end": {
    alignItems: "flex-end",
  },
  /* Styles applied to the root element if `alignItems="baseline"`. */
  "align-items-xs-baseline": {
    alignItems: "baseline",
  },
  /* Styles applied to the root element if `alignContent="center"`. */
  "align-content-xs-center": {
    alignContent: "center",
  },
  /* Styles applied to the root element if `alignContent="flex-start"`. */
  "align-content-xs-flex-start": {
    alignContent: "flex-start",
  },
  /* Styles applied to the root element if `alignContent="flex-end"`. */
  "align-content-xs-flex-end": {
    alignContent: "flex-end",
  },
  /* Styles applied to the root element if `alignContent="space-between"`. */
  "align-content-xs-space-between": {
    alignContent: "space-between",
  },
  /* Styles applied to the root element if `alignContent="space-around"`. */
  "align-content-xs-space-around": {
    alignContent: "space-around",
  },
  /* Styles applied to the root element if `justify="center"`. */
  "justify-xs-center": {
    justifyContent: "center",
  },
  /* Styles applied to the root element if `justify="flex-end"`. */
  "justify-xs-flex-end": {
    justifyContent: "flex-end",
  },
  /* Styles applied to the root element if `justify="space-between"`. */
  "justify-xs-space-between": {
    justifyContent: "space-between",
  },
  /* Styles applied to the root element if `justify="space-around"`. */
  "justify-xs-space-around": {
    justifyContent: "space-around",
  },
  /* Styles applied to the root element if `justify="space-evenly"`. */
  "justify-xs-space-evenly": {
    justifyContent: "space-evenly",
  },
  ...generateGutter("xs"),
  ...Theme.breakpoints.keys.reduce((accumulator, key) => {
    generateGrid(accumulator, theme, key);
    return accumulator;
  }, {}),
});

const Grid = function (props) {
  const {
    alignContent = "stretch",
    alignItems = "stretch",
    classes,
    children,
    className: classNameProp,
    component: Component = "div",
    container = false,
    direction = "row",
    item = false,
    justify = "flex-start",
    lg = false,
    md = false,
    sm = false,
    spacing = 0,
    wrap = "wrap",
    xl = false,
    xs = false,
    zeroMinWidth = false,
    ...other
  } = props;

  const className = clsx(
    classes.root,
    {
      [classes.container]: container,
      [classes.item]: item,
      [classes.zeroMinWidth]: zeroMinWidth,
      [classes[`spacing-xs-${String(spacing)}`]]: container && spacing !== 0,
      [classes[`direction-xs-${String(direction)}`]]: direction !== "row",
      [classes[`wrap-xs-${String(wrap)}`]]: wrap !== "wrap",
      [classes[`align-items-xs-${String(alignItems)}`]]:
        alignItems !== "stretch",
      [classes[`align-content-xs-${String(alignContent)}`]]:
        alignContent !== "stretch",
      [classes[`justify-xs-${String(justify)}`]]: justify !== "flex-start",
      [classes[`grid-xs-${String(xs)}`]]: xs !== false,
      [classes[`grid-sm-${String(sm)}`]]: sm !== false,
      [classes[`grid-md-${String(md)}`]]: md !== false,
      [classes[`grid-lg-${String(lg)}`]]: lg !== false,
      [classes[`grid-xl-${String(xl)}`]]: xl !== false,
    },
    classNameProp
  );
  return <Component className={className}>{children}</Component>;
};

const StyledGrid = withStyles(styles, { name: "MuiGrid" })(Grid);

// if (process.env.NODE_ENV !== "production") {
//   const requireProp = requirePropFactory("Grid");
//   StyledGrid.propTypes = {
//     ...StyledGrid.propTypes,
//     alignContent: requireProp("container"),
//     alignItems: requireProp("container"),
//     direction: requireProp("container"),
//     justify: requireProp("container"),
//     lg: requireProp("item"),
//     md: requireProp("item"),
//     sm: requireProp("item"),
//     spacing: requireProp("container"),
//     wrap: requireProp("container"),
//     xs: requireProp("item"),
//     zeroMinWidth: requireProp("item"),
//   };
// }

// function requirePropFactory(componentNameInError) {
//   if (process.env.NODE_ENV === "production") {
//     return () => null;
//   }

//   const requireProp =
//     (requiredProp) =>
//     (props, propName, componentName, location, propFullName) => {
//       const propFullNameSafe = propFullName || propName;

//       if (typeof props[propName] !== "undefined" && !props[requiredProp]) {
//         return new Error(
//           `The prop \`${propFullNameSafe}\` of ` +
//             `\`${componentNameInError}\` must be used on \`${requiredProp}\`.`
//         );
//       }

//       return null;
//     };
//   return requireProp;
// }

export default StyledGrid;
