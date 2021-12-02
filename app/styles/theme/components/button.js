export const Button = {
  // Styles for the base style
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "sm",
    _focus: {
      border: "0.5px solid",
      borderColor: "#BDD4F8",
    },
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
        props.colorMode === "light" ? "default.dark" : "default.light",
      color: props.colorMode === "light" ? "default.dark" : "default.light",
      _hover: {
        bg: props.colorMode === "light" ? "default.dark" : "default.light",
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
      bg: props.colorMode === "light" ? "default.dark" : "default.light",
      color: props.colorMode === "light" ? "default.light" : "default.dark",
      _hover: {
        bg: props.colorMode === "light" ? "neutral.600" : "neutral.200",
      },
      _active: (props) => ({
        bg: props.colorMode === "light" ? "default.dark" : "default.light",
      }),
      _disabled: {
        bg: "neutral.100",
        color: "neutral.200",
      },
    }),
    primaryThemed: (props) => ({
      // border: "0.5px solid",
      // borderColor: props.colorMode === "light" ? "neutral.100" : "neutral.300",
      color: props.colorMode === "light" ? "primary.700" : "secondary.300",
      _hover: {
        bg: props.colorMode === "light" ? "primary.700" : "secondary.400",
        color: props.colorMode === "light" ? "default.light" : "default.dark",
      },
    }),
    secondaryThemed: (props) => ({
      bg: props.colorMode === "light" ? "primary.500" : "secondary.300",
      color: props.colorMode === "light" ? "default.light" : "default.dark",
      _hover: {
        bg: props.colorMode === "light" ? "primary.600" : "secondary.400",
      },
    }),
    // TODO: Fix this style, I don't think that's what I want to use
    authThemed: (props) => ({
      fontWeight: 400,
      py: "0rem",
      my: "-0.1rem",
      textTransform: "none",
      _hover: {
        color:
          props.colorMode === "light"
            ? "complimentary.500"
            : "complimentary.500",
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
  },
  // The default `size` or `variant` values
  defaultProps: {
    size: "md",
    variant: "primary",
  },
};
