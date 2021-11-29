import { useState } from "react";

const Search = ({ onSubmit }) => {
  const [id, setid] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(id);
  };

  const handleOnChange = (e, save) => {
    save(e.target.value);
  };

  return (

      <form onSubmit={onSubmitHandler} className="search_bar">
          <input
            type="text"
            placeholder="Ingresa el id de la publicación"
            name="search"
            className="rounded-l py-1 px-2 font-roboto text-base focus:outline-none focus:border-transparent search_input"
            autoComplete="on"
            style={{ color: "6D6D6D" }}
            onChange={(e) => {
              handleOnChange(e, setid);
            }}
          />

          <button
            type="submit"
            className="search_button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
      </form>

  );
};

export default Search;