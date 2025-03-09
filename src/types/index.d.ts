export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
  copyRight: string;
  email: string;
};

export type AuthorConfig = {
  slug: string;
  name: string;
  image: string;
  twitter: string;
};
