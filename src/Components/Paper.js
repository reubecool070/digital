import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";

export const styles = (theme) => {
  const elevations = {};
  theme.shadows.forEach((shadow, index) => {
    elevations[`elevation${index}`] = {
      boxShadow: shadow,
    };
  });

  return {
    /* Styles applied to the root element. */
    root: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: theme.shape.borderRadius,
    },
    /* Styles applied to the root element if `variant="outlined"` */
    outlined: {
      border: `1px solid ${theme.palette.divider}`,
    },
    ...elevations,
  };
};

const Paper = function (props) {
  const {
    classes,
    className,
    component: Component = "div",
    square = false,
    elevation = 1,
    variant = "elevation",
    children,
    ...other
  } = props;

  if (process.env.NODE_ENV !== "production") {
    if (classes[`elevation${elevation}`] === undefined) {
      console.error(
        `Material-UI: this elevation \`${elevation}\` is not implemented.`
      );
    }
  }


  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.rounded]: !square,
          [classes[`elevation${elevation}`]]: variant === "elevation",
          [classes.outlined]: variant === "outlined",
        },
        className
      )}
      {...other}
    >
        {children}
    </Component>
  );
};

export default withStyles(styles, { name: "MuiPaper" })(Paper);
