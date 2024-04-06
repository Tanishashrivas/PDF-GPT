import logo from "./assets/logo.png";
import Chat from "./ChatComponent/Chat";
import DragWindow from "./DragWindow";

function Home() {
  return (
    <>
      <div className="mainContainer">
        <div className="subContainer1">
          <div className="headerBox">
            <div className="box1">
              <img src={logo} alt="" className="logoImg" />
              <div className="title">
                <p className="version">Version 3.7</p>
                <p className="titleName">pdfGPT</p>
                <p className="titleHeadline">Learning made easy!</p>
              </div>
            </div>
          </div>
          <div className="midBox">
            <DragWindow />
          </div>
        </div>
        <div className="subContainer2">
          <Chat />
        </div>
      </div>
    </>
  );
}

export default Home;
