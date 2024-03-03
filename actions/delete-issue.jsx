"use server";

import { Octokit } from "octokit";

export const deleteIssue = async (formData) => {
  const octokit = new Octokit({
    auth: process.env.ONETIME_TOKEN,
  });

  const contentD = formData.get("issueDelete");
  /* const contentC = formData.get("issueClosed"); */

  const response = await octokit.request(
    "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
    {
      owner: "SpencerSedano",
      repo: "dcard-homework",
      issue_number: contentD,
      state: "closed",
    }
  );

  return {
    sucess: true,
  };
};
