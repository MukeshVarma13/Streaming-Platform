import { useParams } from "react-router";
import CommunityChat from "./CommunityChat";
import MembersSidebar from "./MembersSidebar";

const CommunityApp = () => {
  const { channelId } = useParams();

  return (
    <div className="h-full flex">
      <CommunityChat channelId={channelId} />
      <MembersSidebar />
    </div>
  );
};

export default CommunityApp;
