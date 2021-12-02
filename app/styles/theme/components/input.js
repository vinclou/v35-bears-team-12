export const Input = {
  // Styles for the base style
  baseStyle: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
  },
  // Styles for the size variations
  sizes: {
    lg: {
      fontSize: "lg",
      px: 4,
      h: 12,
      borderRadius: "md",
    },

    md: {
      fontSize: "md",
      px: 4,
      h: 10,
      borderRadius: "md",
    },

    sm: {
      fontSize: "sm",
      px: 3,
      h: 8,
      borderRadius: "sm",
    },

    xs: {
      fontSize: "xs",
      px: 2,
      h: 6,
      borderRadius: "sm",
    },
  },
  // Styles for the visual style variations
  variants: {
    search: (props) => ({
      field: {
        border: "1px solid",
        borderColor: "default.light",
        boxShadow: "sm",
        bg: "accent.simpleWhite",
        _hover: {
          // bg: mode("gray.200", "whiteAlpha.100")(props),
        },
        _readOnly: {
          boxShadow: "none !important",
          userSelect: "all",
        },
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed",
          filter: "blur(0.5px)",
        },
        _invalid: {
          borderColor: "accent.errorLight",
        },
        _focus: {
          // bg: "inherit",
          border: "0.5px solid",
          borderColor: "#BDD4F8",
        },
      },
      addon: {
        border: "1px solid",
        borderColor: "transparent",
        // bg: mode("gray.100", "whiteAlpha.50")(props),
      },
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};
