import { getToken } from "../Contexts/UserContext";
export const BASE_URL = 'https://posts-pw2021.herokuapp.com/api/v1/'

const tokenl = getToken();

export const fetchAllPosts = async ({ limit, page, token }) => {
    const response = await fetch(
      `${BASE_URL}post/all?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }}
    );
    const postResponse = await response.json();
    return postResponse;
  };


export const transformPostData = (postRaw) => {
    if (!postRaw) return null;
  
    return {
      title: postRaw.title,
      id: postRaw._id,
      description: postRaw.description,
      img: postRaw.image,
      likes: postRaw.likes,
      comments: postRaw.comments,
      active: postRaw.active,
      user: postRaw.user.username,
      history: postRaw.history,
      Creado: postRaw.createdAt,
      Actualizado: postRaw.updatedAt,
    };
};

export const fetchOwnedPosts = async ({ limit, page, token }) => {
  const response = await fetch(
    `${BASE_URL}post/owned?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
          Authorization: `Bearer ${token}`,
      }}
      );
      const postResponse = await response.json();
      return postResponse;
};

export const fetchFavPosts = async ({token}) => {
  const response = await fetch(
    `${BASE_URL}post/fav`, {
      method: "GET",
      headers: {
          Authorization: `Bearer ${token}`,
      }}
      );
      const postResponse = await response.json();
      return postResponse;
};

export const fetchPost = async (id) => {

  const response = await fetch(`${BASE_URL}post/one/${id}`, {
    method: "GET",
  headers: {
      Authorization: `Bearer ${tokenl}`,

  }
  });

  const data = await response.json();
  return data;
}
