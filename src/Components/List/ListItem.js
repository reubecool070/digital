import React from "react";
import clsx from "clsx";
import {isMuiElement} from '../../utils/utils'
import ListContext from "./ListContext";
import { withStyles } from "@mui/styles";
import Button from '../Button';

export const styles = (theme) => ({
  /* Styles applied to the (normally root) `component` element. May be wrapped by a `container`. */
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    textDecoration: "none",
    width: "100%",
    boxSizing: "border-box",
    textAlign: "left",
    paddingTop: 8,
    paddingBottom: 8,
    // border:"none",
    "&$focusVisible": {
      backgroundColor: theme.palette.action.selected,
    },
    "&$selected, &$selected:hover": {
      backgroundColor: theme.palette.action.selected,
    },
    "&$disabled": {
      opacity: 0.5,
    },
  },
  /* Styles applied to the `container` element if `children` includes `ListItemSecondaryAction`. */
  container: {
    position: "relative",
  },
  /* Pseudo-class applied to the `component`'s `focusVisibleClassName` prop if `button={true}`. */
  focusVisible: {},
  /* Styles applied to the `component` element if dense. */
  dense: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  /* Styles applied to the `component` element if `alignItems="flex-start"`. */
  alignItemsFlexStart: {
    alignItems: "flex-start",
  },
  /* Pseudo-class applied to the inner `component` element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the inner `component` element if `divider={true}`. */
  divider: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundClip: "padding-box",
  },
  /* Styles applied to the inner `component` element if `disableGutters={false}`. */
  gutters: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  /* Styles applied to the inner `component` element if `button={true}`. */
  button: {
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  /* Styles applied to the `component` element if `children` includes `ListItemSecondaryAction`. */
  secondaryAction: {
    // Add some space to avoid collision as `ListItemSecondaryAction`
    // is absolutely positioned.
    paddingRight: 48,
  },
  /* Pseudo-class applied to the root element if `selected={true}`. */
  selected: {},
});

const useEnhancedEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */
const ListItem = function (props) {
  const {
    alignItems = "center",
    autoFocus = false,
    button = false,
    children: childrenProp,
    classes,
    className,
    component: componentProp,
    ContainerComponent = "li",
    ContainerProps: { className: ContainerClassName, ...ContainerProps } = {},
    dense = false,
    disabled = false,
    disableGutters = false,
    divider = false,
    focusVisibleClassName,
    selected = false,
    ...other
  } = props;

  const context = React.useContext(ListContext);
  const childContext = {
    dense: dense || context.dense || false,
    alignItems,
  };
  const listItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== "production") {
        console.error(
          "Material-UI: unable to set focus to a ListItem whose component has not been rendered."
        );
      }
    }
  }, [autoFocus]);

  const children = React.Children.toArray(childrenProp);
  const hasSecondaryAction =
    children.length &&
    isMuiElement(children[children.length - 1], ["ListItemSecondaryAction"]);

//   const handleOwnRef = React.useCallback((instance) => {
//     // #StrictMode ready
//     listItemRef.current = ReactDOM.findDOMNode(instance);
//   }, []);
//   const handleRef = useForkRef(handleOwnRef, ref);

  const componentProps = {
    className: clsx(
      classes.root,
      {
        [classes.dense]: childContext.dense,
        [classes.gutters]: !disableGutters,
        [classes.divider]: divider,
        [classes.disabled]: disabled,
        [classes.button]: button,
        [classes.alignItemsFlexStart]: alignItems === "flex-start",
        [classes.secondaryAction]: hasSecondaryAction,
        [classes.selected]: selected,
      },
      className
    ),
    disabled,
    ...other,
  };
  let Component = componentProp || "li";

  if (button) {
    componentProps.component = componentProp || "div";
    componentProps.focusVisibleClassName = clsx(
      classes.focusVisible,
      focusVisibleClassName
    );
    Component = Button;
  }

  if (hasSecondaryAction) {
    // Use div by default.
    Component = !componentProps.component && !componentProp ? "div" : Component;

    // Avoid nesting of li > li.
    if (ContainerComponent === "li") {
      if (Component === "li") {
        Component = "div";
      } else if (componentProps.component === "li") {
        componentProps.component = "div";
      }
    }

    return (
      <ListContext.Provider value={childContext}>
        <ContainerComponent
          className={clsx(classes.container, ContainerClassName)}
        //   ref={handleRef}
          {...ContainerProps}
        >
          <Component {...componentProps}>{children}</Component>
          {children.pop()}
        </ContainerComponent>
      </ListContext.Provider>
    );
  }

  return (
    <ListContext.Provider value={childContext}>
      <Component  {...componentProps}>
        {children}
      </Component>
    </ListContext.Provider>
  );
};



export default withStyles(styles, { name: "MuiListItem" })(ListItem);
