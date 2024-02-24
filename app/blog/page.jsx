"use client";

import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";

import { addIssue } from "@/actions/add-issue";
import { updateIssue } from "@/actions/update-issue";

const issuesPerPage = 2;

export default function Blog() {
  const [data, setData] = useState(null);
  const { data: session, status } = useSession();
  const [issuesToShow, setIssuesToShow] = useState(issuesPerPage);
  const [ref, inView] = useInView();

  /*   const [dataComment, setDataComment] = useState(null);
   */
  /*   const postData = async () => {
    const response = await fetch("http://localhost:3000/post");
    console.log(response);
  }; */

  useEffect(() => {
    const fetchData = async () => {
      const octokit = new Octokit({
        auth: process.env.ONETIME_TOKEN,
      });

      const issuesResponse = await octokit.request(
        "GET /repos/SpencerSedano/dcard-homework/issues",
        {
          owner: "Spencer",
          repo: "dcard",
        }
      );

      const commentsResponse = await octokit.request(
        "GET /repos/{owner}/{repo}/issues/comments",
        {
          owner: "SpencerSedano",
          repo: "dcard-homework",
        }
      );

      const issuesWithComments = issuesResponse.data.map((issue) => {
        const issueComments = commentsResponse.data.filter(
          (comment) => comment.issue_url === issue.url
        );
        return { ...issue, comments: issueComments };
      });

      setData(issuesWithComments);

      console.log(issuesWithComments);
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
                  <div key={i} className="border-4 p-8 m-8">
                    <h1 className="text-4xl">{issue.title}</h1>
                    <p className="text-base">{issue.body}</p>
                    <p>The issue number is: {issue.number}</p>
                    <div>
                      {issue.comments.map((comment) => (
                        <div key={comment.id}>
                          <h1>{comment.body}</h1>
                        </div>
                      ))}
                    </div>
                    <form action={addIssue}>
                      <input
                        type="text"
                        name="titleContent"
                        placeholder="Write your title"
                      />
                      <input
                        type="text"
                        name="bodyContent"
                        placeholder="Write your body"
                      />
                      <button>Add New Issue</button>
                    </form>
                    <form action={updateIssue}>
                      <input
                        type="text"
                        name="issueContent"
                        placeholder="Number of Issue"
                      />
                      <input
                        type="text"
                        name="titleContent"
                        placeholder="Write your title"
                      />
                      <input
                        type="text"
                        name="bodyContent"
                        placeholder="Write your body"
                      />
                      <button>Update New Issue</button>
                    </form>
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
