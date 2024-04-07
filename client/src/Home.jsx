import { useEffect } from "react";
import { auth, signOutUser } from "./firebase";
import logo from "./assets/logo.png";
import Chat from "./ChatComponent/Chat";
import DragWindow from "./DragWindow";
// import Login from "./LoginComponents/Login";
// import { useNavigate } from "react-router-dom";

function Home() {
  // const navigateTo = useNavigate();

  // useEffect(() => {
  //   const signOutIfAuthenticated = async () => {
  //     const user = auth.currentUser; 

  //     if (user) {
  //       try {
  //         await signOutUser(); 
  //         navigateTo("/");
  //         console.log('User signed out successfully!');
  //       } catch (error) {
  //         console.error('Error signing out:', error.message);
  //       }
  //     }
  //   };

  //   signOutIfAuthenticated();
  // }, []); 


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
                {/* <p className="titleHeadline">Learning made easy!</p> */}
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
