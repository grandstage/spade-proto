import withOnboardingRequired from "../components/utils/wrappers";
import { Metadata } from "next";
import SpadeChat from "../components/conversational-ui/spade-chat";

export const metadata: Metadata = {
  title: "Copilot | Spade AI",
};

export default async function Copilot() {
  return (
    <>
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <SpadeChat />
      </div>
    </>
  );
}
