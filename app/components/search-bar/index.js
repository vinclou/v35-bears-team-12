import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Button,
  Flex,
} from "@chakra-ui/react";
import { SearchIcon } from "../icons/search-icon";
import { useForm } from "react-hook-form";
import { useColorModeSwitcher } from "../../hooks/useColorModeSwitcher";

const delay = (fn, ms, ...args) => setTimeout(fn, ms, ...args);

function SearchBar() {
  const { authThemed } = useColorModeSwitcher();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  // const onSubmit = async ({ query }, e) => {
  //   try {
  //     const data = await client("search", {
  //       data: {
  //         query,
  //       },
  //     });
  // 		 e.target.reset();
  //   } catch (e) {
  //     throw new Error(`Error occured: ${e.message}`);
  //   }
  // };
  const onSubmit = async ({ search }, e) => {
    delay(
      function (search) {
        console.log(search);
      },
      3000,
      search
    );
    e.target.reset();
  };

  return (
    <Flex p={{ base: "0.5rem", lg: "1rem" }} flexWrap="wrap">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup size="md" w={{ base: "20rem", sm: "30rem", md: "40rem" }}>
          <InputLeftElement>
            <IconButton
              aria-label="search"
              borderRadius="4px"
              variant="unstyled"
              type="submit"
              isLoading={isSubmitting}
              icon={<SearchIcon />}
            />
          </InputLeftElement>
          <Input
            bg="accent.simpleWhite"
            borderRadius="4px"
            placeholder="Search"
            type="text"
            {...register("search", {
              minLength: 1,
              maxLength: 20,
            })}
          />
          {errors.search && (
            <Text color="red" variant="small">
              {errors.search.message}
            </Text>
          )}
        </InputGroup>
        <Button
          aria-label="Add query labels to your search"
          h="inherit"
          w="auto"
          ml={1}
          bg="primary.700"
          // border="none"
          borderColor="none"
          borderRadius="lg"
          variant="primaryThemed"
          type="submit"
          color="accent.simpleWhite"
          textTransform="none"
          letterSpacing="0.5px"
          // onClick={pickLabelsHandler}
          // fontSize={13}
        >
          + Filters
        </Button>
      </form>
    </Flex>
  );
}

export { SearchBar };
