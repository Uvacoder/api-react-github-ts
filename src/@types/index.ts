export type RepoItem = {
  id?: string;
  html_url?: string;
  language?: string;
  name?: string;
  stargazers_count?: number;
  [key: string]: any;
};

export type ContributorItem = {
  id?: string;
  login?: string;
  type?: string;
  contributions?: number;
  html_url?: string;
  [key: string]: any;
};
