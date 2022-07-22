import { useQuery } from "react-query";
import { userKey } from "query-keys";
import { getAuthInformation } from "auth-provider";

const getAuthInfo = async () => {
  const authInfo = await getAuthInformation();
  if (authInfo) {
    const tokenNotExpiredYet =
      authInfo.expiredAt && Date.now() < authInfo.expiredAt;
    if (tokenNotExpiredYet) {
      return authInfo;
    }
  }
  return null;
};

export default function useAuth() {
  return useQuery({
    queryKey: userKey,
    queryFn: () => getAuthInfo(),
  });
}
