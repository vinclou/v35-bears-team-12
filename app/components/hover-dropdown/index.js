/* eslint-disable react/jsx-no-bind */
import React from "react";
import { MotionBox } from "../motion-box";
import { Box } from "@chakra-ui/layout";
import { useColorModeSwitcher } from "../../hooks/useColorModeSwitcher";
import { StyledLink } from "../styled-link/styled-link";

function HoverDropDown({ children, href, title, ...props }) {
  const { colorGrey } = useColorModeSwitcher();
  const [isHover, toggleHover] = React.useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };
  // this is a similar way to do it with Mouse Over event, I don't think it matters though
  // const [isMouse, toggleMouse] = React.useState(false);
  // const toggleMouseMenu = () => {
  //   toggleMouse(!isMouse);
  // };
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
        delay: 0.1,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };
  return (
    <MotionBox
      as="li"
      align="start"
      listStyleType="none"
      fontSize={{ base: "none", lg: "1.2rem" }}
      borderColor={colorGrey}
      borderBottom={{ base: "1px solid", lg: "none" }}
      onHoverEnd={toggleHoverMenu}
      onHoverStart={toggleHoverMenu}
      pb={{ base: 4, lg: 0 }}
      w="100%"
    >
      {/* <a href="/">Drop</a> */}
      <StyledLink href={href} type="primary" {...props}>
        {title}
      </StyledLink>
      <MotionBox
        animate={isHover ? "enter" : "exit"}
        as="ul"
        h="100%"
        initial="exit"
        position="absolute"
        top="65px"
        variants={subMenuAnimate}
      >
        {children}
      </MotionBox>
    </MotionBox>
  );
}

export { HoverDropDown };
