import {
  BASE_URL,
  fetchAllPosts,
  transformPostData,
  fetchOwnedPosts,
  fetchFavPosts,
  fetchPost
} from './Posthelper';
import { getToken } from '../Contexts/UserContext';

const token = getToken();

export const Postservices = {
  getPosts: async (filters = {}) => {
      const { limit = 10, page = 0} = filters
      try {
        const Posts = await fetchAllPosts({ limit, page, token });
        const mappedPosts = Posts.data.map(transformPostData);
        return { success: true, Posts: mappedPosts };

      } catch (error) {
        console.error({ error });
        return { success: false, Posts: [] };
      }
  },

  getPost: async (id = "") => {
    try {
      const response = await fetch(`${BASE_URL}post/one/${id}`, {
        method: "GET",
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
      }
      });

      const data = await response.json();
      if (!data) throw new Error("Post not found");
  
      const transformedPost = transformPostData(data);
      return { success: true, Post: transformedPost };
    } catch (error) {
      console.error({ error });
  
      return { success: false, Post: null };
    }
},
  

  getFavorites: async () => {
    try {
      const response = await fetchFavPosts({token})
      const mapi = response.favorites
      console.log(response)
      const mappedPosts = mapi.map(fetchPost);
      const promesa = await Promise.all(mappedPosts);
      console.log(promesa)
      const remapFav = promesa.map(({_id,image,...post})=> ({id:_id,img:image,...post}));

      return {success: true, Posts: remapFav}
  }catch (error) {
    console.error({ error }); 
    return { success: false, Posts: [] };}
  },

  getOwned: async (filters = {}) => {
    const { limit = 10, page = 0} = filters
    try {
      const Posts = await fetchOwnedPosts({ limit, page, token });
      const mappedPosts = Posts.data.map(transformPostData);
      return { success: true, Posts: mappedPosts };

    } catch (error) {
      console.error({ error });
      return { success: false, Posts: [] };
    }
},

  createPost: async (data = {}) => {
    fetch(`${BASE_URL}/post/create`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: data.title,
            description: data.description,
            image: data.img
        })
    })
  }, 

  like: async (id = "") => {
 
    fetch(`${BASE_URL}post/like/${id}`, {
      method: "PATCH",
    headers: {
        Authorization: `Bearer ${token}`,
      }
    }) 
  },  

  fav: async (id = "") => {
    fetch(`${BASE_URL}post/fav/${id}`, {
      method: "PATCH",
    headers: {
        Authorization: `Bearer ${token}`,
      }
    }) 
  },
  
  comment: async (id = "", description = "") => {
    fetch(`${BASE_URL}post/comment/${id}`, {
      method: "PATCH",
      headers: {
        Authorization : `Bearer ${token}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        description: description
    })
    })
  },

  
  toggle: async (id = "") => {
    fetch(`${BASE_URL}post/toggle/${id}`, {
      method: "PATCH",
    headers: {
        Authorization: `Bearer ${token}`
      }
    }) 
  },

  Update: async (data = {}) => {
    const { id = "", title = "", description = "", img = ""} = data
    console.log(data)
    fetch(`${BASE_URL}post/update/${data.id}`, {
      method: "PUT",
      headers: {
        Authorization : `Bearer ${token}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        image: data.img
    })
    })
  }

  
};


