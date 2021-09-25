
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
import { Link } from 'react-router-dom';



class AdminJobOffersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user:null,
            offres:[]
        }
    }


    getProfileData(){
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
          .then(result =>{
              console.log(result);
              this.setState({
                  user:result.data.myInfo
              })
          }).catch((err)=>{
              console.log(err);
              
          })
    
    }


    componentDidMount(){
        this.getProfileData();
        this.getOurOffres();
    }

    getOurOffres(){
      

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
                        myPosts {
                            id,
                            type,
                            title,
                            body,
                            status,
                            keywords,
                            experience,
                            salary,
                            comments{
                                id,
                                status,
                                user{
                                  id,
                                  username,
                                  displayName,
                                  email,
                                  cv
                      
                                }
                            }
                      
                          }
                        }
              `
                })
                .then(result => {
                    console.log(result);
                    this.setState({
                        offres:result.data.myPosts
                    })
                    
                }).catch((err) => {
                    console.log(err);
                    this.setState({
                        errMsg:"Une erreur s'est produite. Veuillez réessayer"
                    })
    
    
                })
      
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
                                        <a className="nav-link dropdown-toggle"  id="userDropdown" role="button"
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

                                <h1 className="h3 mb-4 text-gray-800">Nos offres d'emplois</h1>

                                <Link className="btn btn-info btn-sm" to="/profile/admin/add" >Ajouter un offre</Link>
                                <hr/>
                                <div className="card">
                                    <table className="table">
                                        <thead>
                                            <th>
                                                Titre
                                            </th>
                                            <th>
                                                Description
                                            </th>
                                            <th>
                                                Experience
                                            </th>
                                            <th>
                                                Type
                                            </th>
                                            <th>
                                                Salaire
                                            </th> 
                                            <th>
                                                Condidatures
                                            </th> 
                                            <th>
                                                Actions
                                            </th>
                                            
                                            
                                                
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.offres.map((o)=>{
                                                    return(
                                                        <tr>
                                                            <td>
                                                                {o.title}
                                                            </td>
                                                            <td>
                                                                {o.body.substr(0,25)}...
                                                            </td>
                                                            <td>
                                                                {o.experience}
                                                            </td>
                                                            <td>
                                                                {o.type}
                                                            </td>
                                                            <td>
                                                                {o.salary}
                                                            </td> 
                                                            <td>
                                                                <span className="badge badge-danger" >{o.comments.filter((c)=>c.status == 0).length }</span>
                                                            </td> 
                                                            <td>
                                                                <Link to={"/profile/condidate/listoffres/condidatures/"+o.id} className="text-primary" >
                                                                Voir list condidatures
                                                                </Link>
                                                            </td>
                                                            
                                                            

                                                        </tr>
                                                    );
                                                })
                                                
                                            }
                                        </tbody>
                                    </table>
                                </div> 






                            </div>

                        </div>
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; Your Website 2020</span>
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


export default AdminJobOffersList;