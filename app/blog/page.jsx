"use client";

import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";

const issuesPerPage = 2;

export default function Blog() {
  const [data, setData] = useState(null);
  const { data: session, status } = useSession();
  const [issuesToShow, setIssuesToShow] = useState(issuesPerPage);
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchData = async () => {
      const octokit = new Octokit({
        auth: process.env.ONETIME_TOKEN,
      });

      const response = await octokit.request(
        "GET /repos/SpencerSedano/dcard-homework/issues",
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

  useEffect(() => {
    if (inView) {
      setIssuesToShow((prev) => prev + issuesPerPage);
    }
  }, [inView]);

  if (status === "authenticated") {
    return (
      <div>
        {data && (
          <div>
            {data.slice(0, issuesToShow).map(
              (issue, i) =>
                i.state !== "closed" && (
                  <div key={i}>
                    <p>{issue.title}</p>
                    <p>{issue.body}</p>
                  </div>
                )
            )}
            {data.length > issuesToShow && (
              <div ref={ref}>
                {/* Placeholder element to trigger loading when it enters the viewport */}
              </div>
            )}
          </div>
        )}
      </div>
    );
  } else {
    return <h1>PLEASE LOG IN</h1>;
  }
}
