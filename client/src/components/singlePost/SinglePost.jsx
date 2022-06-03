import { Context } from "../../context/Context";
import "./singlePost.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";


export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];    //fetch the data with using the id from console log object    
  const [post, setPost] = useState({});
  const PF = "http://localhost:3000/images/image-2.jpeg";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {                                               //whenever this path changes fire this user effect
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);                 //axios get method
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {                  //axios delete method i used posts url and post id
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };


  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />    //PUBLIC FOLDER(PF) +POST.PHOTO
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (                  //question mark if there no user its not going to look username and no any error
              <div className="singlePostEdit"> 
                             
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">      {/**User name gonna be link from index.html*/}
              <b> {post.username}</b>
            </Link>
       </span>                          
          <span className="singlePostDate">                    {/**DATE F */}                   
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Write
          </button>
        )}
      </div>
    </div>
  );
}