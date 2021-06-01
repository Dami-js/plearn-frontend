import { useSession } from "next-auth/client";
import QuestionProvider from "./context";
import QuestionList from "./QuestionList";
// import QuestionList from "./QuestionList";

const Questions = () => {
  const [session] = useSession();
  return (
    <>
      <QuestionProvider>
        <QuestionList session={session} />
      </QuestionProvider>
    </>
  );
};

export default Questions;
