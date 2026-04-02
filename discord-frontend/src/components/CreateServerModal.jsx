import React, { useState } from 'react';
import { X, Gamepad2, Mic, Users, MonitorPlay, Plus } from 'lucide-react';

export default function CreateServerModal({ onClose, onCreate }) {
  const [step, setStep] = useState(1);
  const [serverName, setServerName] = useState('');

  const templates = [
    { id: 'gaming', name: 'Gaming', icon: <Gamepad2 /> },
    { id: 'school', name: 'School Club', icon: <Users /> },
    { id: 'podcast', name: 'Podcast / Studio', icon: <Mic /> },
    { id: 'chilling', name: 'Friends Chilling', icon: <MonitorPlay /> }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 w-[440px] rounded-md shadow-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-2">Create a server</h2>
            <p className="text-center text-gray-500 mb-6">Your server is where you and your friends hang out. Make yours and start talking.</p>
            
            <div className="space-y-2">
              <button 
                onClick={() => setStep(2)}
                className="w-full flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 font-bold"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-500 text-white p-2 rounded-full"><Plus size={20} /></div>
                  Create My Own
                </div>
              </button>
              
              <div className="text-xs font-bold text-gray-500 uppercase mt-4 mb-2">Start from a template</div>
              
              {templates.map(t => (
                <button 
                  key={t.id}
                  onClick={() => setStep(2)}
                  className="w-full flex items-center gap-3 p-4 border rounded-md hover:bg-gray-50 font-semibold"
                >
                  {t.icon} {t.name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-2">Customize your server</h2>
            <p className="text-center text-gray-500 mb-6">Give your new server a personality with a name.</p>
            
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Server Name</label>
              <input 
                type="text" 
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                className="w-full p-2 bg-gray-100 border-none rounded focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="My Awesome Server"
              />
            </div>

            <div className="flex justify-between items-center mt-8">
              <button onClick={() => setStep(1)} className="text-sm font-semibold hover:underline">Back</button>
              <button 
                onClick={() => onCreate({ name: serverName || 'New Server' })}
                className="bg-indigo-500 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-600"
              >
                Create
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}