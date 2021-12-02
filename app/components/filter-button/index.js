import React from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { useMediaQuerySSR } from "../../hooks/useMediaQuerySsr";
import { VscAdd } from "react-icons/vsc";
import { BsPlusLg } from "react-icons/bs";

function FilterButton({}) {
  const [isMedium] = useMediaQuerySSR("(max-width: 580px)");

  if (isMedium) {
    return (
      <IconButton
        aria-label="apply filters"
        alignSelf="center"
        bg="accent.bluishWhite"
        boxShadow="md"
        borderRadius="4px"
        color="neutral.700"
        h="39px"
        mx="0.3rem"
        variant="primaryThemed"
        icon={<BsPlusLg />}
      />
    );
  }

  return (
    <Button
      aria-label="Apply filters"
      alignSelf="center"
      bg="accent.bluishWhite"
      boxShadow="md"
      borderRadius={4}
      color="neutral.700"
      h="39px"
      mx="0.3rem"
      variant="primaryThemed"
      textTransform="none"
      letterSpacing="0.9px"
      type="submit"
      // onClick={pickLabelsHandler}
      // fontSize={18}
    >
      + Filters
    </Button>
  );
}

export { FilterButton };
