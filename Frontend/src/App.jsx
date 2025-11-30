import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Following from "./pages/Following";
import ErrorPage from "./pages/ErrorPage";
import Search from "./pages/Search";
import Channel from "./pages/Channel";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
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
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Stream from "./pages/Stream";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <Navbar open={menuOpen} setOpen={setMenuOpen} />
      <div className="md:hidden px-3 mt-20">
        <SearchBar />
      </div>
      <div
        className={`pt-2 md:pt-[9.2vh] w-full h-full mix-grade2 backdrop-blur-2xl ${
          menuOpen ? "md:pl-48" : "md:pl-48"
        } pl-3`}
      >
        <Routes>
          <Route index element={<Home />} /> {/*Done*/}
          <Route path="/following" element={<Following />} /> {/*Not Done*/}
          <Route path="/search" element={<Search />} /> {/*Done*/}
          <Route path="/channel/:id" element={<Channel />}>
            <Route index element={<ChannelHome />} /> {/*Done*/}
            <Route path="about" element={<ChannelAbout />} /> {/*Not Done*/}
            <Route path="videos" element={<ChannelVideos />} /> {/*Done*/}
          </Route>
          {/*Done*/}
          <Route path="/stream" element={<Stream />}>
            <Route index element={<StartStream />} /> {/*Done*/}
            <Route path="preview" element={<StreamPreview />} /> {/*Done*/}
            <Route path="dashboard" element={<Dashboard />} /> {/*Done*/}
          </Route>
          <Route path="/profile" element={<Profile />} /> {/*Not Done*/}
          <Route path="/setting" element={<Settings />} /> {/*Not Done*/}
          <Route path="/stream/:streamId" element={<WatchStream />} />
          {/*Done*/}
          <Route path="/directory/:name" element={<Directory />} /> {/*Done*/}
          <Route path="/directory/tag/:category" element={<Category />}>
            <Route index element={<CategoryChannels />} /> {/*Not Done*/}
            <Route path="all" element={<CategoryVideos />} /> {/*Not Done*/}
          </Route>
          {/*Need to add videos*/}
          <Route path="/auth" element={<AuthPage />}>
            <Route index element={<Login />} />
            <Route path="sign-up" element={<Register />} />
            <Route path="verify-otp" element={<OtpVerify />} />
          </Route>
          {/*Done*/}
          <Route path="/edit-profile" element={<EditProfile />} />
          {/*Not Done*/}
          <Route path="/library" element={<Library />} /> {/*Not Done*/}
          <Route path="*" element={<ErrorPage />} /> {/*Done*/}
        </Routes>
      </div>
    </div>
  );
};

export default App;


// video-js vjs-default-skin aspect-video vjs-fluid vjs_video_3-dimensions vjs-controls-enabled vjs-workinghover vjs-v8 vjs-playing vjs-has-started vjs-user-inactive vjs-layout-medium