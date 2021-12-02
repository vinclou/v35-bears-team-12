import React from "react";
import { VStack } from "@chakra-ui/layout";
import { StyledLink } from "./styled-link";
import { useColorModeSwitcher } from "../../hooks/useColorModeSwitcher";

function VerticalLink({ children, href, ...props }) {
  const { colorGrey } = useColorModeSwitcher();
  return (
    <VStack
      as="li"
      align="left"
      fontSize="1.1rem"
      aria-labelledby={children}
      borderBottom={{ base: "1px solid", lg: "none" }}
      borderColor={colorGrey}
      listStyleType="none"
      pb={{ base: 4, lg: 2 }}
      w="100%"
    >
      <StyledLink href={href} type="secondary" {...props}>
        {children}
      </StyledLink>
    </VStack>
  );
}

export { VerticalLink };
