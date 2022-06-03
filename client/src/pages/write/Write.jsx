import "./write.css";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");       //initial state going be empty
  const [desc, setDesc] = useState("");                    ////
  const [file, setFile] = useState(null);    //Null there is no file
  const { user } = useContext(Context);




  const handleSubmit = async (e) => {                   //handleSubmit going be an event (e)
    e.preventDefault();
  const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {                                     //we eill not send this directly for that we  used if img
      const data = new FormData();                       //WE CREATE A DARA FILE we are using a new operator(new)
      const newname = Date.now() + file.name;         //CREATE A FILE NAME //Date.now() FOR THE USER CAN NOT UPLOAD THE SAME AMAGE
      data.append("name", newname);
      data.append("file", file);
      newPost.photo = newname;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
   
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  }
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" /> //we will use url database for images(write file)
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}    //we uploading a single file first one[0]
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}           //set description
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
