import React from "react";
import Image from "next/image";
import { Box, Flex, HStack, VStack } from "@chakra-ui/layout";
import { Button, Divider } from "@chakra-ui/react";
import { useColorModeSwitcher } from "../../hooks/useColorModeSwitcher";
import { useColorMode } from "@chakra-ui/color-mode";
import { VerticalLink } from "../styled-link/vertical-link";
import { StyledLink } from "../styled-link/styled-link";
import { useUserStore } from "../../context/useUserStore";

// updated imports
import { SubMenu } from "./sub-nav";
import { MenuButton } from "../navbar-menu-button";

// test hover menu
import { HoverDropDown } from "../hover-dropdown";

function Navbar({ isOpen, toggleIsOpen }) {
  const context = useUserStore();

  const { colorMode, toggleColorMode } = useColorMode();
  const { themed } = useColorModeSwitcher();

  const logoutHandler = (event) => {
    event.preventDefault();
    context.signOut();
    // TODO: delete the cache of useMeQuery
  };
  const loginHandler = async (event) => {
    event.preventDefault();
    context.signIn();
  };

  return (
    <Box
      as="nav"
      bg="#F6EEEE"
      mb={isOpen ? { base: "0.1rem" } : { base: "0.1rem", lg: "0.2rem" }}
      px={{ base: "1rem", lg: "2rem" }}
      py={{ base: "1rem", lg: "1.5rem" }}
    >
      <Flex
        justify="space-between"
        mb={isOpen ? { base: "1rem" } : { base: "2.5rem", lg: "3.5rem" }}
      >
        <Image
          src="/chingu-logo-small.png"
          alt="Chingu Logo"
          width="160px"
          height="55px"
        />

        <HStack spacing={{ base: 0, md: 4 }}>
          <HStack
            align="center"
            as="ul"
            display={{ base: "none", lg: "flex" }}
            spacing="0.5rem"
          >
            <StyledLink
              as="ul"
              listStyleType="none"
              href="/"
              fontSize={{ base: "none", lg: "1.2rem" }}
              px={{ base: 4, lg: 1.5 }}
              pb={{ base: 4, lg: 0 }}
              variant="noStyle"
              lineHeight="center"
            >
              Home
            </StyledLink>
            <HoverDropDown href="/discover" title="Discover" variant="noStyle">
              <VerticalLink href="/about" variant="noStyle">
                About
              </VerticalLink>
              <VerticalLink href="/howitworks" variant="noStyle">
                Apply
              </VerticalLink>
              <VerticalLink href="/pricing" variant="noStyle">
                Pricing
              </VerticalLink>
            </HoverDropDown>
            {/* Resources Routes */}
            <HoverDropDown
              href="/resources"
              title="Resources"
              variant="noStyle"
            >
              <VerticalLink href="/docs" variant="noStyle">
                Docs
              </VerticalLink>
              <VerticalLink href="/support" variant="noStyle">
                Support
              </VerticalLink>
              <VerticalLink href="/contact" variant="noStyle">
                Contact Us
              </VerticalLink>
            </HoverDropDown>
            {/* Display Log In / Log Out based on authentication */}
            {context.session ? (
              <Button
                aria-label="Log Out"
                type="auth"
                position="relative"
                variant="authThemed"
                fontSize={{ base: "none", lg: "1.2rem" }}
                w="100%"
                px={{ base: 4, lg: 6 }}
                pb={{ base: 4, lg: 0 }}
                mb={1.4}
                onClick={logoutHandler}
              >
                +Log Out+
              </Button>
            ) : (
              <Button
                aria-label="Log In"
                type="auth"
                position="relative"
                variant="authThemed"
                fontSize={{ base: "none", lg: "1.2rem" }}
                w="100%"
                px={{ base: 4, lg: 6 }}
                pb={{ base: 4, lg: 0 }}
                mb={1.4}
                onClick={loginHandler}
              >
                +Log In+
              </Button>
            )}
          </HStack>
          <MenuButton isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        </HStack>
      </Flex>
      {context.session && (
        <VStack
          display={isOpen ? "none" : "visible"}
          mt={10}
          spacing={{ base: "0.1rem", lg: "0.1rem" }}
          px={{ base: "1rem", lg: "2rem" }}
          mb="0.1rem"
          // ml="2rem"
        >
          <SubMenu />
          <Divider alignSelf="center" bg="neutral.100" />
        </VStack>
      )}
    </Box>
  );
}

export { Navbar };
export { MobileNavMenu } from "./mobile";
