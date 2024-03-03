"use client";

import { deleteIssue } from "@/actions/delete-issue";

export default function DeleteButton({ issue }) {
  const formDeleteIssue = (
    <form action={deleteIssue}>
      <input type="text" name="issueDelete" defaultValue={issue} readOnly />
      <button
        /* className="text-red-500 background-transparent font-bold" */
        type="button"
      >
        DELETE
      </button>
    </form>
  );

  return <div>{formDeleteIssue}</div>;
}
