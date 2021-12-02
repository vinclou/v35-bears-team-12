//TODO: define dark/light mode colors
export const styles = {
  global: (props) => ({
    body: {
      overflowX: "hidden",
      initialColorMode: "light",
      bg: props.colorMode === "light" ? "default.light" : "default.dark",
      color: props.colorMode === "light" ? "default.dark" : "default.light",
    },
  }),
};
