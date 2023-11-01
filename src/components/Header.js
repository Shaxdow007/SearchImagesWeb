import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "-TK89AYWDH86wB3V2NzjHBy-yC5294yPjLfZe6S2qVA";
const Header = () => {
  // get the value of input by usint hook useRef
  const searchInput = useRef(null);
  const IMAGES_PER_PAGE = 1000;
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setErrorMsg("");
        const { data } = await axios.get(
          `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`
        );
        setImages(data.results);
        settotalPages(data.total_pages);
      }
    } catch (error) {
      setErrorMsg("Something Went Wrong Try Again");
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // return page to 1 then display the result
  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };
  // handel submit
  const handelSubmit = (e) => {
    e.preventDefault();
    resetSearch();
  };
  // handel Selection value
  const handelSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };
  return (
    <>
      {/* header with input */}
      <div className="header flex justify-center items-center">
        <div className="w-1/2">
          {/* onsubmit */}
          <form className="w-full" onSubmit={handelSubmit}>
            {errorMsg && (
              <p className="my-3 text-rose-500 text-center font-black">
                {errorMsg}
              </p>
            )}
            <input
              type="text"
              placeholder="Type Something To Search..."
              className="w-full p-4 outline-none rounded-md focus:shadow-lg"
              ref={searchInput}
            />
          </form>
          <div className="mt-5 flex justify-between items-center gap-2">
            <button
              onClick={() => handelSelection("cats")}
              className="bg-violet-600 text-white py-2 px-7 rounded-sm hover:bg-violet-400 hover:ease-in hover:duration-300"
            >
              Cats
            </button>
            <button
              onClick={() => handelSelection("nature")}
              className="bg-violet-600 text-white py-2 px-7 rounded-sm hover:bg-violet-400 hover:ease-in hover:duration-300"
            >
              Nature
            </button>
            <button
              onClick={() => handelSelection("birds")}
              className="bg-violet-600 text-white py-2 px-7 rounded-sm hover:bg-violet-400 hover:ease-in hover:duration-300"
            >
              Birds
            </button>
            <button
              onClick={() => handelSelection("shoes")}
              className="bg-violet-600 text-white py-2 px-7 rounded-sm hover:bg-violet-400 hover:ease-in hover:duration-300"
            >
              Shoes
            </button>
          </div>
        </div>
      </div>

      {/* display images  */}
      <div className="container mx-auto p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 items-center">
          {images.map((image) => (
            <div>
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
              />
            </div>
          ))}
        </div>
        <div className="my-3 flex justify-between items-center">
          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="bg-violet-600 text-white py-2 px-7 rounded-sm hover:bg-violet-400 hover:ease-in hover:duration-300"
            >
              Previous
            </button>
          )}
          {page < totalPages && (
            <button
              onClick={() => setPage(page + 1)}
              className="bg-violet-600 text-white py-2 px-7 rounded-sm hover:bg-violet-400 hover:ease-in hover:duration-300"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
