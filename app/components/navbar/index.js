import React from "react";
import useMeQuery from "../../hooks/useMeQuery";
import { SearchBar } from "../search-bar";
import { Box, Flex, HStack, VStack, Center, Heading } from "@chakra-ui/layout";
import { Button, Divider } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { useToggle } from "../../hooks/useToggle";
import { useColorModeSwitcher } from "../../hooks/useColorModeSwitcher";
import { useColorMode } from "@chakra-ui/color-mode";
import { VerticalLink } from "../styled-link/vertical-link";
import { StyledLink } from "../styled-link/styled-link";
import { useUserStore } from "../../context/useUserStore";
import chinguLogo from "../image/chingu-logo-small.png";
import menuIcon from "../image/Vector.png";
import Image from "next/image";

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
      p="1rem"
      mb={isOpen ? { base: "1rem" } : { base: "2.5rem", lg: ".3rem" }}
    >
      <Flex
        justify="space-between"
        mb={isOpen ? { base: "1rem" } : { base: "2.5rem", lg: ".3rem" }}
        p="4"
      >
        <Image src={chinguLogo} alt="Chingu Logo" width="160px" height="55px" />

        <MenuButton toggleIsOpen={toggleIsOpen} />

        <HStack spacing={{ base: 0, md: 8 }}>
          <Flex align="center" as="ul" display={{ base: "none", lg: "flex" }}>
            <HoverDropDown href="/discover" title="Discover" variant="noStyle">
              <VerticalLink href="/teams" variant="noStyle">
                Teams
              </VerticalLink>
              <VerticalLink href="/about" variant="noStyle">
                About
              </VerticalLink>
            </HoverDropDown>
            {/* Resources Routes */}
            <HoverDropDown
              href="/resources"
              title="Resources"
              variant="noStyle"
            >
              <VerticalLink href="/contact" variant="noStyle">
                Contact Us
              </VerticalLink>
              <VerticalLink href="/support" variant="noStyle">
                Support
              </VerticalLink>
            </HoverDropDown>
            {/* Display Log In / Log Out based on authentication */}
            {context.session ? (
              <Button
                onClick={logoutHandler}
                type="auth"
                variant="authThemed"
                w="100%"
                fontSize={18}
                mb={3}
              >
                +Log Out+
              </Button>
            ) : (
              <Button
                type="auth"
                variant="authThemed"
                w="100%"
                onClick={loginHandler}
                fontSize={18}
                mb={3}
              >
                +Log In+
              </Button>
            )}
          </Flex>
          <HStack display={{ lg: "none" }} _hover={{ cursor: "pointer" }}>
            <Image
              src={menuIcon}
              alt="Menu"
              width="39px"
              height="26px"
              onClick={toggleIsOpen}
            />
          </HStack>
        </HStack>
      </Flex>
      {context.session && (
        <VStack
          mt={10}
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={{ base: "0.1rem", lg: "0.2rem" }}
          mb="0.1rem"
          ml="2rem"
        >
          <SubMenu />
          <Divider w="260px" bg="neutral.700" />
        </VStack>
      )}
      <Center p={2}>
        <SearchBar />
        <Button
          aria-label="Add query labels to your search"
          // variant="primary"
          type="submit"
          border="none"
          m={2}
          h="inherit"
          variant="primaryThemed"
          bg="primary.700"
          color="accent.simpleWhite"
          w="5rem"
          onClick={loginHandler}
          // fontSize={13}
          textTransform="none"
          letterSpacing="0.5px"
        >
          + Labels
        </Button>
      </Center>
    </Box>
  );
}

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

function SubMenu() {
  const { session } = useUserStore();
  const { data, error, refetch, status } = useMeQuery();
  // Set up listener to refetch the data if the session changes
  React.useEffect(() => {
    if (session) refetch();
  }, [session]);

  return (
    <>
      <HStack spacing={{ base: 0, md: 8 }} fontSize={22}>
        <Flex align="center" display={{ base: "flex", lg: "flex" }} as="ul">
          <StyledLink
            variant="noStyle"
            href={
              data ? `/activity/${encodeURIComponent(data.user.id)}` : "null"
            }
          >
            Activity
          </StyledLink>
          <StyledLink
            variant="noStyle"
            href={
              data ? `/profile/${encodeURIComponent(data.user.id)}` : "null"
            }
          >
            Profile
          </StyledLink>
          <StyledLink variant="noStyle" href="/settings">
            Settings
          </StyledLink>
        </Flex>
      </HStack>
    </>
  );
}

function MenuButton({ toggleIsOpen, ...props }) {
  const [clicked, toggleClicked] = useToggle();

  const handleClick = () => {
    toggleIsOpen();
    toggleClicked();
  };
  return (
    <IconButton
      {...props}
      _hover={{ variant: "ghost" }}
      borderRadius="sm"
      display={{ base: "block", lg: "none" }}
      h="48px"
      onClick={handleClick}
      variant="ghost"
      w="48px"
      icon
    />
  );
}

export { Navbar, MobileNavMenu };
