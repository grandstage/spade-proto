import { GET as apiUserAuth } from "../../api/user/auth/route";
import { redirect } from "next/navigation";

export default function withOnboardingRequired(
  Comp:
    | (() => never)
    | (() => Promise<React.JSX.Element>)
    | (() => React.JSX.Element)
) {
  return async function () {
    const response = await apiUserAuth();

    if (response.status === 401){
      redirect("/login");
    }

    const responseJson = await response.json();

    if (!responseJson["onboarding_completed"]) {
      redirect("/setup");
    }

    return Comp();
  };
}
