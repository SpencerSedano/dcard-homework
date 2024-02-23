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
        "GET /repos/{owner}/{repo}/issues/1",
        {
          owner: "SpencerSedano",
          repo: "dcard-homework",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      setData(response.data);
      console.log(response);
    };

    fetchData();
  }, []);

  const createNewIssue = async () => {
    const octokit = new Octokit({
      //works with ONETIME_TOKEN
      auth: process.env.ONETIME_TOKEN,
    });
    try {
      const responseIssue = await octokit.request(
        "POST /repos/{owner}/{repo}/issues",
        {
          owner: "SpencerSedano",
          repo: "dcard-homework",
          title: "Make it work 3",
          body: "PLEASE WORK 3",
        }
      );

      console.log(responseIssue);
    } catch (error) {
      console.error("Error creating issue:", error.message);
    }
  };

  return (
    <div>
      {data && (
        <div>
          <p>{data.title}</p>
          <p>{data.body}</p>
        </div>
      )}
      {/* When I call using createNewIssue() works but it sends too many POST requests */}
      <button onClick={createNewIssue}>Create New Issue</button>
    </div>
  );
}
