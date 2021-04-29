import QuestionProvider from "./context";
import QuestionList from "./QuestionList";
// import QuestionList from "./QuestionList";

const Questions = () => {
  return (
    <>
      <QuestionProvider>
        <QuestionList />
      </QuestionProvider>
    </>
  );
};

export default Questions;
