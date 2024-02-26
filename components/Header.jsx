"use client";

import Image from "next/image";
import Link from "next/link";
import GithubLogin from "./GithubLogin";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <div className="flex items-center justify-center ">
          <Image
            src="/daniel.png"
            width={250}
            height={100}
            alt="Daniel Profile"
            priority
          />
        </div>

        <div className="flex flex-col items-center justify-center ">
          <h1>Welcome to Daniel's blog, </h1>
          <span className="font-bold text-3xl">{session.user.name}</span>
          <br />
          <Link
            href="/blog"
            className="hover:bg-sky-700 hover:text-white text-2xl"
          >
            Go to blog
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-16">
      <h1 className="text-2xl">Sign in to browse, create, and update.</h1>

      <GithubLogin />
      <br />
      <Link href="/blog" className="hover:bg-sky-700 hover:text-white text-2xl">
        Go to blog
      </Link>
    </div>
  );
}
