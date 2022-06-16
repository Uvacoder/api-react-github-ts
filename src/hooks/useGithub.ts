import { useCallback, useState } from "react";
import { octokit } from "../utils";

import { ContributorItem, RepoItem } from "../@types";

export default function useGithub() {
  const [contributors, setContributors] = useState<Array<ContributorItem>>([]);
  const [repos, setRepos] = useState<Array<RepoItem>>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchContributors = useCallback(
    async (username: string, repo: string) => {
      setLoading(true);
      try {
        const res = await octokit.request(
          "GET /repos/{owner}/{repo}/contributors",
          {
            owner: username,
            repo: repo,
          }
        );

        setContributors(res.data as ContributorItem[]);
        setLoading(false);
      } catch (error) {
        console.log((error as Error).message);
        setLoading(false);
        setError((error as Error).message);
      }
    },
    []
  );

  const fetchRepos = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const res = await octokit.request(
        `GET /search/repositories?q=${query}+language:javascript&sort=stars&order=desc`
      );

      setRepos(res.data.items);
      setLoading(false);
    } catch (error) {
      console.log((error as Error).message);
      setLoading(false);
      setError((error as Error).message);
    }
  }, []);

  return { contributors, fetchContributors, loading, error, fetchRepos, repos };
}
