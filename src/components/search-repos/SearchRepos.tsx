import { useCallback, useState } from "react";

import { RepoItem } from "../../@types";
import { Loader } from "../shared";
import useGithub from "../../hooks/useGithub";

export const SearchRepos = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { fetchRepos, loading, error, repos } = useGithub();

  const handleClickSearch = useCallback(() => {
    fetchRepos(searchQuery);
  }, [searchQuery, fetchRepos]);

  return (
    <div>
      <h3>Search repositories by a text</h3>

      <div className="search-form">
        <input
          type="text"
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="react"
        />
        <button
          type="button"
          className="searchBtn"
          onClick={() => handleClickSearch()}
          disabled={searchQuery === ""}
        >
          Search
        </button>
      </div>

      {loading ? (
        <Loader animeType="pulse">Loading Repos...</Loader>
      ) : (
        <>
          {error ? (
            <div>{error}</div>
          ) : (
            <>
              {repos && repos.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Url</th>
                      <th>Language</th>
                      <th>Owner</th>
                      <th>Stars</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repos?.map((repo: RepoItem) => (
                      <RepoItemRow repo={repo} key={repo.id} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No Repos</div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

type RepoItemProps = {
  repo: RepoItem;
};

const RepoItemRow = ({ repo }: RepoItemProps) => {
  return (
    <tr key={repo.id}>
      <td>
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.html_url}
        </a>
      </td>
      <td>{repo.language}</td>
      <td>{repo.name}</td>
      <td>{repo.stargazers_count}</td>
    </tr>
  );
};
