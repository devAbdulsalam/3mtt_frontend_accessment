import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import "./Repost.css";
import Loading from "../Loding/Loading";

const Repost = ({
  fetchRepoByName,
  loading,
  repos,
  fetchRepos,
  repoInputRef,
  currentRepos,
  reposPerPage,
  paginate,
}) => {
  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="repost">
      <h1>My Repositories</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search by name..."
          ref={repoInputRef}
          autoFocus
        />
        <button onClick={fetchRepoByName}>Search</button>
      </div>
      <div className="reposContainer">
        {loading ? (
          <Loading />
        ) : (
          currentRepos.map((repoItem) => (
            <div key={repoItem.id} className="allpost">
              <Link to={`/${repoItem.name}`} className="repoLink">
                {repoItem.name}
              </Link>
            </div>
          ))
        )}

        {/* Pagination */}
        <ul>
          {repos &&
            repos.length > 0 &&
            Array.from({
              length: Math.ceil(repos.length / reposPerPage),
            }).map((_, index) => (
              <li key={index} style={{ listStyle: "none" }}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Repost;
