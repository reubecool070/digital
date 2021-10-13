export const newTheme = {
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    unit: "px",
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    up: function (key) {
      const value =
        typeof this.values[key] === "number" ? this.values[key] : key;
      return `@media (min-width:${value}${this.unit})`;
    },
  },
  primary: {
    color: "#CAC4C4",
  },
  secondary: {
    color: "#fff",
  },
  default: {
    color: "#3F3C3C",
  },
};
