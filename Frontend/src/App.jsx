import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Following from "./pages/Following";
import ErrorPage from "./pages/ErrorPage";
import Search from "./pages/Search";
import Channel from "./pages/Channel";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import Library from "./pages/Library";
import LoginRegister from "./pages/LoginRegister";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Trendding from "./pages/Trending";
import WatchStream from "./pages/WatchStream";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="pt-[9.2vh] pl-48 mix-grade2 backdrop-blur-2xl w-full h-full">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/following" element={<Following />} />
          <Route path="/search" element={<Search />} />
          <Route path="/channel" element={<Channel />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/stream/:streamId" element={<WatchStream />} />
          <Route path="/directory/:name" element={<Trendding />} />
          <Route path="login-register" element={<LoginRegister />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/library" element={<Library />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
