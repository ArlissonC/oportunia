"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Company = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/company/dashboard");
  }, []);

  return null;
};

export default Company;
