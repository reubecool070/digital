import React from "react";

export function isFilled(obj, SSR = false) {
  return (
    obj &&
    ((hasValue(obj.value) && obj.value !== "") ||
      (SSR && hasValue(obj.defaultValue) && obj.defaultValue !== ""))
  );
}
export function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}
export function isAdornedStart(obj) {
  return obj.startAdornment;
}
export function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function useForkRef(refA, refB) {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

export function capitalize(string) {
  if (process.env.NODE_ENV !== "production") {
    if (typeof string !== "string") {
      throw new Error(
        "Material-UI: capitalize(string) expects a string argument."
      );
    }
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formControlState({ props, states, muiFormControl }) {
  return states.reduce((acc, state) => {
    acc[state] = props[state];

    if (muiFormControl) {
      if (typeof props[state] === "undefined") {
        acc[state] = muiFormControl[state];
      }
    }
    return acc;
  }, {});
}

/**
 * @ignore - internal component.
 */
export const FormControlContext = React.createContext();

if (process.env.NODE_ENV !== "production") {
  FormControlContext.displayName = "FormControlContext";
}

export function useFormControl() {
  return React.useContext(FormControlContext);
}

export function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    // eslint-disable-next-line consistent-this
    const that = this;
    const later = () => {
      func.apply(that, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}
