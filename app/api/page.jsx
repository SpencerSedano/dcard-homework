"use client";

import { useEffect, useState } from "react";
import { Octokit } from "octokit";

export default function Blog() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const octokit = new Octokit({
        auth: process.env.ONETIME_TOKEN,
      });

      const response = await octokit.request(
        "GET /repos/SpencerSedano/dcard-homework/issues/1",
        {
          owner: "Spencer",
          repo: "dcard",
        }
      );

      setData(response.data);
      console.log(response);
    };

    fetchData();
  }, []);

  // Trying to POST a new issue but it gives me 404, will look into it later
  const createNewIssue = async () => {
    const octokit = new Octokit({
      auth: process.env.ONETIME_TOKEN,
    });

    try {
      const responseIssue = await octokit.request(
        "POST /repos/SpencerSedano/dcard-homework/issues",
        {
          owner: "SpencerSedano",
          repo: "dcard-homework",
          title: "Found a bug",
          body: "I'm having a problem with this.",
        }
      );

      console.log(responseIssue);
    } catch (error) {
      console.error("Error creating new issue:", error);
    }
  };

  return (
    <div>
      {data && (
        <div>
          <p>{data.title}</p>
          <p>{data.body}</p>
          <button onClick={createNewIssue}>Create New Issue</button>
        </div>
      )}
    </div>
  );
}
