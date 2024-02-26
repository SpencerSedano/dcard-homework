"use client";

import { useState, useEffect } from "react";
import { addIssue } from "@/actions/add-issue";

export default function ModalCreate() {
  // Form Validation :)
  const [showModal, setShowModal] = useState(false);

  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueBody, setNewIssueBody] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [newIssueTitle, newIssueBody]);

  const validateForm = () => {
    let errors = {};

    if (!newIssueTitle) {
      errors.newIssueTitle = "Title is required";
    }

    if (!newIssueBody) {
      errors.newIssueBody = "Body is required";
    } else if (newIssueBody.length < 30) {
      errors.newIssueBody = "Body must be at least 30 characters";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      console.log("Form submitted successfully!");
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  const formAddIssue = (
    <form action={addIssue}>
      <input
        className="text-3xl font-semibold"
        type="text"
        name="titleContent"
        placeholder="Write your title"
        value={newIssueTitle}
        onChange={(e) => setNewIssueTitle(e.target.value)}
      />
      {errors.newIssueTitle && <p>{errors.newIssueTitle}</p>}

      <textarea
        className="w-full h-64 break-words text-blueGray-500 text-lg"
        type="text"
        name="bodyContent"
        placeholder="Write your body"
        value={newIssueBody}
        onChange={(e) => setNewIssueBody(e.target.value)}
      />
      {errors.newIssueBody && <p>{errors.newIssueBody}</p>}
      <div className="flex justify-items items-center">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded "
        >
          Create
        </button>
      </div>
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
        New Issue
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
                <div className="p-5 border-b border-solid border-blueGray-200 rounded-t">
                  {formAddIssue}
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
