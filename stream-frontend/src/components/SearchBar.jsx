import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
import {
  searchVideoInTitle,
  searchVideoInDesc,
  searchByUserName,
  autocomplete,
} from "../api/streams.api";
import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // Debounced setter
  const handleChange = debounce((value) => {
    setTerm(value);
  }, 300);

  // Query (runs only when term exists)
  const { data, isLoading } = useQuery({
    queryKey: ["search-suggestions", term],
    queryFn: async () => {
      // const [titleRes, descRes, channelRes, autoRes] = await Promise.all([
      //   // searchVideoInTitle(term),
      //   // searchVideoInDesc(term),
      //   // searchByUserName(term),
      return (await autocomplete(term)).data;
      // ]);
      // return {
      //   // title: titleRes.data,
      //   // desc: descRes.data,
      //   // channels: channelRes.data,
      //   auto: autoRes.data
      // };
    },
    enabled: term.length > 1,
    staleTime: 5000,
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const goToSearchPage = () => {
    navigate(`/search?term=${term}`);
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      <div className="flex items-center hover-theme rounded-md h-10 justify-between">
        <div className="flex gap-2 items-center w-full">
          <CiSearch size={25} className="ml-3 opacity-60" />
          <input
            type="text"
            className="text-lg outline-0 opacity-65 w-full"
            placeholder="Search"
            onChange={(e) => {
              handleChange(e.target.value);
              setOpen(true);
            }}
            onKeyDown={(e) => e.key === "Enter" && goToSearchPage()}
            required
          />
        </div>

        <button
          onClick={goToSearchPage}
          className="mr-1 bg-gray-700 px-3 py-1 rounded-sm"
        >
          Search
        </button>
      </div>

      {/* Dropdown */}
      {open && term.length > 1 && (
        <div className="absolute hover-theme border border-[#b994ff] w-full rounded-lg mt-2 p-3 text-white z-50 max-h-96 overflow-y-auto shadow-lg">
          {isLoading ? (
            <p className="text-gray-400">Searching...</p>
          ) : (
            <>
              {/* Channels */}
              {/* {data?.channels?.content.length > 0 && (
                <div className="mb-2">
                  <p className="font-semibold text-grade">Channels</p>
                  {data.channels?.content.map((u) => (
                    <div
                      key={u.id}
                      className="p-2 hover:text-gray-900 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => navigate(`/profile/${u.id}`)}
                    >
                      {u.name}
                    </div>
                  ))}
                </div>
              )} */}

              {/* Titles */}
              {data?.content.length > 0 && (
                <div className="mb-2">
                  <p className="font-semibold text-grade">Titles</p>
                  {data.content.map((v) => (
                    <div
                      key={v.id}
                      className="p-2 hover:text-gray-900 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => navigate(`/stream/${v.id}`)}
                    >
                      {v.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Descriptions */}
              {/* {data?.desc?.content.length > 0 && (
                <div>
                  <p className="font-semibold text-grade">Description</p>
                  {data.desc?.content.map((d) => (
                    <div
                      key={d.id}
                      className="p-2 hover:text-gray-900 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => navigate(`/watch/${d.id}`)}
                    >
                      {d.description.substring(0, 80)}...
                    </div>
                  ))}
                </div>
              )} */}

              {/* No results */}
              {
                // data?.channels?.length === 0 &&
                data?.content?.length === 0 && (
                  // data?.desc?.length === 0 &&
                  <p className="text-white">No results found.</p>
                )
              }

              {/* Go to search page */}
              <button
                className="w-full mt-2 bg-gray-700 p-2 rounded text-white"
                // onClick={goToSearchPage}
              >
                Search “{term}”
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
