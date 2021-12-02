import { extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { colors } from "./colors";
import { Heading, Text, fonts, textStyles } from "./typography";
import { Button } from "./components/button";
import { Link } from "./components/link";
import { Badge } from "./components/badge";
import { Input } from "./components/input";

const overrides = {
  styles,
  colors,
  fonts,
  textStyles,
  components: {
    Badge,
    Button,
    Input,
    Heading,
    Text,
    Link,
  },
};

export default extendTheme(overrides);
