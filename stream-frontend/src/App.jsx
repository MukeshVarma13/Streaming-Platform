import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Following from "./pages/Following";
import ErrorPage from "./pages/ErrorPage";
import Search from "./pages/Search";
import Channel from "./pages/Channel";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import Directory from "./pages/Directory";
import WatchStream from "./pages/WatchStream";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ChannelHome from "./components/ChannelHome";
import ChannelAbout from "./components/ChannelAbout";
import ChannelVideos from "./components/ChannelVideos";
import Category from "./pages/Category";
import CategoryChannels from "./components/CategoryChannels";
import CategoryVideos from "./components/CategoryVideos";
import AuthPage from "./pages/AuthPage";
import Login from "./components/Login";
import Register from "./components/Register";
import OtpVerify from "./components/OtpVerify";
import StartStream from "./pages/SartStream";
import StreamPreview from "./pages/StreamPreview";
import { useContext, useState } from "react";
import SearchBar from "./components/SearchBar";
import Stream from "./pages/Stream";
import CommunityApp from "./components/community/CommunityApp";
import VoiceChannelStage from "./components/community/VoiceChannelStage";
import CreateServerModal from "./components/community/modals/CreateServerModal";
import CreateChannelModal from "./components/community/modals/CreateChannelModal";
import VoicePanel from "./components/community/modals/VoicePanel";
import { UserContext } from "./context/UserDetailsContext";
import JoinServer from "./components/JoinServer";
import CompleteProfile from "./pages/CompleteProfile";
import EditProfile from "./components/EditProfile";
import Followers from "./pages/Followers";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showVoicePanel, setShowVoicePanel] = useState(false);
  const [isInVoice, setIsInVoice] = useState(false);
  const [serverNameInput, setServerNameInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("gaming");
  const {
    showCreateChannelModal,
    setShowCreateChannelModal,
    channelType,
    setChannelType,
    showCreateServerModal,
    setShowCreateServerModal,
    invite,
  } = useContext(UserContext);

  return (
    <div className="h-screen bg-transparent">
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <Navbar open={menuOpen} setOpen={setMenuOpen} />
      <div className="md:hidden px-3 mt-20">
        <SearchBar />
      </div>
      {showCreateServerModal && (
        <CreateServerModal
          showCreateServerModal={showCreateServerModal}
          setShowCreateServerModal={setShowCreateServerModal}
          serverNameInput={serverNameInput}
          setServerNameInput={setServerNameInput}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          // createServer={createServer}
        />
      )}

      {invite && <JoinServer />}
      {showCreateChannelModal && (
        <CreateChannelModal
          showCreateChannelModal={showCreateChannelModal}
          setShowCreateChannelModal={setShowCreateChannelModal}
          channelType={channelType}
          setChannelType={setChannelType}
        />
      )}

      {showVoicePanel && (
        <VoicePanel
          showVoicePanel={showVoicePanel}
          // currentChannel={currentChannel}
          // leaveVoice={leaveVoice}
        />
      )}
      <div
        className={`pt-2 md:pt-[9.2vh] w-full h-full mix-grade2 backdrop-blur-2xl ${
          menuOpen ? "md:pl-56" : "md:pl-56"
        } pl-3`}
      >
        <Routes>
          <Route index element={<Home />} />
          <Route path="/following" element={<Following />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/search" element={<Search />} />
          <Route path="/channel/:id" element={<Channel />}>
            <Route index element={<ChannelHome />} />
            <Route path="about" element={<ChannelAbout />} />
            <Route path="videos" element={<ChannelVideos />} />
          </Route>
          <Route
            path="/community/channel/:channelId"
            element={<CommunityApp />}
          />
          <Route path="/community/voice/:id" element={<VoiceChannelStage />} />
          <Route path="/stream" element={<Stream />}>
            <Route index element={<StartStream />} />
            <Route path="preview" element={<StreamPreview />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/setting" element={<Settings />} />
          <Route path="/stream/:streamId" element={<WatchStream />} />
          <Route path="/directory/:name" element={<Directory />} />
          <Route path="/directory/tag/:category" element={<Category />}>
            <Route index element={<CategoryChannels />} />
            <Route path="all" element={<CategoryVideos />} />
          </Route>
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/auth" element={<AuthPage />}>
            <Route index element={<Login />} />
            <Route path="sign-up" element={<Register />} />
            <Route path="verify-otp" element={<OtpVerify />} />
          </Route>
          <Route path="/auth/complete-profile" element={<CompleteProfile />} />
          <Route path="/library" element={<Library />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
