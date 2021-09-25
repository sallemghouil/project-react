
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



class AdminOffreSubmitions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user:null,
            post:null,
            id:props.match.params.id
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



    deleteSubmition(id){
        

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
                deleteComment(commentId:"${id}")
              }

          `
          })
          .then(result =>{
              console.log(result);
              this.getOurOffres();

          }).catch((err)=>{
              console.log(err);
              
          })
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
                        post(id:"${this.state.id}")  {
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
                        post:result.data.post
                    })
                    
                }).catch((err) => {
                    console.log(err);
                    this.setState({
                        errMsg:"Une erreur s'est produite. Veuillez réessayer"
                    })
    
    
                })
      
    }


    accpetC(id){
        


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
                    updateCondidature(status:1,commentId:"${id}")
                  }
          `
            })
            .then(result => {
                console.log(result);
                
                this.getOurOffres();
                
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
                            {
                                this.state.post != null ?
                                <div className="container-fluid">

                                <h1 className="h3 mb-4 text-gray-800">Condidatures</h1>

                                
                                
                                <hr/>
                                <div className="card">
                                    <table className="table">
                                        <thead>
                                            <th>
                                                Nom de condidat
                                            </th>
                                            <th>
                                                Email
                                            </th>
                                            <th>
                                                Statut
                                            </th>
                                            <th>
                                                Cv
                                            </th>
                                            
                                            
                                            <th>
                                                Action
                                            </th>
                                             
                                            
                                            
                                                
                                        </thead>
                                        <tbody>
                                                {
                                                    this.state.post.comments.map((c)=>{
                                                        return (
                                                            <tr>
                                                                <td>
                                                                {
                                                                    c.user.displayName
                                                                }
                                                                </td>
                                                                <td>
                                                                {
                                                                    c.user.email
                                                                }
                                                                </td>
                                                                <td>
                                                                {
                                                                    c.user.status === 0 ?
                                                                    <div>
                                                                        en cours
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <span className="badge badge-pri">traité</span>
                                                                    </div>
                                                                    
                                                                }
                                                                </td>
                                                                <td>
                                                                {
                                                                    c.user.cv != null ?
                                                                    <div>
                                                                        <Link className="text-success" to={ '/users/cv/'+c.user.id }>voir cv</Link>
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <span className="badge badge-warning">non disponible</span>
                                                                    </div>
                                                                    
                                                                }
                                                                </td>
                                                                <td>
                                                                {
                                                                    c.status === 0 ?
                                                                    <button className=" btn-success mr-2 " onClick={ ()=>{

                                                                        if (confirm('Voulez vous vraiment accepter cette condidature ?')) {
                                                                            this.accpetC(c.id)
                                                                        }
    
                                                                    } } >Accepter</button> 
                                                                    :
                                                                    <div></div>
                                                                }
                                                                <button className=" btn-danger " onClick={ ()=>{ 
                                                                    if (window.confirm('Voulez vous vraiment supprimer cette condidature ?')) {
                                                                        this.deleteSubmition(c.id)
                                                                    }
                                                                 } }>Supprimer</button>
                                                                </td>
                                                                
                                                                
                                                            </tr>
                                                        );
                                                    })
                                                }
                                            
                                        </tbody>
                                    </table>
                                </div> 






                            </div>
                            :
                            <div></div>
                            }

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


export default AdminOffreSubmitions;