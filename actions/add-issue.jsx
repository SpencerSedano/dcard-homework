"use server";

import { Octokit } from "octokit";

export const addIssue = async (formData) => {
  const octokit = new Octokit({
    auth: process.env.ONETIME_TOKEN,
  });

  const contentT = formData.get("titleContent");
  const contentB = formData.get("bodyContent");

  const response = await octokit.request("POST /repos/{owner}/{repo}/issues", {
    owner: "SpencerSedano",
    repo: "dcard-homework",
    title: contentT,
    body: contentB,
  });

  return {
    sucess: true,
  };
};
