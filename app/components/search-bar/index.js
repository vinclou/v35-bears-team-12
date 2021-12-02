import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FilterButton } from "../filter-button";
import { FaSearch } from "react-icons/fa";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        p={{ base: "0.5rem", lg: "1rem" }}
        w={{ base: "21rem", sm: "31rem", md: "40rem", lg: "50rem" }}
      >
        <InputGroup>
          <InputLeftElement>
            <IconButton
              aria-label="search field button"
              borderRadius="4px"
              size="xl"
              variant="unstyled"
              type="submit"
              isLoading={isSubmitting}
              icon={<FaSearch />}
            />
          </InputLeftElement>
          <Input
            aria-label="search field"
            bg="accent.simpleWhite"
            borderRadius="4px"
            type="text"
            placeholder="Search"
            variant="search"
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

        <FilterButton />
      </Flex>
      {/* <Input variant="search" /> */}
    </form>
  );
}

export { SearchBar };
