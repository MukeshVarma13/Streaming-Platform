import { useState, useEffect } from "react";
import {
  Plus,
  Upload,
  RefreshCw,
  X,
  Copy,
  AlertCircle,
  Image,
} from "lucide-react";
import { data, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { generateKey, startStream } from "../api/streams.api";

export default function StartStream() {
  // --- Form Data State ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [category, setCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  // --- UI/Helper State ---
  const [streamKey, setStreamKey] = useState("");
  const [isKeyLoading, setIsKeyLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData) => startStream(formData),
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      navigate("preview", { state: data.data });
    },
    onError: (err) => {
      console.error(err);
      alert("Failed to start stream!");
    },
  });

  // --- 1. Handle Thumbnail Upload & Preview ---
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
      setThumbnailPreview(null);
    }
  };

  // Clean up Object URL on unmount
  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  // --- 2. Generate Stream Key (API example) ---
  const generateStreamKey = async () => {
    setIsKeyLoading(true);
    // setError(null);
    try {
      const key = await generateKey().then((res) => res.data);
      setStreamKey(key);
    } catch (err) {
      console.error("Error generating key:", err);
      setError("Could not generate stream key.");
    } finally {
      setIsKeyLoading(false);
    }
  };

  // --- 3. Copy Stream Key ---
  const copyStreamKey = () => {
    navigator.clipboard.writeText(streamKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000); // Reset after 2s
  };

  // --- 4. Tag Management ---
  const addTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (i) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  // --- 5. Main Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !thumbnail) {
      alert("Please fill out Title, Category, and Thumbnail.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to start a stream.");
      return;
    }

    const streamDetails = {
      title: title,
      description: description,
      streamKey: streamKey,
      categories: category,
      tags: tags,
    };

    const formData = new FormData();
    formData.append(
      "details",
      new Blob([JSON.stringify(streamDetails)], { type: "application/json" })
    );
    formData.append("thumbnail", thumbnail);
    mutate(formData);
  };

  // --- Reusable Input Styling ---
  const inputBaseStyle =
    "w-full p-3 bg-[#0E0E10] text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
  const labelBaseStyle = "block text-sm font-medium text-white mb-2";

  return (
    <div className="w-full flex justify-center py-10 px-4 h-fit text-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-theme rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-grade">
          Start Your Stream
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* --- Main Content (Left Column) --- */}
          <div className="md:col-span-2 space-y-6">
            {/* Error Display */}
            {error && (
              <div className="w-full p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg flex items-center gap-2">
                <AlertCircle size={18} />
                <span>{error.response?.data || "Something went wrong"}</span>
              </div>
            )}

            {/* Stream Title */}
            <div>
              <label htmlFor="stream-title" className={labelBaseStyle}>
                Stream Title *
              </label>
              <input
                id="stream-title"
                type="text"
                placeholder="Enter your stream title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputBaseStyle}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="stream-description" className={labelBaseStyle}>
                Description
              </label>
              <textarea
                id="stream-description"
                className={`${inputBaseStyle} min-h-[100px] resize-none`}
                rows="4"
                placeholder="Short summary about your stream..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Category Selection */}
            <div>
              <label htmlFor="stream-category" className={labelBaseStyle}>
                Category *
              </label>
              <select
                id="stream-category"
                className={inputBaseStyle}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                <option value="Gaming">Gaming</option>
                <option value="IRL">IRL</option>
                <option value="Music">Music</option>
                <option value="Coding">Coding</option>
                <option value="Podcast">Podcast</option>
              </select>
            </div>

            {/* Tags Input */}
            <div>
              <label htmlFor="stream-tags" className={labelBaseStyle}>
                Tags
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="stream-tags"
                  type="text"
                  placeholder="Add a tag and press Enter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeydown}
                  className={inputBaseStyle}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-3 body-theme text-white rounded-lg hover:bg-indigo-700"
                >
                  <Plus size={20} />
                </button>
              </div>
              {/* Tags Display */}
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full flex items-center gap-2 text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-gray-500 hover:text-black"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- Sidebar (Right Column) --- */}
          <div className="md:col-span-1 space-y-6">
            {/* Thumbnail */}
            <div>
              <label className={labelBaseStyle}>Thumbnail *</label>
              {thumbnailPreview ? (
                // --- Thumbnail Preview ---
                <div className="relative group">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-full h-auto aspect-video rounded-lg object-cover shadow-md"
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                // --- Thumbnail Upload Box ---
                <label
                  htmlFor="thumbnail-upload"
                  className="w-full h-auto aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                  <Image size={48} className="mb-2" />
                  <span className="font-medium">Upload Thumbnail</span>
                  <span className="text-sm">Click to browse</span>
                </label>
              )}
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnail}
              />
            </div>

            {/* Generate Stream Key */}
            <div>
              <label htmlFor="stream-key" className={labelBaseStyle}>
                Stream Key
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="stream-key"
                  value={streamKey}
                  readOnly
                  placeholder="Generate a key..."
                  className="flex-1 p-3 border rounded-lg bg-gray-100 text-black outline-none"
                />
                <button
                  type="button"
                  onClick={generateStreamKey}
                  disabled={isKeyLoading}
                  className="p-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                  {isKeyLoading ? (
                    <RefreshCw size={20} className="animate-spin" />
                  ) : (
                    <RefreshCw size={20} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={copyStreamKey}
                  disabled={!streamKey}
                  className="p-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                  {copiedKey ? (
                    <span className="text-xs">Copied!</span>
                  ) : (
                    <Copy size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit / Start Stream */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 body-theme text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? "Starting Stream..." : "Start Stream"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
