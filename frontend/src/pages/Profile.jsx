// import React from "react";

// const Profile = () => {
//   return <div>Profile</div>;
// };

// export default Profile;
import React, { useState } from 'react';

// Use a palette matching the image's dark theme and accent colors.
const colors = {
  bg: 'bg-zinc-950', // very dark background
  card: 'bg-zinc-900', // slightly lighter for elements
  border: 'border-zinc-700', // for dividers
  primary: 'text-zinc-100', // light text
  secondary: 'text-zinc-400', // faded text
  accent: 'text-cyan-300', // turquoise/cyan from the image
  btn: 'bg-cyan-400', // button color
};

// -- Group-Creation Components for each State --

const HeaderAndCreateGroupName = ({ onNext }) => (
  <div className="space-y-10">
    {/* Page Header and Description */}
    <div className="flex items-center space-x-3">
      <div className="p-3 rounded-full border border-dashed border-zinc-700">
        <span className={`${colors.accent} text-2xl`}>+</span>
      </div>
      <div>
        <h1 className={`${colors.primary} text-4xl font-semibold`}>Create group</h1>
        <p className={`${colors.secondary} text-sm mt-3 leading-relaxed max-w-lg`}>
          When creating a group, each creator follows the same steps concerning the name of a group,
          its design, description, addition of a payment account, and subscription plan for the group.
        </p>
      </div>
    </div>

    {/* The main creation card for naming the group */}
    <div className={`${colors.card} rounded-3xl p-10 border ${colors.border}`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className={`${colors.primary} text-xl font-medium`}>New Group</h2>
        {/* Placeholder icons for navigation on the left */}
        <div className="flex space-x-2 text-zinc-600">
          <span>O</span> <span>O</span>
        </div>
      </div>
      
      <div className="text-center py-20 space-y-6">
        <h3 className={`${colors.primary} text-4xl font-bold`}>Let's come up with a name</h3>
        <p className={`${colors.secondary} text-base max-w-sm mx-auto`}>
          Publish content and connect with your community.
        </p>
        
        <input 
          type="text" 
          placeholder="Name of your Group" 
          className={`w-full max-w-sm ${colors.bg} rounded-full py-4 px-6 text-zinc-100 placeholder:text-zinc-500`}
        />
        
        <button 
          onClick={onNext}
          className={`${colors.btn} text-zinc-950 font-bold rounded-full py-4 px-12 transition hover:opacity-90`}
        >
          Create a group
        </button>
      </div>
    </div>
  </div>
);

const InitializeGroup = ({ onNext }) => (
  <div className={`${colors.card} rounded-3xl p-10 border ${colors.border}`}>
    <div className="text-center space-y-8 py-10 max-w-xl mx-auto">
      {/* The large hand icon */}
      <div className="text-6xl">👋</div>
      <h3 className={`${colors.primary} text-4xl font-bold`}>Welcome to <span className={colors.accent}>My first group</span></h3>
      <p className={`${colors.secondary} text-base`}>
        You've created your new group, start customized step-by-step
      </p>
      
      {/* Setup Steps Checklist */}
      <div className={`${colors.bg} rounded-2xl p-6 text-left space-y-4`}>
        {[
          { icon: 'O', text: 'Create a Payment Account' },
          { icon: 'O', text: 'Add Membership Plans' },
          { icon: 'O', text: 'Design Your Group' },
        ].map((step, idx) => (
          <div key={idx} className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center text-zinc-700">O</div>
            <p className={`${colors.primary}`}>{step.text}</p>
          </div>
        ))}
      </div>
      
      <button 
        onClick={onNext}
        className={`${colors.btn} text-zinc-950 font-bold rounded-full py-4 px-12 transition hover:opacity-90`}
      >
        Set Up Settings
      </button>
    </div>
  </div>
);

const GroupSettings = ({ onNext }) => (
  <div className={`${colors.card} rounded-3xl p-10 border ${colors.border}`}>
    <div className="flex space-x-10">
      {/* Left Sidebar for Settings Navigation */}
      <div className="w-1/3 space-y-5">
        <h4 className={`${colors.secondary} uppercase text-sm`}>Admin tools</h4>
        <nav className="space-y-2">
          {['Dashboard', 'Group Settings', 'Member Profile', 'Subscription Plans'].map((item, idx) => (
            <button 
              key={item}
              className={`block w-full text-left p-3 rounded-lg ${idx === 1 ? 'bg-zinc-800 text-cyan-300' : 'text-zinc-400 hover:text-white'}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Right Column with Form */}
      <div className="w-2/3 space-y-8">
        <h3 className={`${colors.primary} text-2xl font-bold`}>Group information</h3>
        
        <div className="space-y-5">
          {[
            { label: 'Group name', value: 'Cool Group' },
            { label: 'Group Type', value: 'Everything about learning' },
            { label: 'Short description', value: 'Cool Group description' },
          ].map((field, idx) => (
            <div key={idx}>
              <label className={`${colors.secondary} block mb-1 text-sm`}>{field.label}</label>
              <input 
                type="text" 
                defaultValue={field.value} 
                className={`w-full ${colors.bg} border ${colors.border} rounded-lg py-3 px-4 text-zinc-100`}
              />
            </div>
          ))}
        </div>
        
        <div className="flex space-x-4 pt-4">
          <button 
            onClick={onNext}
            className={`${colors.btn} text-zinc-950 font-bold rounded-lg py-3 px-8 transition hover:opacity-90`}
          >
            Save changes
          </button>
          <button className="text-zinc-400 hover:text-white">Delete Group</button>
        </div>
      </div>
    </div>
  </div>
);

const GroupHomePreview = ({ onNext }) => (
  <div className={`${colors.card} rounded-3xl p-10 border ${colors.border}`}>
    <div className="flex space-x-10">
      {/* Left Navigation again for context */}
      <div className="w-1/3 text-zinc-700">Nav Context (Disabled)</div>

      {/* Right side: Group Profile and Channel Creation info */}
      <div className="w-2/3 space-y-10">
        <div className="flex items-center space-x-6">
          {/* Group Logo Placeholder */}
          <div className="w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-400">P</div>
          <div>
            <h3 className={`${colors.primary} text-3xl font-bold`}>Cool group</h3>
            <p className={`${colors.secondary}`}>Everything about learning</p>
          </div>
          <button onClick={onNext} className={`${colors.btn} text-zinc-950 font-bold rounded-lg py-3 px-8 ml-auto`}>Create Channel</button>
        </div>
        
        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-6">
          <div className={`${colors.bg} p-6 rounded-xl border ${colors.border} space-y-2`}>
            <p className={colors.accent}>About group</p>
            <p className={colors.secondary}>This is a group dedicated to finding and creating educational content.</p>
          </div>
          <div className={`${colors.bg} p-6 rounded-xl border ${colors.border} space-y-2`}>
            <p className={colors.accent}>Create and share!</p>
            <p className={colors.secondary}>You can invite members and create chat channels here.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CreateChannel = () => (
  <div className="space-y-10">
    {/* Page Header and Description */}
    <div className="flex items-center space-x-3">
      <div className="p-3 rounded-full border border-dashed border-zinc-700">
        <span className={`${colors.accent} text-2xl`}>#</span>
      </div>
      <div>
        <h1 className={`${colors.primary} text-4xl font-semibold`}>Create channel</h1>
        <p className={`${colors.secondary} text-sm mt-3 leading-relaxed max-w-lg`}>
          A creator can create channels with different types of content concerning various topics inside each.
          Set up the access permissions and visibility here.
        </p>
      </div>
    </div>

    {/* The main channel-creation card */}
    <div className={`${colors.card} rounded-3xl p-10 border ${colors.border}`}>
      <div className="flex space-x-10">
        {/* Left Side: Mock Channels List */}
        <div className="w-1/3 space-y-4">
          <h4 className={`${colors.secondary} uppercase text-sm`}>Chat Channels</h4>
          {['General', 'Discussions', 'Resources', 'Help'].map(item => (
            <div key={item} className={`flex items-center space-x-3 p-3 rounded-lg ${item === 'Discussions' ? 'bg-zinc-800' : ''}`}>
              <span className="text-xl text-cyan-300">#</span>
              <p className={colors.primary}>{item}</p>
              {item === 'Discussions' && <span className="text-zinc-400 ml-auto">9+</span>}
            </div>
          ))}
        </div>

        {/* Right Column with Form to Add Channel */}
        <div className="w-2/3 space-y-8">
          <h3 className={`${colors.primary} text-2xl font-bold`}>Add New Channel</h3>
          
          <div className="space-y-5">
            <div>
              <label className={`${colors.secondary} block mb-1 text-sm`}>Channel Name</label>
              <input type="text" placeholder="# discussions" className={`w-full ${colors.bg} border ${colors.border} rounded-lg py-3 px-4 text-zinc-100`} />
            </div>
            <div>
              <label className={`${colors.secondary} block mb-1 text-sm`}>Short Description</label>
              <input type="text" placeholder="Discuss any topic..." className={`w-full ${colors.bg} border ${colors.border} rounded-lg py-3 px-4 text-zinc-100`} />
            </div>
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button className={`${colors.btn} text-zinc-950 font-bold rounded-lg py-3 px-8 transition hover:opacity-90`}>Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// -- Main Application Container with Step Logic --

const CreateGroupFlow = () => {
  // Step State: controls which "page" is visible
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Function to move the flow to the next screen
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className={`min-h-screen ${colors.bg} p-10 font-sans`}>
      <main className="max-w-7xl mx-auto space-y-10">
        {/* Step Progress Bar at the top */}
        <div className="flex items-center justify-between py-6">
          <div className="text-cyan-300 text-2xl font-bold">Group Studio</div>
          <div className="flex items-center space-x-3">
            {[1, 2, 3, 4, 5].map(step => (
              <div 
                key={step} 
                className={`w-3 h-3 rounded-full ${step <= currentStep ? 'bg-cyan-400' : 'bg-zinc-700'}`}
              />
            ))}
            <span className={`${colors.secondary} ml-4`}>Step {currentStep} of {totalSteps}</span>
          </div>
        </div>

        {/* Conditionally render the component for the current step */}
        {currentStep === 1 && <HeaderAndCreateGroupName onNext={nextStep} />}
        {currentStep === 2 && <InitializeGroup onNext={nextStep} />}
        {currentStep === 3 && <GroupSettings onNext={nextStep} />}
        {currentStep === 4 && <GroupHomePreview onNext={nextStep} />}
        {currentStep === 5 && <CreateChannel />}
      </main>
    </div>
  );
};

export default CreateGroupFlow;