"use client";

import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import { useSession } from "next-auth/react";

export default function Blog() {
  const [data, setData] = useState(null);
  const { data: session, status } = useSession();

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

  if (status == "authenticated") {
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
  } else {
    return <h1>PLEASE LOG IN</h1>;
  }
}
