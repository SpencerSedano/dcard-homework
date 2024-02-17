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

  return (
    <div>
      {data && (
        <div>
          <p>{data.title}</p>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
}
