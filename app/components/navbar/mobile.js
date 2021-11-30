import React from "react";
import { Box, Flex, HStack, VStack, Center, Heading } from "@chakra-ui/layout";
import { VerticalLink } from "../styled-link/vertical-link";

function MobileNavMenu() {
  return (
    <VStack spacing={4} w="100%">
      <VStack as="ul" my={8} p={4} spacing={8} w="100%">
        <VerticalLink href="/" spacing={4} variant="large">
          Home
        </VerticalLink>
        <VerticalLink href="/about" spacing={4} variant="large">
          About
        </VerticalLink>
        <VerticalLink href="/teams" spacing={4} variant="large">
          Teams
        </VerticalLink>
        <VerticalLink href="/projects" spacing={4} variant="large">
          Projects
        </VerticalLink>
        <VerticalLink href="/contact" spacing={4} variant="large">
          Contact us
        </VerticalLink>
        <VerticalLink href="/support" spacing={4} variant="large">
          Support
        </VerticalLink>
      </VStack>
    </VStack>
  );
}

export { MobileNavMenu };
