import { useSession } from "next-auth/client";
import { myProfile } from "pages/api/queries";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  UseQueryResult,
} from "react-query";

interface UseProfile {
  data: any;
  error: unknown;
  isLoading: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

const useProfile = (): [data: UseProfile | null, error: Error | null] => {
  const [session]: Array<any> = useSession();

  const error = new Error("Please login");

  if (!session) {
    return [null, error];
  }

  const data = useQuery(
    ["getProfile", { token: session?.user?.access_token }],
    myProfile,
    { retry: false }
  );

  return [data, null];
};

export default useProfile;
