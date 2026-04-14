import { useContext } from "react";
import { getFollowerList } from "../api/streams.api";
import { UserContext } from "../context/UserDetailsContext";
import { useQuery } from "@tanstack/react-query";
import { List, User } from "lucide-react";
import { baseURL } from "../api/axios";
import { NavLink } from "react-router";
import { MdArrowOutward } from "react-icons/md";

const Followers = () => {
  const { userDetail } = useContext(UserContext);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["followers-list", userDetail],
    queryFn: () => getFollowerList().then((res) => res.data),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full">
      <div className="h-full w-full">
        {data?.length < 0 ? (
          <div className="w-full h-full text-3xl text-center py-4">
            No followers!
          </div>
        ) : (
          <div className="w-full h-full px-14">
            <span className="text-4xl flex items-center gap-2 py-2">
              <List size={34} className="text-grade" />
              Followers
            </span>
            <hr className="opacity-30 py-2" />
            <div className="mb-2">
              {data?.length} <span className="">Followers</span>
            </div>
            <div className="w-full flex gap-3 flex-wrap">
              {data?.map((channel, index) => (
                <div
                  key={index}
                  className="p-2 flex w-fit h-fit flex-col gap-3 items-center hover-theme rounded-xl"
                >
                  <div className="h-36 w-36 rounded-full">
                    {channel.profilePic ? (
                      <img
                        src={baseURL + channel.profilePic}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-full h-full bg-theme rounded-full p-2" />
                    )}
                  </div>
                  <div className="capitalize">
                    <h2 className="px-3 text-xl text-grade">{channel.name}</h2>
                    <span className="flex gap-3 items-center">
                      <NavLink
                        to={`/channel/${channel.id}`}
                        className="px-4 py-1 rounded-2xl bg-theme flex items-center gap-1"
                      >
                        View Channel
                        <MdArrowOutward size={20} />
                      </NavLink>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* <Highlight /> */}
    </div>
  );
};

export default Followers;
