"use client";

import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";

/* import { addIssue } from "@/actions/add-issue"; */
/* import { updateIssue } from "@/actions/update-issue"; */

import ModalCreate from "@/components/ModalCreate";

const issuesPerPage = 10;

export default function Blog() {
  const [data, setData] = useState(null);
  const { data: session, status } = useSession();
  const [issuesToShow, setIssuesToShow] = useState(issuesPerPage);
  const [ref, inView] = useInView();

  // Form Validation :)
  /* const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueBody, setNewIssueBody] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [newIssueTitle, newIssueBody]);

  const validateForm = () => {
    let errors = {};

    if (!newIssueTitle) {
      errors.newIssueTitle = "Title is required";
    }

    if (!newIssueBody) {
      errors.newIssueBody = "Body is required";
    } else if (newIssueBody.length < 30) {
      errors.newIssueBody = "Body must be at least 30 characters";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  const handleSubmit = () => {
    if (isFormValid) {
      console.log("Form submitted successfully!");
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };
 */
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
          per_page: 100,
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
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (inView) {
      setIssuesToShow((prev) => prev + issuesPerPage);
    }
  }, [inView]);

  /* const formAddIssue = (
    <form action={addIssue}>
      <input
        type="text"
        name="titleContent"
        placeholder="Write your title"
        value={newIssueTitle}
        onChange={(e) => setNewIssueTitle(e.target.value)}
      />
      {errors.newIssueTitle && <p>{errors.newIssueTitle}</p>}
      <textarea
        type="text"
        name="bodyContent"
        placeholder="Write your body"
        value={newIssueBody}
        onChange={(e) => setNewIssueBody(e.target.value)}
      />
      {errors.newIssueBody && <p>{errors.newIssueBody}</p>}
      <button onClick={handleSubmit} disabled={!isFormValid}>
        Add New Issue
      </button>
    </form>
  ); */

  return (
    <div>
      <ModalCreate />
      {/*       {status === "authenticated" && formAddIssue}
       */}
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
                  {/*  <div>
                    {session?.user?.name === issue.user.login && (
                      <div>
                        <form action={updateIssue}>
                          <input
                            type="text"
                            name="issueContent"
                            defaultValue={issue.number}
                            readOnly
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
                    )}
                  </div> */}
                </div>
              )
          )}
          {data.length > issuesToShow && (
            <div ref={ref}>{/* Add loading */}</div>
          )}
        </div>
      )}
    </div>
  );
}
