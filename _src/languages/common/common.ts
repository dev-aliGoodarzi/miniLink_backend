export const commonLanguage: {
  [key: string]: {
    header: {
      links: {
        path: string;
        title: string;
      }[];
      title: string;
    };
  };
} = {
  fa: {
    header: {
      links: [
        {
          path: "/",
          title: "خانه",
        },
      ],
      title: "",
    },
  },
  en: {
    header: {
      links: [
        {
          path: "/",
          title: "home",
        },
      ],
      title: "",
    },
  },
};
