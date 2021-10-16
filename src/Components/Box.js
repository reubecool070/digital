import { makeStyles, withStyles, styled } from "@mui/styles";
import clsx from "clsx";
import React from "react";
// import { Theme } from "../Theme";

const COLORS = ["grey", "white", "default", "lightGrey"];
function generateColor(theme) {
  const styles = {};

  COLORS.forEach((standard) => {
    styles[`color-${standard}`] = {
      color: theme[`${standard}`].color,
    };
  });

  return styles;
}

function generateBackground(theme) {
  const styles = {};

  COLORS.forEach((standard) => {
    styles[`bg-color-${standard}`] = {
      backgroundColor: theme[`${standard}`].color,
    };
  });

  return styles;
}

export const styles = (theme) => ({
  root: {},
  ...generateColor(theme),
  ...generateBackground(theme),
});

export const Box = (props) => {
  const { children, color, bgColor, classes, className: classNameProp } = props;

  const className = clsx(classes.root, {
    [classes[`color-${String(color)}`]]: color,
    [classes[`bg-color-${String(bgColor)}`]]: bgColor,
    classNameProp,
  });


  return <div className={className}>{children}</div>;
};

const StyledBox = withStyles(styles, { name: "MuiGrid" })(Box);

export default StyledBox;
