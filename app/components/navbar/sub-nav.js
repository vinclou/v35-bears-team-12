import React from "react";
import useMeQuery from "../../hooks/useMeQuery";
import { Flex, HStack } from "@chakra-ui/layout";
import { StyledLink } from "../styled-link/styled-link";
import { useUserStore } from "../../context/useUserStore";

function SubMenu() {
  const { session } = useUserStore();
  const { data, error, refetch, status } = useMeQuery();
  // Set up listener to refetch the data if the session changes
  React.useEffect(() => {
    if (session) refetch();
  }, [session]);

  return (
    // <HStack spacing={{ base: 14, md: 8 }} >
    <Flex
      as="ul"
      align="center"
      fontSize={{ base: "1.2rem", md: "1.2rem", lg: "1.2rem" }}
    >
      <StyledLink
        variant="noStyle"
        href={data ? `/activity/${encodeURIComponent(data.user.id)}` : "null"}
      >
        Activity
      </StyledLink>
      <StyledLink
        variant="noStyle"
        href={data ? `/profile/${encodeURIComponent(data.user.id)}` : "null"}
      >
        Profile
      </StyledLink>
      <StyledLink variant="noStyle" href="/settings">
        Settings
      </StyledLink>
    </Flex>
    // </HStack>
  );
}

export { SubMenu };
