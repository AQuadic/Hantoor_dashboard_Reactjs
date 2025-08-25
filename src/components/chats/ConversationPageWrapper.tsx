import { useParams } from "react-router-dom";
import ConversationPage from "@/pages/chats/ConversationPage";

// Wrapper component for ConversationPage to extract ID from URL params
const ConversationPageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const conversationId = id ? parseInt(id, 10) : null;
  return <ConversationPage conversationId={conversationId} />;
};

export default ConversationPageWrapper;
