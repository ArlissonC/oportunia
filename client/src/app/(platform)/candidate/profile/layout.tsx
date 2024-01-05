"use client";

import ProfileLayout from "@/app/(platform)/components/ProfileLayout";
import { useCandidateProfileData } from "./hooks/useCandidateProfileData";

export default function CandidateProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { candidateProfileData } = useCandidateProfileData();
  return (
    <ProfileLayout imageUrl={candidateProfileData?.photoUrl}>
      {children}
    </ProfileLayout>
  );
}
