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

export default function ProfilePage() {
  const context = useUserStore();
  const { session } = context;
  const { status, error, data } = useQuery("me", async () => await getMe());
  // console.log(session);
  // console.log(status);
  return (
    <Container title="Profile | Chingu Board">
      <ContentWrapper>
        <Heading as="h2" textAlign="center" variant="h2">
          Avatar Place Holder && {data.user.name}
        </Heading>
        <Heading as="h2" textAlign="center" variant="h2">
          Social Links
        </Heading>
        <Heading as="h2" textAlign="center" variant="h2">
          Bio
        </Heading>
        <Heading>GitHub Activity & Discord Activity & Chingu Status</Heading>
      </ContentWrapper>
    </Container>
  );
}

// async function getMe() {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/me`);

//   return res.data;
// }

export const getServerSideProps = async (ctx) => {
  // check for user authentication and get user data
  // const session = await getSession(ctx);

  // if there's no data redirect user to login page
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(
  //         process.env.NEXTAUTH_URL
  //       )}`,
  //       permanent: false,
  //     },
  //   };
  // }

  // await queryClient.prefetchQuery(["me"], getMe(session.accessToken));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
