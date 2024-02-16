import { Octokit } from "octokit";

export default function handler(req, res) {
  res.status(200).json({ names: "john doe" });
}
