import React from "react";
import clsx from "clsx";
import ListContext from "./ListContext";
import { withStyles } from "@mui/styles";

export const styles = {
  /* Styles applied to the root element. */
  root: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    position: "relative",
  },
  /* Styles applied to the root element if `disablePadding={false}`. */
  padding: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  /* Styles applied to the root element if dense. */
  dense: {},
  /* Styles applied to the root element if a `subheader` is provided. */
  subheader: {
    paddingTop: 0,
  },
};

const List = React.forwardRef(function List(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = "ul",
    dense = false,
    disablePadding = false,
    subheader,
    ...other
  } = props;

  const context = React.useMemo(() => ({ dense }), [dense]);

  return (
    <ListContext.Provider value={context}>
      <Component
        className={clsx(
          classes.root,
          {
            [classes.dense]: dense,
            [classes.padding]: !disablePadding,
            [classes.subheader]: subheader,
          },
          className
        )}
        ref={ref}
        {...other}
      >
        {subheader}
        {children}
      </Component>
    </ListContext.Provider>
  );
});
export default withStyles(styles, { name: "MuiList" })(List);
