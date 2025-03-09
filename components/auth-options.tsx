"use client";
import { Grid } from "@radix-ui/themes";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

const AuthOptions = () => {
  return (
    <Grid columns="1fr 1fr" gap="3">
      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        variant="outline"
        className="text-xl"
      >
        <FcGoogle />
      </Button>
      <Button variant="outline" className="text-xl">
        <FaGithub />
      </Button>
    </Grid>
  );
};

export default AuthOptions;
