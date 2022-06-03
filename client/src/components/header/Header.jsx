import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
      <span className="headerTitleSm">Feel free to contact Haithem Grissander</span>
        <span className="headerTitleLg">B l O g T e C h</span>
        
      </div>
      <img
        className="headerImg"
        src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
        alt=""
      />
    </div>
  );
}
