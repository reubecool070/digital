import React from "react";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
// import { Theme } from "../Theme";
import { fade } from "./colorManipulator";

function capitalize(string) {
  if (process.env.NODE_ENV !== "production") {
    if (typeof string !== "string") {
      throw new Error(
        "Material-UI: capitalize(string) expects a string argument."
      );
    }
  }
  //   console.log("cap", string.charAt(0).toUpperCase() + string.slice(1));
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.button,
    fontSize: "20px",
    boxSizing: "border-box",
    minWidth: 64,
    padding: "6px 16px",
    borderRadius: theme.shape.borderRadius,
    textTransform: "capitalize",
    color: theme.palette.text.primary,
    backgroundColor: "transparent",
    border: "none",
    // transition: theme.transitions.create(
    //   ["background-color", "box-shadow", "border"],
    //   {
    //     duration: theme.transitions.duration.short,
    //   }
    // ),
    "&:hover": {
      textDecoration: "none",
      backgroundColor: fade(
        theme.palette.text.primary,
        theme.palette.action.hoverOpacity
      ),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
      "&$disabled": {
        backgroundColor: "transparent",
      },
    },
    "&$disabled": {
      color: theme.palette.action.disabled,
    },
  },
  /* Styles applied to the span element that wraps the children. */
  label: {
    width: "100%", // Ensure the correct width for iOS Safari
    display: "inherit",
    alignItems: "inherit",
    justifyContent: "inherit",
  },
  /* Styles applied to the root element if `variant="text"`. */
  text: {
    padding: "6px 8px",
  },
  /* Styles applied to the root element if `variant="text"` and `color="primary"`. */
  textPrimary: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: fade(
        theme.palette.primary.main,
        theme.palette.action.hoverOpacity
      ),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  /* Styles applied to the root element if `variant="text"` and `color="secondary"`. */
  textSecondary: {
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: fade(
        theme.palette.secondary.main,
        theme.palette.action.hoverOpacity
      ),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  /* Styles applied to the root element if `variant="outlined"`. */
  outlined: {
    padding: "5px 15px",
    // border: `1px solid ${
    //   theme.palette.type === "light"
    //     ? "rgba(0, 0, 0, 0.23)"
    //     : "rgba(255, 255, 255, 0.23)"
    // }`,
    border: `1px solid rgba(0, 0, 0, 0.53)`,
    "&$disabled": {
      border: `1px solid ${theme.palette.action.disabled}`,
    },
  },
  /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
  outlinedPrimary: {
    color: theme.palette.primary.main,
    border: `1px solid ${fade(
      theme.palette.primary.main,
      theme.palette.action.mainOpacity
    )}`,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: fade(
        theme.palette.primary.main,
        theme.palette.action.hoverOpacity
      ),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
  outlinedSecondary: {
    color: theme.palette.secondary.main,
    border: `1px solid ${fade(theme.palette.secondary.main, 0.5)}`,
    "&:hover": {
      border: `1px solid ${theme.palette.secondary.main}`,
      backgroundColor: fade(
        theme.palette.secondary.main,
        theme.palette.action.hoverOpacity
      ),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&$disabled": {
      border: `1px solid ${theme.palette.action.disabled}`,
    },
  },
  /* Styles applied to the root element if `variant="contained"`. */
  contained: {
    color: "#e0e0e0",
    backgroundColor: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[2],
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.95)",
      boxShadow: theme.shadows[4],
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: theme.shadows[2],
        backgroundColor: "#e0e0e0",
      },
      "&$disabled": {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },
    "&$focusVisible": {
      boxShadow: theme.shadows[6],
    },
    "&:active": {
      boxShadow: theme.shadows[8],
    },
    "&$disabled": {
      color: theme.palette.action.disabled,
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
  /* Styles applied to the root element if `variant="contained"` and `color="primary"`. */
  containedPrimary: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  /* Styles applied to the root element if `variant="contained"` and `color="secondary"`. */
  containedSecondary: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
  /* Styles applied to the root element if `disableElevation={true}`. */
  disableElevation: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
    },
    "&$focusVisible": {
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
    },
    "&$disabled": {
      boxShadow: "none",
    },
  },
  /* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: {},
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: "inherit",
    borderColor: "currentColor",
  },
  /* Styles applied to the root element if `size="small"` and `variant="text"`. */
  textSizeSmall: {
    padding: "4px 5px",
    fontSize: theme.typography.pxToRem(13),
  },
  /* Styles applied to the root element if `size="large"` and `variant="text"`. */
  textSizeLarge: {
    padding: "8px 11px",
    fontSize: theme.typography.pxToRem(15),
  },
  /* Styles applied to the root element if `size="small"` and `variant="outlined"`. */
  outlinedSizeSmall: {
    padding: "3px 9px",
    fontSize: theme.typography.pxToRem(13),
  },
  /* Styles applied to the root element if `size="large"` and `variant="outlined"`. */
  outlinedSizeLarge: {
    padding: "7px 21px",
    fontSize: theme.typography.pxToRem(15),
  },
  /* Styles applied to the root element if `size="small"` and `variant="contained"`. */
  containedSizeSmall: {
    padding: "4px 10px",
    fontSize: theme.typography.pxToRem(13),
  },
  /* Styles applied to the root element if `size="large"` and `variant="contained"`. */
  containedSizeLarge: {
    padding: "8px 22px",
    fontSize: theme.typography.pxToRem(15),
  },
  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {},
  /* Styles applied to the root element if `size="large"`. */
  sizeLarge: {},
  /* Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: {
    width: "100%",
  },
  /* Styles applied to the startIcon element if supplied. */
  startIcon: {
    display: "inherit",
    marginRight: 8,
    marginLeft: -4,
    "&$iconSizeSmall": {
      marginLeft: -2,
    },
  },
  /* Styles applied to the endIcon element if supplied. */
  endIcon: {
    display: "inherit",
    marginRight: -4,
    marginLeft: 8,
    "&$iconSizeSmall": {
      marginRight: -2,
    },
  },
  /* Styles applied to the icon element if supplied and `size="small"`. */
  iconSizeSmall: {
    "& > *:first-child": {
      fontSize: 18,
    },
  },
  /* Styles applied to the icon element if supplied and `size="medium"`. */
  iconSizeMedium: {
    "& > *:first-child": {
      fontSize: 20,
    },
  },
  /* Styles applied to the icon element if supplied and `size="large"`. */
  iconSizeLarge: {
    "& > *:first-child": {
      fontSize: 22,
    },
  },
});

