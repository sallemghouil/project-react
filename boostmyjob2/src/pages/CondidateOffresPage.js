
import React from 'react';
import SideMenu from '../componenet/SideMenu';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import {
    ApolloProvider,
    HttpLink,
    from,
    gql
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";


class CondidateOffresPage extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
                user: null,
                myOffres: []
            }
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
                /*console.log(err);
                window.localStorage.clear();
                this.props.history.push('/signin')*/

            })

    }


    getMyOffres() {
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
            query{
                myOffres {
                  id,
                  status,
                  user{
                    id
                    displayName,
                    email,
                  }
                  post{
                  id,
                    title,
                    category
                    
                }
                  
                }
              }
          `
            })
            .then(result => {
                console.log("my offres", result);

                this.setState({
                    myOffres: result.data.myOffres
                })

            }).catch((err) => {

                console.log(err);
                /*console.log(err);
                window.localStorage.clear();
                this.props.history.push('/signin')*/

            })

    }


    componentDidMount() {
        this.getProfileData();
        this.getMyOffres();
    }



    render() {
        return (
            <div>

                <div id="wrapper">

                    <SideMenu />

                    <div id="content-wrapper" className="d-flex flex-column">

                        <div id="content">

                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">



                                <ul className="navbar-nav ml-auto">
                                    <div className="topbar-divider d-none d-sm-block"></div>

                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                                {
                                                    this.state.user == null ? 'chargement...' : this.state.user.displayName
                                                }
                                            </span>

                                        </a>

                                    </li>

                                </ul>

                            </nav>
                            <div className="container-fluid">

                                <h1 className="h3 mb-4 text-gray-800">Mes condidatures</h1>
                                <hr />

                                <div>
                                    {
                                        this.state.myOffres.map((c) => {
                                            return (
                                                <div className="card mt-2 mb-2">
                                                    <div className="card-body">
                                                        <h3>{c.post.title}</h3><br />
                                                        <small> {c.post.category} </small>
                                                        <hr />
                                                        {
                                                            c.status === 0 ?
                                                                <span className="badge badge-warning d-block">en attante</span>
                                                                :
                                                                <div className=""></div>
                                                        }

                                                        {
                                                            c.status === 1 ?
                                                                <span className="badge badge-success d-block">accepter</span>
                                                                :
                                                                <div className=""></div>
                                                        }

                                                        {
                                                            c.status === 2 ?
                                                                <span className="badge badge-warning d-block">réfuser</span>
                                                                :
                                                                <div className=""></div>
                                                        }



                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>


                            </div>

                        </div>
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; Your Website 2021</span>
                                </div>
                            </div>
                        </footer>

                    </div>

                </div>
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>






            </div>
        );
    }
}


export default CondidateOffresPage;