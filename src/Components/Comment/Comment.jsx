import { Postservices } from '../../Services/Post.Services'
import { useState } from "react";

const Comment = ({ id }) => {

    const [comment, setcomment] = useState("");

    const handleOnChange = (e, save) => {
        save(e.target.value);
    };

    return (
        <div className="new_comment">
          <div>
            <input
              type="text"
              placeholder="Escriba su comentario"
              name="search"
              className="newComment_input "
              autoComplete="on"
              onChange={(e) => {
                handleOnChange(e, setcomment);
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="newComment_button"
              onClick={ ()=> { Postservices.comment(id, comment); } }
            >
            Comentar
            </button>
          </div>
      </div>
    );
}

export default Comment;