const Button = function (props) {
  const {
    children,
    classes,
    color = "default",
    component: Component = "button",
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = "medium",
    startIcon: startIconProp,
    type = "button",
    variant = "text",
    className: classNameProp,
    ...other
  } = props;

  const className = clsx(
    classes.root,
    classes[variant],
    {
      [classes[`${variant}${capitalize(color)}`]]:
        color !== "default" && color !== "inherit",
      [classes[`${variant}Size${capitalize(size)}`]]: size !== "medium",
      [classes[`size${capitalize(size)}`]]: size !== "medium",
      [classes.disableElevation]: disableElevation,
      [classes.disabled]: disabled,
      [classes.fullWidth]: fullWidth,
      [classes.colorInherit]: color === "inherit",
    },
    classNameProp
  );

  const startIcon = startIconProp && (
    <span
      className={clsx(
        classes.startIcon,
        classes[`iconSize${capitalize(size)}`]
      )}
    >
      {startIconProp}
    </span>
  );
  const endIcon = endIconProp && (
    <span
      className={clsx(classes.endIcon, classes[`iconSize${capitalize(size)}`])}
    >
      {endIconProp}
    </span>
  );


  return (
    <button
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      className={className}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      {...other}
    >
      <span className={classes.label}>
        {startIcon}
        {children}
        {endIcon}
      </span>
    </button>
  );
};

const StyledButton = withStyles(styles, { name: "MuiButton" })(Button);

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

export default StyledButton;
