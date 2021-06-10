import { Typography } from "@material-ui/core";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PostRegister = ({ session }) => {
  const {
    user: { user },
  } = session;
  const router = useRouter();

  useEffect(() => {
    console.log();
    if (user.isStudent && user.learningStyle.includes("")) {
      router.push("/questionnaire");
    } else {
      router.push("/");
    }
  }, []);
  return <Typography>Loading... Please wait</Typography>;
};

export async function getServerSideProps(context) {
  const session: any = await getSession(context);

  const props = { useLayout: false, session };

  return { props: { ...props } };
}

export default PostRegister;
