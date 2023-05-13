import React, { useState } from "react";
import "./Home.css";
import landingImg from "../../assets/landingImg.jpg";
import GetStarted from "../GetStarted/GetStarted"
import Header from "../Header/Header"
const Home = () => {
    const [show,setShow] = useState(false)
    const toggle = () => setShow(prevState=>!prevState);
    return (
        <div className="landingPage">
            <Header />
            <section id="hero">
                <div className="container">
                    <div className="content">
                        <div className="content_text">
                            <h2>
                                EHR System made to maintain electronic health records and perform clinical text analysis.
                            </h2>
                        </div>
                        <div className="link_but">
                            <button onClick={()=>{setShow(true); console.log(show);}}className="login_but">Login</button>
                        </div>
                    </div>
                    <div className="Image_box" data-aos="fade-left">
                        <img src={landingImg} className="Landing_img animation" alt="" />
                    </div>

                </div>
            </section>
            <GetStarted isModalOpen={show} toggleModal={toggle} setShow={setShow}/>
        </div>
    );
};

export default Home;
