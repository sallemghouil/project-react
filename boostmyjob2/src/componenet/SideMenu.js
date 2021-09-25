import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import {
    ApolloProvider,
    HttpLink,
    from,
    gql
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";



class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            props:props
        }

        this.logout = this.logout.bind(this);

        
    }

    getProfileData() {
        const httpLink = createHttpLink({
            uri: 'http://localhost:5000/graphql',
        });

        const authLink = setContext((_, { headers }) => {
            // get the authentication token from local storage if it exists
            const token = localStorage.getItem('token');
            // return the headers to the context so httpLink can read them
            return {
                headers: {
                    ...headers,
                    authorization: token ? `${token}` : "",
                }
            }
        });

        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });


        client
            .mutate({
                mutation: gql`
            mutation{
                myInfo {
                  id,
                  username,
                  email,
                  displayName,
                  userType
                }
              }
          `
            })
            .then(result => {
                console.log(result);
                this.setState({
                    user: result.data.myInfo
                })
            }).catch((err) => {
                console.log(err);

            })

    }


    componentDidMount() {
        this.getProfileData();
    }

    logout(){
        console.log(this.state.props);
        if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
            window.localStorage.clear();
            window.location = '/welcome'
        }
    }

    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        BoostMyJoob
                    </div>
                </a>


                <li className="nav-item">
                    <Link className="nav-link" to="/profile" >
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Acceuil</span>
                    </Link>
                </li>


                
                <li className="nav-item">
                    {
                        this.state.user.userType === "Condidat" ?
                            <div>
                                <Link className="nav-link" to="/filteroffers" >
                                    <i className="fas fa-fw fa-chart-area"></i>
                                    <span>Découvrir des offres</span>
                                </Link>
                                <Link className="nav-link" to="/profile/condidate/listoffres" >
                                    <i className="fas fa-fw fa-chart-area"></i>
                                    <span>Mes condidatures</span>
                                </Link>
                                <Link className="nav-link" to="/profile/condidate" >
                                    <i className="fas fa-fw fa-chart-area"></i>
                                    <span>Mon profile</span>
                                </Link>
                                



                            </div>



                            :

                            <div>
                                <Link className="nav-link" to="/profile/admin/offres" >
                                    <i className="fas fa-fw fa-chart-area"></i>

                                    <span>Nos offres d'emplois</span>
                                </Link>
                                <Link className="nav-link" to="/filteroffers" >
                                    <i className="fas fa-fw fa-chart-area"></i>
                                    <span>Découvrir des offres</span>
                                </Link>
                            </div>
                    }


                    <div>

                        <a  onClick={() => { this.logout(); }} className="nav-link text-danger">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Déconnexion</span>
                        </a>

                    </div>
                </li>


            </ul>
        );
    }

}

export default SideMenu;