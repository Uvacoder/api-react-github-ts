import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
  userAgent: "flexiana v1",
});
