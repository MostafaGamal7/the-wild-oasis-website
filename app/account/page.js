import React from "react";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Area",
  description: "Manage your account at The Wild Oasis.",
};

export default async function Page() {
  const session = await auth();
  console.log(session);
  const firstName = session.user.name.split(" ").at(0);

  return <p className="text-accent-400">Welcome, {firstName}</p>;
}
