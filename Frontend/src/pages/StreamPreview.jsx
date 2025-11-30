import { useState, useEffect } from "react";
import { Copy, CheckCircle, ArrowRight, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import VideoComponent from "../components/VideoComponent";
import { baseURL, streamURL } from "../config/AxiosHelper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { goLive, streamStatus } from "../api/streams.api";

export default function StreamPreview() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const streamData = location.state;
  const streamId = streamData?.streamId;

  // Query OBS / stream status (poll every 3s)
  const {
    data: obsConnected,
    isFetched,
    isFetching,
    refetch: refetchObsStatus,
  } = useQuery({
    queryKey: ["live-stream-status", streamId],
    enabled: !!streamId,
    queryFn: () => streamStatus(streamId).then((res) => res.data),
    refetchInterval: 5000,
  });

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (streamKey) => goLive(streamKey),
    onSuccess: (data) => {
      navigate("../dashboard", { state: data.data });
    },
    onError: (err) => {
      console.error("goLive failed:", err);
      alert("Failed to start stream on server. See console for details.");
    },
  });

  // copy stream key
  const copyKey = () => {
    if (!streamData?.streamKey) return;
    navigator.clipboard.writeText(streamData.streamKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (obsConnected === true && !isPending && !isSuccess) {
      mutate(streamData.streamKey);
    }
  }, [obsConnected]);

  // safety UI if no streamData
  if (!streamData) {
    return (
      <div className="text-white flex items-center justify-center p-6 mt-20">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No stream data provided</h2>
          <p className="text-gray-400 mt-2">
            Please start a stream first — redirecting back...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white flex items-center justify-center p-6 mt-20">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Stream Setup</h1>
            <p className="text-gray-400">
              Your stream <strong>"{streamData?.title}"</strong> is created.
              Configure your software (OBS) to go live.
            </p>
          </div>

          <div className="bg-theme rounded-xl p-6 border border-gray-700 shadow-lg">
            <h3 className="flex items-center gap-2 font-semibold text-grade mb-4">
              <Settings size={20} /> Connection Details
            </h3>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Server URL
              </label>
              <div className="hover-theme p-3 rounded-lg text-gray-300 font-mono text-sm truncate">
                {/* TODO: use real value from backend if available */}
                rtmp://localhost:1935/live
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Stream Key
              </label>
              <div className="flex gap-2">
                <div className="flex-1 hover-theme p-3 rounded-lg text-white font-mono text-sm truncate tracking-widest">
                  {streamData?.streamKey}
                </div>
                <button
                  onClick={copyKey}
                  className="body-theme hover:bg-indigo-700 px-4 rounded-lg flex items-center justify-center transition"
                >
                  {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Paste this into OBS &gt; Settings &gt; Stream &gt; Stream Key
              </p>
            </div>
          </div>

          <div className="hover-theme border border-[#b994ff] p-4 rounded-lg">
            <h4 className="font-bold text-grade mb-2">Next Steps:</h4>
            <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
              <li>Open OBS Studio or Streamlabs.</li>
              <li>
                Paste the <strong>Stream Key</strong> above into settings.
              </li>
              <li>Click "Start Streaming" in OBS.</li>
              <li>Once OBS connects, you will be redirected to "Dashboard".</li>
            </ol>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="text-xl font-bold mb-4">Ready to Go Live</h2>

          <div className="h-64 bg-theme border border-gray-700 rounded-xl flex items-center justify-center text-gray-500 mb-6 overflow-hidden">
            {!obsConnected ? (
              <div className="text-center">
                <div className="mb-2">Waiting for OBS signal...</div>
                <div className="text-xs text-gray-400">Checking...</div>
              </div>
            ) : (
              <VideoComponent
                videoURL={streamURL + streamData?.url}
                control={false}
              />
            )}
          </div>

          <button
            onClick={() => refetchObsStatus?.()} // manual re-check
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            {isFetching ? "Checking OBS..." : "Check OBS connection"}
            <ArrowRight />
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Once OBS connects, the server will mark the stream live and you'll
            be redirected to the dashboard automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
