// import queryClient from "../lib/react-query";
// import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

async function getMe() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/me`);

  return res.data;
}

export default function useMeQuery() {
  // return useQuery("me", getMe);
  return useQuery("me", getMe, { refetchOnWindowFocus: false, enabled: false });
}
