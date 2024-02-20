"use client";

import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";

const issuesPerPage = 10;

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

  /*   useEffect(() => {
    const octokit = new Octokit({
      auth: process.env.ONETIME_TOKEN
    })
  }, []) */

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
                  </div>
                )
            )}
            {data.length > issuesToShow && (
              <div ref={ref}>
                {/* Need to build a Loading Feature to let the user know what is happening */}
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
