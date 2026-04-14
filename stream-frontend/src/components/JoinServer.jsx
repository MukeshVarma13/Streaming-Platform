import { useContext, useState } from "react";
import { Compass } from "lucide-react";
import { UserContext } from "../context/UserDetailsContext";
import { joinCommunity } from "../api/community";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../api/axios";

const JoinServer = () => {
  const [inviteLink, setInviteLink] = useState("");
  const { invite, setInvite } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (channelId) => joinCommunity(channelId),
    onSuccess: (data) => {
      // console.log(data);
      setInvite(false);
      queryClient.invalidateQueries({ queryKey: ["community-details"] });
    },
    onError: (err) => {
      console.error(err.message);
      alert("Failed to join community");
    },
  });

  const handleJoin = (e) => {
    e.preventDefault();
    if (inviteLink.trim()) {
      if (!inviteLink.includes("/join/")) {
        alert("Invalid link");
        return;
      }
      const communityId = inviteLink.split("/join/");
      mutate(communityId[1]);
    }
  };

  return (
    <div className="w-full fixed inset-0 grid place-items-center h-fit top-1/4 z-10 mx-auto max-w-[440px] bg-theme text-white rounded-lg shadow-xl overflow-hidden p-4 md:p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Join a Server</h1>
        <p className="text-[#B5BAC1] text-[14px]">
          Enter an invite below to join an existing server
        </p>
      </div>

      <form onSubmit={handleJoin}>
        <label className="block text-xs font-bold text-[#B5BAC1] uppercase mb-2 tracking-wider">
          Invite Link <span className="text-[#F23F42] ml-0.5">*</span>
        </label>
        <input
          type="text"
          value={inviteLink}
          onChange={(e) => setInviteLink(e.target.value)}
          placeholder={`${baseURL}/234`}
          className="w-full hover-theme text-[#DBDEE1] p-3 rounded-[3px] outline-none focus:ring-0 mb-4 transition-all selection:bg-[#35373C]"
          required
        />
        <div className="mb-8">
          <h4 className="text-xs font-bold text-[#B5BAC1] uppercase mb-2 tracking-wider">
            Invites should look like
          </h4>
          <ul className="text-sm space-y-1 text-[#DBDEE1]">
            <li className="cursor-pointer hover:underline underline-offset-2">
              h7K9X2m
            </li>
            <li className="cursor-pointer hover:underline underline-offset-2">
              {baseURL}/2
            </li>
            <li className="cursor-pointer hover:underline underline-offset-2">
              {baseURL}/misfits
            </li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#2B2D31] -mx-8 -mb-8 p-4 md:p-6 mt-4">
          <button
            onClick={() => setInvite(false)}
            type="button"
            className="block text-sm text-white font-medium hover:underline px-4 py-2"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full md:w-auto body-theme hover:bg-[#4752C4] text-white px-8 py-3 rounded-[3px] font-medium transition-colors duration-200"
          >
            Join Server
          </button>
        </div>
      </form>
      <div className="mt-12 flex flex-col items-center">
        <h3 className="text-sm font-bold text-white mb-2">
          Don't have an invite?
        </h3>
        <button className="flex items-center gap-2 bg-[#4E5058] hover:bg-[#6D6F78] transition-colors px-4 py-2 rounded-md w-full justify-center">
          <Compass size={20} className="text-[#23A559]" />
          <span className="text-sm font-medium text-white">
            Check out Public Servers
          </span>
        </button>
      </div>
    </div>
  );
};

export default JoinServer;
