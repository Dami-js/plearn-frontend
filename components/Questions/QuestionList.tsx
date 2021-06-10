import { Box, Button, Typography } from "@material-ui/core";
import { SignalCellularConnectedNoInternet4BarSharp } from "@material-ui/icons";
import Alert from "components/Alert";
import MuiModal from "components/MuiModal";
import { getSession, useSession } from "next-auth/client";
import { determineLearningStyle } from "pages/api/queries";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import QuestionProvider, { useQuestionContext } from "./context";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import * as _ from "lodash";
import { useRouter } from "next/router";

type NavKey = "next" | "prev";

const QuestionList = ({ session }) => {
  const { answers, step, setStep } = useQuestionContext();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();

  const { mutate, data, isLoading, error } = useMutation(
    determineLearningStyle,
    {
      mutationKey: "questionnaire",
    }
  );

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleNavigation = (key?: NavKey) => {
    switch (key) {
      case "next":
        handleNext();
        break;
      case "prev":
        handlePrev();
        break;

      default:
        mutate(
          { token: session.user.access_token, answers },
          {
            onError: (error, variables, ctx) => {
              setOpenAlert(true);
            },
            onSuccess: (data, variables, ctx) => {
              setOpen(true);
            },
          }
        );
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [step]);

  return (
    <>
      <Alert
        severity="error"
        open={openAlert}
        onClose={() => setOpenAlert(false)}
      >
        An error occurred
      </Alert>
      <MuiModal open={open} title="Congratulations!" handleClose={handleClose}>
        <Box textAlign="center" p={5}>
          <Typography variant="h5">
            Thank you for your sincere answers. We are glad to inform you that
            your preferred learning style is
          </Typography>
        </Box>
        <Box textAlign="center" fontWeight="bold">
          <Typography variant="h4" style={{ transform: "capitalize" }}>
            {" "}
            {_.capitalize(data?.learningStyle)}{" "}
          </Typography>
        </Box>
        <Box textAlign="center" py={5}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              router.push("/");
            }}
          >
            Continue
          </Button>
        </Box>
      </MuiModal>
      <Box textAlign="center" fontWeight="bold" py={4} id="#top">
        <Typography variant="h4">{step}/4</Typography>
      </Box>
      {step == 1 && <StepOne />}
      {step == 2 && <StepTwo />}
      {step == 3 && <StepThree />}
      {step == 4 && <StepFour />}
      <Box fontWeight="bold" py={4}>
        <Typography variant="h6">{step}/4</Typography>
      </Box>
      <Box py={4}>
        {step <= 4 && step > 1 && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleNavigation("prev")}
            style={{ marginRight: 10 }}
          >
            Prev
          </Button>
        )}
        {step >= 1 && step < 4 && (
          <>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => handleNavigation("next")}
            >
              Next
            </Button>
          </>
        )}
        {step == 4 && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleNavigation()}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        )}
      </Box>
    </>
  );
};

export default QuestionList;
