import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../Contexts/UserContext';
import { Postservices } from '../../Services/Post.Services';
import Collection from '../../Components/Post/Collection';
import Entry from '../../Components/Post/Entry/Entry';
import Search from '../../Components/Search/Search';


const AdminPage = () => {
  const { logout } = useUserContext();
  const [Posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [searchedPost, setSearchedPost] = useState(null);
  let page = 0;
  const [limit, setLimit] = useState(10);

  const onChange = (e, save) => {
    save(e.target.value);
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
  },[limit]);

  const onSearchHandler = async (id) => {
    try {
      const response = await Postservices.getPost(id);
      if (!response["success"]) {
      throw new Error("Cannot find the post");
      }
      setSearchedPost(response["Post"]);
    } catch (error) {
    console.error({ error });
    }
  };

  const createPost = async () => {
    const data = {description : description, title : title, img : img}
    Postservices.createPost(data)
  }

  const next = () =>{   
    const newLimit = limit + 10;
    setLimit(newLimit); 
  }

  const fetchOwned = async () => {
    try { 
      const filters = { limit: limit, page: page };
      const response = await Postservices.getOwned(filters);
      if(!response['success']){
        throw new Error('Something was wrong')
      }
      setPosts(response["Posts"]);
      } catch (error) {
        console.error(error);
      }
  }
    
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
          <h1 className="userheader__tittle">Página del administrador</h1>
          <div className="header_buttons">
            <button className="myposts_button" onClick={fetchOwned}>Mis publicaciones</button>
            <button className="favs_button" onClick={fetchFavs}>Mis favoritos</button>
            <button className="logout_button" onClick = {()=> { logout() }}> Cerrar sesión </button>
          </div>
        </div>

        <div className="main_bar">
          
          <div className="create_post">
            <input
              type="text"
              placeholder="Titulo"
              name="search"
              className="create_input rounded-l py-1 px-2 font-roboto text-base focus:outline-none focus:border-transparent"
              autoComplete="on"
              style={{ color: "6D6D6D" }}
              onChange={(e) => {
                onChange(e, setTitle);
              }}
            />
            <input
              type="text"
              placeholder="Descripción"
              name="search"
              className="create_input rounded-l py-1 px-2 font-roboto text-base focus:outline-none focus:border-transparent"
              autoComplete="on"
              style={{ color: "6D6D6D" }}
              onChange={(e) => {
                onChange(e, setDescription);
              }}
            />
            <input
              type="text"
              placeholder="URL imagen"
              name="search"
              className="create_input rounded-l py-1 px-2 font-roboto text-base focus:outline-none focus:border-transparent"
              autoComplete="on"
              style={{ color: "6D6D6D" }}
              onChange={(e) => {
                onChange(e, setImg);
              }}
            />
            <button className="post_button" onClick={createPost}>Publicar</button>
          </div>
          <div>
          <Search onSubmit={onSearchHandler} />
          {searchedPost && (
          <div className="post_container">
            {" "}
            <Entry post={searchedPost}/>
          </div>
              )}
          </div>
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

export default AdminPage;