"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Candidate = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("candidate/profile");
  }, []);

  return null;
};

export default Candidate;
