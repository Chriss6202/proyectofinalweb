import Chip from './Chip/Chip'
import { useState } from 'react'
import { Postservices } from '../../../Services/Post.Services'
import Comment from '../../Comment/Comment'
import Update  from '../../Update/Update'
import Modal from 'react-modal'

const Entry = ({ post }) => {
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    if(!post.id) return null;
    else
    {
    const postComments = post.comments;
    const arraylike = post.likes;
    const likeP = arraylike.length;
    const regex = /\.(jpg|png|jpeg)$/
    const src = post.img.match(regex) ? post.img : "https://pkge.net/uploads/couriers/large/india-post.png?2?2"

    
    return (
        <div>
            <div className="post">
                <div className="post_tittle">
                    <Chip item = {post.title}/>
                    <div className="top_icons">
                        <div className="edit_icon icon">
                            <svg  onClick={() => setmodalIsOpen(true)} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                <line x1="16" y1="5" x2="19" y2="8" />
                            </svg>
                        </div>
                        <div className="view_icon icon" onClick={ ()=> { Postservices.toggle(post.id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye-off" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <line x1="3" y1="3" x2="21" y2="21" />
                                <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                                <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="post_description">
                    <Chip item = {post.description}/>
                </div>
                <div className="post_img">
                    <img src={src} alt="Imagen"></img>
                </div>
                <div className="post_icons">
                    <div className="like_icon icon"  onClick={ ()=> { Postservices.like(post.id); } }>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-up" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                        </svg>
                    </div>
                    <div>
                        <Chip item = {likeP}/>
                    </div>
                    <div className="fav_icon icon" onClick={ ()=> { Postservices.fav(post.id); } }>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                        </svg>
                    </div>
                    <Modal isOpen={modalIsOpen} style={
                        {
                            overlay:{
                                backgroundColor: 'rgba(0, 0, 0, 0.7)'
                            },
                            content:{
                                border: 'none',
                                backgroundColor: 'transparent',
                                position: 'absolute', 
                                inset: ' 12% 30%',
                                
                            }
                        }
                    }>
                        <div>
                            <div className="top_popup">
                                <button  className="exit_button" onClick={() => setmodalIsOpen(false)}> X </button>
                            </div>
                            <Update post={post}/>
                        </div>
                    </Modal>
                </div>
            </div>

            <div className="comment_section">
                <Comment id={post.id}/>
                <div className="post_comments">
                    {postComments.map((postie, index) => (
                        <div key={Math.random()} data-index={index}>
                            <p className="comment" key={Math.random()}>{postie.user.username} : {postie.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>           
    )
}}

export default Entry;