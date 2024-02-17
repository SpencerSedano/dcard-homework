import Link from "next/link";
import ProfileIcon from "./ProfileIcon";

export default function Navbar() {
  return (
    <nav
      style={{ background: "#006AA6" }}
      className="flex justify-between items-center fixed left-0 right-0 px-8 h-14  text-white"
    >
      <Link href={"/"}>Dcard</Link>
      <ProfileIcon />
    </nav>
  );
}
