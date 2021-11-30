export const Badge = {
  // Styles for the base style
  baseStyle: {
    fontWeight: 300,
    textTransform: "uppercase",
    borderRadius: "md",
  },
  // Styles for the size variations
  sizes: {
    sm: {
      fontSize: "xs",
      px: "0.75rem",
      py: "0.5rem",
    },
    md: {
      fontSize: "md",
      px: "1rem",
      py: "0.5rem",
    },
    lg: {
      fontSize: "lg",
      px: "1.5rem",
      py: "0.75rem",
    },
  },
  // Styles for the visual style variations
  variants: {
    primary: (props) => ({
      border: "1px solid",
      borderColor:
        props.colorMode === "light" ? "primary.700" : "default.light",
      color: props.colorMode === "light" ? "neutral.700" : "default.light",
      // bg: "default.light",
      boxShadow: "lg",
      _hover: {
        bg:
          props.colorMode === "light" ? "accent.electricBlue" : "default.light",
        color: props.colorMode === "light" ? "default.light" : "default.dark",
      },
      _active: {
        bg: "default.dark",
        color: "default.light",
      },
      _disabled: {
        borderColor: "neutral.200",
        color: "neutral.200",
      },
    }),
    secondary: (props) => ({
      bg: "default.light",
      borderRadius: "3px",
      color:
        props.colorMode === "light" ? "neutral.700" : "accent.electricBlue",
      boxShadow: "md",
      _active: {
        bg: "default.dark",
        color: "default.light",
      },
      _disabled: {
        borderColor: "neutral.200",
        color: "neutral.200",
      },
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {
    // size: "md",
    variant: "primary",
  },
};
