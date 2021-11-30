import React from "react";
import axios from "axios";
import { Container } from "../../layouts/container";
import { ContentWrapper } from "../../layouts/content-wrapper";
import { Heading } from "@chakra-ui/react";

import queryClient from "../../lib/react-query";
import { dehydrate, useQuery } from "react-query";
import { fetchSession } from "../../hooks/useSession";
import { getSession } from "next-auth/client";

import { useUserStore } from "../../context/useUserStore";

export default function ActivityPage() {
  const context = useUserStore();
  const { session } = context;
  // TODO: refactor custom hook, useMeQuery, so that it would be reusable on this page
  const { status, error, data } = useQuery("me", getMe);
  // console.log(session);
  // console.log(status);
  return (
    <Container title="Activity | Chingu Board">
      <ContentWrapper>
        <Heading as="h2" textAlign="center" variant="h2">
          My Activity
        </Heading>
        <Heading as="h2" textAlign="center" variant="h2">
          My Teams
        </Heading>
        <Heading as="h2" textAlign="center" variant="h2">
          My Projects
        </Heading>
        <Heading as="h2" textAlign="center" variant="h2">
          My Tasks & Achievements
        </Heading>
        <Heading as="h2" textAlign="center" variant="h2">
          Pending Invites
        </Heading>
      </ContentWrapper>
    </Container>
  );
}

async function getMe() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/me`);

  return res.data;
}

export const getServerSideProps = async (ctx) => {
  // check for user authentication and get user data
  const session = await getSession(ctx);

  // if there's no data redirect user to login page
  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(
          process.env.NEXTAUTH_URL
        )}`,
        permanent: false,
      },
    };
  }
  // strange that it fails to validate auth token
  // Severity Level: Low, SSR: for this page is not crucial
  // await queryClient.prefetchQuery(["me"], getMe);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
