import { useState } from "react";
import { Postservices } from '../../Services/Post.Services';

const Update = ({ post }) => {
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [img, setImg] = useState("");
    const OldTitle = post.title;
    const OldDescription = post.description;
    const OldImg = post.img
    const id = post.id;


    const onChange = (e, save) => {
        save(e.target.value);
    };

    const onSubmit = () => {
      if(!title) title = OldTitle;
      if(!description) description = OldDescription;
      if(!img) img = OldImg;
      const data = { title : title, description : description, img : img, id : id }
      console.log(data)
      Postservices.Update(data)
    };

    return (

    <div className="update_post">
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
      <div>
          <button className="edit_button" onClick={onSubmit}>
            Editar
          </button>
      </div>    
    </div>
    );
}

export default Update;