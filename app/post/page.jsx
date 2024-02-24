import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.ONETIME_TOKEN,
});

export default async function PostBlog(props) {
  const response = await octokit.request("POST /repos/{owner}/{repo}/issues", {
    owner: "SpencerSedano",
    repo: "dcard-homework",
    title: "revalidation title",
    body: "revalidation body",
  });

  console.log(response);
}
