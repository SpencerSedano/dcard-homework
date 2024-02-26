"use client";
import { useState, useEffect } from "react";
import { updateIssue } from "@/actions/update-issue";

export default function ModalUpdate({ issue }) {
  const [showModal, setShowModal] = useState(false);
  const formUpdateIssue = (
    <form action={updateIssue}>
      <input type="text" name="issueContent" defaultValue={issue} readOnly />
      <input type="text" name="titleContent" placeholder="Write your title" />
      <input type="text" name="bodyContent" placeholder="Write your body" />
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ">
        Update New Issue
      </button>
    </form>
  );
  return (
    <>
      <button
        style={{ background: "#006AA6" }}
        className="text-white font-bold uppercase text-sm px-6 py-3 rounded "
        type="button"
        onClick={() => setShowModal(true)}
      >
        Update Issue
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
                <div className="p-5 border-b border-solid border-blueGray-200 rounded-t">
                  {formUpdateIssue}
                </div>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
