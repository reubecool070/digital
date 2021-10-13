import { makeStyles, withStyles, styled } from "@mui/styles";
import clsx from "clsx";
import React from "react";
import { newTheme } from "../Constant";

const COLORS = ["primary", "secondary", "default"];
function generateColor(theme) {
  const styles = {};

  COLORS.forEach((standard) => {
    styles[`color-${standard}`] = {
      color: newTheme[`${standard}`].color,
    };
  });

  return styles;
}

function generateBackground(theme) {
  const styles = {};

  COLORS.forEach((standard) => {
    styles[`bg-color-${standard}`] = {
      backgroundColor: newTheme[`${standard}`].color,
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
