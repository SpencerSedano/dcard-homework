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
    const updateIssue = async () => {
      const octokit = new Octokit({
        auth: process.env.ONETIME_TOKEN,
      });

      await octokit.request(
        `PATCH /repos/SpencerSedano/dcard-homework/issues/${issue_number}`,
        {}
      );
    };
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
                  <div key={i} className="border-4 p-8 m-8">
                    <h1 className="text-4xl">{issue.title}</h1>
                    <p className="text-base">{issue.body}</p>
                    <p>The issue number is: {issue.number}</p>
                    <button className="bg-black text-white">UPDATE</button>
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
