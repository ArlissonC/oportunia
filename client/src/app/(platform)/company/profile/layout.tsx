"use client";

import ProfileLayout from "@/app/(platform)/components/ProfileLayout";
import { useCompanyProfileData } from "./hooks/useCompanyProfileData";

export default function CompanyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { companyProfile } = useCompanyProfileData();

  return (
    <ProfileLayout imageUrl={companyProfile?.logoUrl!}>
      {children}
    </ProfileLayout>
  );
}
