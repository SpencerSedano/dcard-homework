import { Octokit } from "octokit";

export default async function handler(req, res) {
  const octokit = new Octokit({
    auth: "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",
  });
  const response = await octokit.request(
    "GET /repos/SpencerSedano/dcard-homework/issues/1",
    {
      owner: "Spencer",
      repo: "dcard",
      issue_number: "1",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  res.status(200).json(response.data);
}
