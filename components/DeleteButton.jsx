"use client";

import { deleteIssue } from "@/actions/delete-issue";

export default function DeleteButton({ issue }) {
  const handlerButton = () => {
    if (true) {
      console.log("works");
    } else {
      console.log("doesn't work");
    }
  };

  const formDeleteIssue = (
    <form action={deleteIssue}>
      <input type="text" name="issueDelete" defaultValue={issue} readOnly />
      <button
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="submit"
        onClick={handlerButton}
      >
        DELETE
      </button>
    </form>
  );

  return <>{formDeleteIssue}</>;
}
