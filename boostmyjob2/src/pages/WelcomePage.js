
import React from 'react';
import '../front/assets/css/style.css';
import '../front/assets/css/fontawesome-all.min.css';
import { Link } from 'react-router-dom';


class WelcomePage extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <div>
                {
                    /**
                     *     <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt=""/>
                </div>
            </div>
        </div>
    </div>
                     */
                }
    <header>
       <div class="header-area header-transparrent">
           <div class="headder-top header-sticky">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-md-2">
                            <div class="logo">
                                <a href="index.html"><img src="assets/img/logo/logo.png" alt=""/></a>
                            </div>  
                        </div>
                        <div class="col-lg-9 col-md-9">
                            <div class="menu-wrapper">
                                <div class="main-menu">
                                    <nav class="d-none d-lg-block">
                                        <ul id="navigation">
                                            
                                            <li><Link to="/">Acceuil</Link></li>
                                            <li><Link to="/filteroffers">Trouver un offre</Link></li>
                                        </ul>
                                    </nav>
                                </div>          
                                <div class="header-btn d-none f-right d-lg-block">
                                    {
                                        localStorage.getItem('token') == null ?

                                        <div>
                                            <Link to="/signup"  class="btn head-btn1">Register</Link>
                                            <Link to="/signin" class="btn head-btn2">Login</Link>
                                        </div>
                                        :
                                        <div>
                                            <Link to="/signin" class="btn head-btn2">Profile</Link>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>
                </div>
           </div>
       </div>
    </header>
    <main>

        
        <div class="our-services section-pad-t30">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center">
                            <span>Bienvenue a BoostMyJob</span>
                            <h2>BoostMyJob, booster ma carrière </h2>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-lg-12">
                        <div class="browse-btn2 text-center mt-50">
                            <Link to="/filteroffers"  class="border-btn2">Trouver un offre</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </main>
 




            </div>
        );
    }
}


export default WelcomePage;