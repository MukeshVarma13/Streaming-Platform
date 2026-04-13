import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Camera, X, Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "../api/auth.api";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedRecommendations, setSelectedRecommendations] = useState([]);

  const categories = [
    "Gaming",
    "Music",
    "Technology",
    "Sports",
    "Movies & TV",
    "Art & Design",
    "Science",
    "Travel",
    "Food & Cooking",
    "Fitness & Health",
    "Books",
    "Finance",
    "Photography",
    "Anime",
  ];

  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData) => completeProfile(formData),
    onSuccess: (data) => {
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
      alert("Failed to upload profile!");
    },
  });

  const recommendations = [
    {
      id: 1,
      name: "Valorant India",
      initial: "VI",
      members: "142k",
      color: "from-red-500 to-pink-500",
    },
    {
      id: 2,
      name: "Tech Talk Hub",
      initial: "TT",
      members: "89k",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      name: "Bollywood Vibes",
      initial: "BV",
      members: "67k",
      color: "from-purple-500 to-violet-500",
    },
    {
      id: 4,
      name: "Crypto & Web3",
      initial: "CW",
      members: "54k",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const toggleRecommendation = (id) => {
    if (selectedRecommendations.includes(id)) {
      setSelectedRecommendations(
        selectedRecommendations.filter((rid) => rid !== id),
      );
    } else {
      setSelectedRecommendations([...selectedRecommendations, id]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 2 * 1024 * 1024) {
      setProfileImage(file);
    }
  };

  const removeImage = () => {
    if (profileImage) URL.revokeObjectURL(profileImage);
    setProfileImage(null);
  };

  const handleContinue = () => {
    // const profileData = {
    //   profileImage,
    //   interests: selectedInterests,
    //   joinedRecommendations: selectedRecommendations,
    // };
    // localStorage.setItem("userProfile", JSON.stringify(profileData));
    // console.log(profileData);
    const formData = new FormData();
    formData.append("profile", profileImage);
    mutate(formData);
  };

  return (
    <div className="bg-[#202225] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#292b2f] rounded-3xl shadow-2xl p-8 text-white">
        {/* Header - more casual */}
        <h2 className="text-white text-3xl font-bold mb-1 tracking-wide text-center">
          Almost there!
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Just a few quick things so we can show you the good stuff
        </p>

        {/* Profile Picture - kept simple & friendly */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-[#36393e] border-4 border-[#42444a] flex items-center justify-center overflow-hidden shadow-inner">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}  
                  alt="Your profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl text-gray-400">👤</div>
              )}
            </div>

            <label className="absolute bottom-1 right-1 bg-[#FF2164] hover:bg-[#ff4d7f] text-white w-9 h-9 rounded-2xl flex items-center justify-center cursor-pointer shadow-lg transition-all active:scale-95">
              <Camera className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {profileImage && (
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-[#36393e] hover:bg-red-500 text-white w-6 h-6 rounded-xl flex items-center justify-center shadow-md transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Drop a profile pic (optional)
          </p>
        </div>

        {/* Interests - now as nice selectable boxes */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">What are you into?</h3>
            <span className="text-xs bg-[#36393e] px-3 py-1 rounded-2xl text-gray-400">
              {selectedInterests.length} selected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((category) => {
              const isSelected = selectedInterests.includes(category);
              return (
                <div
                  key={category}
                  onClick={() => toggleInterest(category)}
                  className={`group relative border-2 rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-[#FF2164] bg-[#FF2164]/10"
                      : "border-[#42444a] hover:border-[#FF2164]/60 bg-[#36393e]"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-[#FF2164] text-white rounded-full w-5 h-5 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  <p className="font-medium text-sm mt-1">{category}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* <div className="mb-10">
          <h3 className="text-lg font-semibold mb-1">
            We think you'd like these
          </h3>
          <p className="text-gray-400 text-sm mb-5">
            Tap to join any that sound fun
          </p>

          <div className="space-y-3">
            {recommendations.map((rec) => {
              const isJoined = selectedRecommendations.includes(rec.id);
              return (
                <div
                  key={rec.id}
                  className="flex items-center justify-between bg-[#36393e] hover:bg-[#42444a] transition-colors rounded-2xl p-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${rec.color} flex items-center justify-center text-white font-bold text-xl shadow-inner`}
                    >
                      {rec.initial}
                    </div>
                    <div>
                      <div className="font-semibold">{rec.name}</div>
                      <div className="text-xs text-gray-400">
                        {rec.members} members
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleRecommendation(rec.id)}
                    className={`px-7 py-2 text-sm font-semibold rounded-2xl transition-all ${
                      isJoined
                        ? "bg-emerald-500 text-white"
                        : "bg-[#FF2164] hover:bg-[#ff4d7f] text-white"
                    }`}
                  >
                    {isJoined ? "Joined ✓" : "Join"}
                  </button>
                </div>
              );
            })}
          </div>
        </div> */}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex-1 border border-gray-500 text-gray-400 hover:border-white hover:text-white py-4 rounded-2xl font-semibold transition-all"
          >
            Skip for now
          </button>

          <button
            onClick={handleContinue}
            className="flex-1 bg-[#FF2164] hover:bg-[#ff4d7f] py-4 rounded-2xl font-semibold transition-all active:scale-95 shadow-lg"
          >
            SAVE & CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
