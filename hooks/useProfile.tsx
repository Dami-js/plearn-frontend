import { useSession } from "next-auth/client";
import { myProfile } from "pages/api/queries";
import { QueryObserverResult, RefetchOptions, useQuery } from "react-query";

interface UseProfile {
  data: any;
  error: unknown;
  isLoading: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

const useProfile = (): UseProfile | null => {
  const [session]: Array<any> = useSession();

  if (!session) return null;

  const { data, error, isLoading, refetch } = useQuery(
    ["getProfile", { token: session?.user?.access_token }],
    myProfile,
    { retry: false }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export default useProfile;
