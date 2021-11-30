/*
  TODO: Better infinite scroll, actually fetching previous page, styling, etc.
  Set up bi-directional infinite scroll, right now it's only forward.
*/
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import queryClient from "../lib/react-query";
import ProjectCard from "../components/post-card";
import { useMediaQuerySSR } from "../hooks/useMediaQuerySsr";
import { dehydrate, useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { Container } from "../layouts/container";
import { ContentWrapper } from "../layouts/content-wrapper";
import { Box, Badge, Button, Text, Spinner, Center } from "@chakra-ui/react";
import { SearchBar } from "../components/search-bar";

export default function Home() {
  const router = useRouter();
  const [isMobile] = useMediaQuerySSR("(max-width: 620px)");
  const { ref, inView } = useInView();

  /* Refresh Data alongside server side props */
  const refreshData = () => {
    router.replace(router.asPath, undefined, { shallow: true });
  };

  /* Fetching data on the client */
  const {
    status,
    error,
    data,
    fetchNextPage,
    // fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["projects"],
    async ({ pageParam = "" }) => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/infinite?cursor=${pageParam}`
      );

      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
    }
  );

  // Listen if it needs to load more data
  useEffect(() => {
    if (inView && hasNextPage && status !== "error") {
      //set query value to the nextCursor value
      const query = router.query;
      query.cursor = data.pages[data.pages.length - 1].nextCursor;

      router.push(
        {
          pathname: router.pathname,
          query: query,
        },
        undefined,
        {
          shallow: true,
        }
      );
      refreshData();
      fetchNextPage();
    }
  }, [inView]);

  // Test Listener
  // useEffect(() => {
  //   console.log("router has been refreshed");
  // }, [router.query.cursor]);

  return (
    <Container title="Home Page | Chingu Board">
      <ContentWrapper>
        <Box>
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
              // onClick={loginHandler}
              // fontSize={13}
              textTransform="none"
              letterSpacing="0.5px"
            >
              + Labels
            </Button>
          </Center>
          {error && <Text>{error.message}</Text>}
          {status === "loading" ? (
            <Spinner size="lg" />
          ) : (
            <>
              <Badge mx="2rem" variant="secondary">
                Items found: {data.pages[0].count}
              </Badge>
              {/* Map the data */}
              {data &&
                data.pages.map((page) => {
                  return (
                    <React.Fragment key={page.nextCursor ?? "lastPage"}>
                      {page.projects.map((p) => (
                        <ProjectCard
                          key={p.id}
                          isMobile={isMobile}
                          project={p}
                        />
                      ))}
                    </React.Fragment>
                  );
                })}
              {/* Fix the style center the element */}

              {isFetchingNextPage ? <Spinner size="lg" /> : null}
            </>
          )}
        </Box>
        {/* Determines if the next page needs to be fetched  */}
        <span style={{ visibility: "hidden" }} ref={ref}>
          intersection observer marker
        </span>
      </ContentWrapper>
    </Container>
  );
}

async function getPosts(cursor = "") {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/infinite?cursor=${cursor}`
  );
  return res.data;
}

export const getServerSideProps = async ({ query }) => {
  // query all projects with particular team data relevant to the use case on this page
  // sorts the data in descending order by the date of creation
  const cursor = query.cursor ? query.cursor : "";

  await queryClient.prefetchInfiniteQuery(["projects"], getPosts(cursor));

  // Those JSON methods can open website to vulnerabilities, look for a way to fix dehydration serialization problem
  // https://github.com/tannerlinsley/react-query/issues/1458
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
