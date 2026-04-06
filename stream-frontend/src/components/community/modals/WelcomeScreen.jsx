import React from 'react';

const WelcomeScreen = ({ serverName = "✨ 𓍼 VΔŇIŞĦ€Ř KIŘΔ 𓍼 ✨" }) => {
  const steps = [
    { icon: "🎉", text: "Invite your friends", color: "bg-indigo-500" },
    { icon: "🎨", text: "Personalize your server with an icon", color: "bg-emerald-500" },
    { icon: "✉️", text: "Send your first message", color: "bg-sky-500" },
    { icon: "🎮", text: "Add your first app", color: "bg-violet-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-[#36393e] px-6 text-center select-none">
      {/* Header Section */}
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome to
        </h1>
        <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
          {serverName}'s
        </h2>
        <h3 className="text-3xl font-bold text-white mb-6">
          server
        </h3>
        
        <p className="text-[#b9bbbe] text-base leading-relaxed">
          This is your brand new, shiny server. Here are some steps to help 
          you get started. For more, check out our 
          <span className="text-[#00aff4] hover:underline cursor-pointer ml-1">
            Getting Started guide
          </span>.
        </p>
      </div>

      {/* Action Steps */}
      <div className="w-full max-w-md space-y-2">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="group flex items-center justify-between p-4 bg-[#2f3136] hover:bg-[#393c43] rounded-md cursor-pointer transition-all duration-150 border border-transparent hover:border-[#4f545c]"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 ${step.color} rounded-full flex items-center justify-center text-xl shadow-lg`}>
                {step.icon}
              </div>
              <span className="text-white font-medium text-sm group-hover:text-gray-100">
                {step.text}
              </span>
            </div>
            <i className="fa-solid fa-chevron-right text-[#b9bbbe] text-xs group-hover:text-white transition-transform group-hover:translate-x-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;