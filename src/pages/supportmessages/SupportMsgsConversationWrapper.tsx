import { useParams } from "react-router-dom";
import SupportMsgsConversation from "./SupportMsgsConversation";

const SupportMsgsConversationWrapper = () => {
  const { id } = useParams();
  if (!id) return null;

  return <SupportMsgsConversation conversationId={Number(id)} />;
};

export default SupportMsgsConversationWrapper;
