"use server";

import { Octokit } from "octokit";

export const updateIssue = async (formData) => {
  const octokit = new Octokit({
    auth: process.env.ONETIME_TOKEN,
  });

  const contentI = formData.get("issueContent");
  const contentT = formData.get("titleContent");
  const contentB = formData.get("bodyContent");

  const response = await octokit.request(
    "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
    {
      owner: "SpencerSedano",
      repo: "dcard-homework",
      issue_number: contentI,
      title: contentT,
      body: contentB,
    }
  );

  return {
    sucess: true,
  };
};
