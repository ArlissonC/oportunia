export const APP_ROUTES = {
  private: [
    {
      name: "/company/dashboard/:vacancyId",
      roles: ["Company"],
    },
    {
      name: "/company/profile",
      roles: ["Company"],
    },
    {
      name: "/company/profile/address",
      roles: ["Company"],
    },
    {
      name: "/company/profile/login-data",
      roles: ["Company"],
    },
    {
      name: "/company/profile/close-account",
      roles: ["Company"],
    },
    {
      name: "/company",
      roles: ["Company"],
    },
    {
      name: "/company/dashboard",
      roles: ["Company"],
    },
    {
      name: "/company/dashboard/new-vacancy",
      roles: ["Company"],
    },
    {
      name: "/candidate/profile",
      roles: ["Candidate"],
    },
    {
      name: "/candidate/profile/address",
      roles: ["Candidate"],
    },
    {
      name: "/candidate/professional-experiences",
      roles: ["Candidate"],
    },
    {
      name: "/candidate/professional-experiences/new-experience",
      roles: ["Candidate"],
    },
    {
      name: "/candidate/profile/login-data",
      roles: ["Candidate"],
    },
    {
      name: "/candidate/profile/close-account",
      roles: ["Candidate"],
    },
    {
      name: "/candidate",
      roles: ["Candidate"],
    },
  ],
};
