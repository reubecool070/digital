/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import TextareaAutosize from "./TextareaAutosize";
import {
  isFilled,
  useForkRef,
  capitalize,
  formControlState,
  useFormControl,
  FormControlContext,
} from "../utils/utils";
import { withStyles } from "@mui/styles";

export const styles = (theme) => {
  const light = theme.palette.type === "light";
  const placeholder = {
    color: "currentColor",
    opacity: light ? 0.42 : 0.5,
    // transition: theme.transitions.create("opacity", {
    //   duration: theme.transitions.duration.shorter,
    // }),
  };
  const placeholderHidden = {
    opacity: "0 !important",
  };
  const placeholderVisible = {
    opacity: light ? 0.42 : 0.5,
  };

  return {
    /* Styles applied to the root element. */
    root: {
      // Mimics the default input display property used by browsers for an input.
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.primary,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: "1.1875em", // Reset (19px), match the native input line-height
      boxSizing: "border-box", // Prevent padding issue with fullWidth.
      position: "relative",
      cursor: "text",
      display: "inline-flex",
      alignItems: "center",
      border: "1px solid #000",
      borderRadius:"4px",
      "&$disabled": {
        color: theme.palette.text.disabled,
        cursor: "default",
      },
    },
    /* Styles applied to the root element if the component is a descendant of `FormControl`. */
    formControl: {},
    /* Styles applied to the root element if the component is focused. */
    focused: {},
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `startAdornment` is provided. */
    adornedStart: {},
    /* Styles applied to the root element if `endAdornment` is provided. */
    adornedEnd: {},
    /* Styles applied to the root element if `error={true}`. */
    error: {},
    /* Styles applied to the `input` element if `margin="dense"`. */
    marginDense: {},
    /* Styles applied to the root element if `multiline={true}`. */
    multiline: {
      padding: `${8 - 2}px 0 ${8 - 1}px`,
      "&$marginDense": {
        paddingTop: 4 - 1,
      },
    },
    /* Styles applied to the root element if the color is secondary. */
    colorSecondary: {},
    /* Styles applied to the root element if `fullWidth={true}`. */
    fullWidth: {
      width: "100%",
    },
    /* Styles applied to the `input` element. */
    input: {
      font: "inherit",
      color: "currentColor",
      //   padding: `${8 - 2}px 0 ${8 - 1}px`,
      padding: "8px 8px 8px calc(1em + 32px)",
      border: 0,
      boxSizing: "content-box",
      background: "none",
      height: "1.1875em", // Reset (19px), match the native input line-height
      margin: 0, // Reset for Safari
      WebkitTapHighlightColor: "transparent",
      display: "block",
      // Make the flex item shrink with Firefox
      minWidth: 0,
      width: "100%", // Fix IE 11 width issue
      animationName: "$auto-fill-cancel",
      "&::-webkit-input-placeholder": placeholder,
      "&::-moz-placeholder": placeholder, // Firefox 19+
      "&:-ms-input-placeholder": placeholder, // IE 11
      "&::-ms-input-placeholder": placeholder, // Edge
      "&:focus": {
        outline: 0,
      },
      // Reset Firefox invalid required input style
      "&:invalid": {
        boxShadow: "none",
      },
      "&::-webkit-search-decoration": {
        // Remove the padding when type=search.
        "-webkit-appearance": "none",
      },
      // "&::placeholder":{
      //   backgroundColor:"#fff",
      // },
      // Show and hide the placeholder logic
      "label[data-shrink=false] + $formControl &": {
        "&::-webkit-input-placeholder": placeholderHidden,
        "&::-moz-placeholder": placeholderHidden, // Firefox 19+
        "&:-ms-input-placeholder": placeholderHidden, // IE 11
        "&::-ms-input-placeholder": placeholderHidden, // Edge
        "&:focus::-webkit-input-placeholder": placeholderVisible,
        "&:focus::-moz-placeholder": placeholderVisible, // Firefox 19+
        "&:focus:-ms-input-placeholder": placeholderVisible, // IE 11
        "&:focus::-ms-input-placeholder": placeholderVisible, // Edge
      },
      "&$disabled": {
        opacity: 1, // Reset iOS opacity
      },
      "&:-webkit-autofill": {
        animationDuration: "5000s",
        animationName: "$auto-fill",
      },
    },
    "@keyframes auto-fill": {
      from: {},
    },
    "@keyframes auto-fill-cancel": {
      from: {},
    },
    /* Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense: {
      paddingTop: 4 - 1,
    },
    /* Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline: {
      height: "auto",
      resize: "none",
      padding: 0,
    },
    /* Styles applied to the `input` element if `type="search"`. */
    inputTypeSearch: {
      // Improve type search style.
      "-moz-appearance": "textfield",
      "-webkit-appearance": "textfield",
    },
    /* Styles applied to the `input` element if `startAdornment` is provided. */
    inputAdornedStart: {},
    /* Styles applied to the `input` element if `endAdornment` is provided. */
    inputAdornedEnd: {},
    /* Styles applied to the `input` element if `hiddenLabel={true}`. */
    inputHiddenLabel: {},
  };
};

const useEnhancedEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 */
const InputBase = function (props, ref) {
  const {
    "aria-describedby": ariaDescribedby,
    autoComplete,
    autoFocus,
    classes,
    className,
    color,
    defaultValue,
    disabled,
    endAdornment,
    error,
    fullWidth = false,
    id,
    inputComponent = "input",
    inputProps: inputPropsProp = {},
    inputRef: inputRefProp,
    margin,
    multiline = false,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    renderSuffix,
    rows,
    rowsMax,
    rowsMin,
    startAdornment,
    type = "text",
    value: valueProp,
    ...other
  } = props;

  const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  const { current: isControlled } = React.useRef(value != null);

  const inputRef = React.useRef();
  const handleInputRefWarning = React.useCallback((instance) => {
    if (process.env.NODE_ENV !== "production") {
      if (
        instance &&
        !(instance instanceof HTMLInputElement) &&
        !instance.focus
      ) {
        console.error(
          [
            "Material-UI: you have provided a `inputComponent` to the input component",
            "that does not correctly handle the `inputRef` prop.",
            "Make sure the `inputRef` prop is called with a HTMLInputElement.",
          ].join("\n")
        );
      }
    }
  }, []);
  const handleInputPropsRefProp = useForkRef(
    inputPropsProp.ref,
    handleInputRefWarning
  );
  const handleInputRefProp = useForkRef(inputRefProp, handleInputPropsRefProp);
  const handleInputRef = useForkRef(inputRef, handleInputRefProp);

  const [focused, setFocused] = React.useState(false);
  const muiFormControl = useFormControl();

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (muiFormControl) {
        return muiFormControl.registerEffect();
      }

      return undefined;
    }, [muiFormControl]);
  }

  const fcs = formControlState({
    props,
    muiFormControl,
    states: [
      "color",
      "disabled",
      "error",
      "hiddenLabel",
      "margin",
      "required",
      "filled",
    ],
  });
  fcs.focused = muiFormControl ? muiFormControl.focused : focused;

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  React.useEffect(() => {
    if (!muiFormControl && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);

  const onFilled = muiFormControl && muiFormControl.onFilled;
  const onEmpty = muiFormControl && muiFormControl.onEmpty;

  const checkDirty = React.useCallback(
    (obj) => {
      if (isFilled(obj)) {
        if (onFilled) {
          onFilled();
        }
      } else if (onEmpty) {
        onEmpty();
      }
    },
    [onFilled, onEmpty]
  );

  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({ value });
    }
  }, [value, checkDirty, isControlled]);

  const handleFocus = (event) => {
    // Fix a bug with IE 11 where the focus/blur events are triggered
    // while the input is disabled.
    if (fcs.disabled) {
      event.stopPropagation();
      return;
    }

    if (onFocus) {
      onFocus(event);
    }
    if (inputPropsProp.onFocus) {
      inputPropsProp.onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (inputPropsProp.onBlur) {
      inputPropsProp.onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };

  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new TypeError(
          "Material-UI: Expected valid input target. " +
            "Did you use a custom `inputComponent` and forget to forward refs? " +
            "See https://material-ui.com/r/input-component-ref-interface for more info."
        );
      }

      checkDirty({
        value: element.value,
      });
    }

    if (inputPropsProp.onChange) {
      inputPropsProp.onChange(event, ...args);
    }

    // Perform in the willUpdate
    if (onChange) {
      onChange(event, ...args);
    }
  };

  // Check the input state on mount, in case it was filled by the user
  // or auto filled by the browser before the hydration (for SSR).
  React.useEffect(() => {
    checkDirty(inputRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (event) => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }

    if (onClick) {
      onClick(event);
    }
  };

  let InputComponent = inputComponent;
  let inputProps = {
    ...inputPropsProp,
    ref: handleInputRef,
  };

  if (typeof InputComponent !== "string") {
    inputProps = {
      // Rename ref to inputRef as we don't know the
      // provided `inputComponent` structure.
      inputRef: handleInputRef,
      type,
      ...inputProps,
      ref: null,
    };
  } else if (multiline) {
    if (rows && !rowsMax && !rowsMin) {
      InputComponent = "textarea";
    } else {
      inputProps = {
        rows,
        rowsMax,
        ...inputProps,
      };
      InputComponent = TextareaAutosize;
    }
  } else {
    inputProps = {
      type,
      ...inputProps,
    };
  }

  const handleAutoFill = (event) => {
    // Provide a fake value as Chrome might not let you access it for security reasons.
    checkDirty(
      event.animationName.indexOf("auto-fill-cancel") !== -1
        ? inputRef.current
        : { value: "x" }
    );
  };

  React.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);


  return (
    <div
      className={clsx(
        classes.root,
        classes[`color${capitalize(fcs.color || "primary")}`],
        {
          [classes.disabled]: fcs.disabled,
          [classes.error]: fcs.error,
          [classes.fullWidth]: fullWidth,
          [classes.focused]: fcs.focused,
          [classes.formControl]: muiFormControl,
          [classes.marginDense]: fcs.margin === "dense",
          [classes.multiline]: multiline,
          [classes.adornedStart]: startAdornment,
          [classes.adornedEnd]: endAdornment,
        },
        // className
      )}
      onClick={handleClick}
    //   ref={ref}
      {...other}
    >
      {startAdornment}
      <FormControlContext.Provider value={null}>
        <InputComponent
          aria-invalid={fcs.error}
          aria-describedby={ariaDescribedby}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          disabled={fcs.disabled}
          id={id}
          onAnimationStart={handleAutoFill}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          required={fcs.required}
          rows={rows}
          value={value}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          {...inputProps}
          className={clsx(
            classes.input,
            {
              [classes.disabled]: fcs.disabled,
              [classes.inputTypeSearch]: type === "search",
              [classes.inputMultiline]: multiline,
              [classes.inputMarginDense]: fcs.margin === "dense",
              [classes.inputHiddenLabel]: fcs.hiddenLabel,
              [classes.inputAdornedStart]: startAdornment,
              [classes.inputAdornedEnd]: endAdornment,
            },
            inputPropsProp.className
          )}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </FormControlContext.Provider>
      {endAdornment}
      {renderSuffix
        ? renderSuffix({
            ...fcs,
            startAdornment,
          })
        : null}
    </div>
  );
};


export default withStyles(styles, { name: "MuiInputBase" })(InputBase);
