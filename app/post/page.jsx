import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.ONETIME_TOKEN,
});

export default async function PostBlog() {
  const response = await octokit.request("POST /repos/{owner}/{repo}/issues", {
    owner: "SpencerSedano",
    repo: "dcard-homework",
    title: "Make it work 15",
    body: "PLEASE WORK 15",
  });

  console.log(response);
}
