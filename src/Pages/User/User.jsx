import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../Contexts/UserContext';
import { Postservices } from '../../Services/Post.Services';
import Collection from '../../Components/Post/Collection';
import Entry from '../../Components/Post/Entry/Entry';
import Search from '../../Components/Search/Search';

const UserPage = () => {
  const { logout } = useUserContext();
  const [Posts, setPosts] = useState([]);
  const [searchedPost, setSearchedPost] = useState(null);
  let page = 0;
  const [limit, setLimit] = useState(10);
    
  const onChange = (e, save) => {
    save(e.target.value);
  }

  const onSearchHandler = async (id) => {
    try {
      const response = await Postservices.getPost(id);
      console.log(response["post"])
      if (!response["success"]) {
        throw new Error("Cannot find the post");
      }

      setSearchedPost(response["Post"]);
    } catch (error) {
      console.error({ error });
    }
  };

  const next = () =>{   
    const newLimit = limit + 10;
    setLimit(newLimit); 
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try { 
        const filters = { limit: limit, page: page };
        const response = await Postservices.getPosts(filters);
        if(!response['success']){
          throw new Error('Something was wrong')
        }
          
        setPosts(response["Posts"]);
        } catch (error) {
          console.error(error);
        }
    };
    fetchPosts();
  }, [limit]);

  const fetchFavs = async () => {
    try {  
      const response = await Postservices.getFavorites();
  
      if(!response['success']){
        throw new Error('Something was wrong')
      }
      setPosts(response["Posts"]);
      } catch (error) {
        console.error(error);
      }
  }

  return (
      <div>
        <div className="User_header">
          <h1 className="userheader__tittle">Página de usuario</h1>
          <div className="header_buttons">
            <button className="favs_button" onClick={fetchFavs}>Mis favoritos</button>
            <button className="logout_button" onClick = {()=> { logout() }}> Cerrar sesión </button>
          </div>
        </div>
        <div>
          <Search className="search_bar" onSubmit={onSearchHandler} />
          {searchedPost && (
          <div className="post_container">
            {" "}
            <Entry
              post={searchedPost}/>
          </div>
              )}
        </div>
        <div className="post_container">
          <Collection Posts={Posts}/>
        </div>
        <div className="footer">
          <button className="load_button" onClick={next}>Cargar más</button>
        </div>
      </div>
  )
}

export default UserPage;