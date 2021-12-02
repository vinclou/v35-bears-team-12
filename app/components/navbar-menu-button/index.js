import React, { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { useToggle } from "../../hooks/useToggle";
import { useColorModeSwitcher } from "../../hooks/useColorModeSwitcher";
import { useMediaQuerySSR } from "../../hooks/useMediaQuerySsr";

const MenuButton = ({ isOpen, toggleIsOpen, ...props }) => {
  const [clicked, toggleClicked] = useToggle();
  const inputRef = useRef(null);

  const [isLargerThan990] = useMediaQuerySSR("(min-width: 990px)");

  /* Fix the bug, where side bar is open on window resize */
  useEffect(() => {
    if (isOpen && isLargerThan990) {
      inputRef.current.click();
    }
  }, [isLargerThan990]);

  const handleClick = () => {
    console.log("Clicked");
    toggleIsOpen();
    toggleClicked();
  };
  return (
    <IconButton
      alt="Navigation Menu"
      aria-label="Navigation Menu"
      ref={inputRef}
      borderRadius="sm"
      variant="ghost"
      onClick={handleClick}
      display={{ base: "block", lg: "none" }}
      w="50px"
      h="50px"
      icon={<MenuIcon clicked={clicked} />}
      _hover={{ variant: "ghost" }}
      {...props}
    />
  );
};

const MenuIcon = ({ clicked }) => {
  const { colorDark } = useColorModeSwitcher();
  return (
    <Box w="100%" h="100%" position="relative">
      <Line
        bg={colorDark}
        width={clicked ? "1px" : "19px"}
        top={clicked ? "1px" : "6px"}
        left={clicked ? "1px" : "25px"}
        opacity={clicked ? "0" : "1"}
        transition={clicked ? "opacity 1s ease;" : "none"}
      />
      <Line
        bg={colorDark}
        width={clicked ? "32px" : "40px"}
        top={clicked ? "22px" : "16px"}
        left={clicked ? "8px" : "4px"}
        transform={clicked ? "rotate(45deg)" : "none"}
      />
      <Line
        bg={colorDark}
        width={clicked ? "32px" : "19px"}
        bottom={clicked ? "22px" : "19px"}
        left={clicked ? "8px" : "4px"}
        transform={clicked ? "rotate(-45deg)" : "none"}
      />
    </Box>
  );
};

const Line = ({ ...props }) => {
  return (
    <Box
      {...props}
      borderRadius="1px"
      as="span"
      position="absolute"
      height="4px"
      transition="all 0.3s ease-in-out"
    />
  );
};

export { MenuButton };
