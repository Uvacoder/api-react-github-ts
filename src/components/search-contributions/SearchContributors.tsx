import { ChangeEvent, useCallback, useState } from "react";

import { ContributorItem } from "../../@types";
import useGithub from "../../hooks/useGithub";
import { Loader } from "../shared";

export const SearchContributors = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const { fetchContributors, contributors, loading, error } = useGithub();

  const handleSearchRepo = useCallback(() => {
    const [username, repo] = repoUrl.split("/");

    fetchContributors(username, repo);
  }, [repoUrl, fetchContributors]);

  return (
    <div className="contributors">
      <h3>Search users of a specific repository</h3>
      <div className="search-form">
        <div className="input-group">
          <span>https://github.com/</span>

          <input
            type="text"
            required
            className="search-input"
            placeholder="joseprest/next.js-shift"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRepoUrl(e.target.value)
            }
          />
        </div>
        <button
          onClick={handleSearchRepo}
          className="searchBtn"
          disabled={repoUrl === ""}
        >
          Search
        </button>
      </div>

      {loading ? (
        <Loader animeType="fade">Loading Contributors...</Loader>
      ) : (
        <>
          {error ? (
            <div className="error-message">Error: {error}</div>
          ) : (
            <>
              {contributors && contributors.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Type</th>
                      <th>Contributions</th>
                      <th>View on Github</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contributors.map((contributor: ContributorItem) => (
                      <ContributorRowItem
                        contributor={contributor}
                        key={contributor.id}
                      />
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No Contributors</div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

type ContributorItemProps = {
  contributor: ContributorItem;
};

const ContributorRowItem = ({ contributor }: ContributorItemProps) => {
  return (
    <tr key={contributor.id}>
      <td>{`https://github.com/${contributor.login}`}</td>
      <td>{contributor.type}</td>
      <td>{contributor.contributions}</td>
      <td>
        <a href={contributor.html_url} target="_blank" rel="noreferrer">
          View
        </a>
      </td>
    </tr>
  );
};
