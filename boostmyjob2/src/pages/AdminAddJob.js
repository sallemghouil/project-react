
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



class AdminAddJob extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            
            title: "",
            body: "",
            status: 0,
            keywords: "",
            experience: "+ 1 ans",
            type: "à plein temps",
            salary:"",
            errMsg:"",
            max_salary:"",
            min_salary:"",
            category:'IT'
            
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
                console.log(err);

            })

    }

    createOffre(){
        


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
                    addPost( title:"${this.state.title}",body:"${this.state.body}",status:${this.state.status},keywords:"${this.state.keywords}",type:"${this.state.type}",experience:"${this.state.experience}",salary:"${this.state.min_salary}$ - ${this.state.max_salary}$", date_time:"${new Date().toString()}", category:"${this.state.category}" ) {
                      id
                    }
                  }
          `
            })
            .then(result => {
                console.log(result);
                this.props.history.push('/profile/admin/offres')
            }).catch((err) => {
                console.log(err);
                this.setState({
                    errMsg:"Une erreur s'est produite. Veuillez réessayer"
                })


            })
    }


    componentDidMount() {
        this.getProfileData();
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

                                <h1 className="h3 mb-4 text-gray-800">Nos offres d'emplois</h1>

 
                                <hr />


                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input className="form-control" onChange={ (e)=>{ this.setState({ title: e.target.value }) } } />
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea className="form-control" rows="3" onChange={ (e)=>{ this.setState({ body: e.target.value }) } }   ></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Mot clé</label>
                                            <input className="form-control" onChange={ (e)=>{ this.setState({ keywords: e.target.value }) } }/>
                                        </div>
                                        <div className="form-group">
                                            <label>Catégory</label>
                                            <select className="form-control" onChange={ (e)=>{ this.setState({ category: e.target.value }) } }>
                                            <option value="Alimentation" >Alimentation</option>
                                            <option value="Arts et spectacles" >Arts et spectacles</option>
                                            <option value="Commerce" >Commerce</option>
                                            <option value="Alimentation" >Alimentation</option>
                                            <option value="Communication et marketing" >Communication et marketing</option>
                                            <option value="Construction" >Construction</option>
                                            <option value="Coopération internationale" >Coopération internationale</option>
                                            <option value="Culture et patrimoine" >Culture et patrimoine</option>
                                            <option value="Enseignement" >Enseignement</option>
                                            <option value="Habillement, textile et bien-être" >Habillement, textile et bien-être</option>
                                            <option value="Informatique et multimédia" >Informatique et multimédia</option>
                                            <option value="Livre et presse" >Livre et presse</option>
                                            <option value="Management" >Management</option>
                                            <option value="Nature et environnement" >Nature et environnement</option>
                                            <option value="Recherche scientifique" >Recherche scientifique</option>
                                            <option value="Santé" >Santé</option>
                                            <option value="Sécurité et droit" >Sécurité et droit</option>
                                            <option value="Social" >Social</option>
                                            <option value="Sport" >Sport</option>
                                            <option value="Tourisme" >Tourisme</option>
                                            <option value="Transport" >Transport</option>
                                            
                                    
                                                
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Experience( en années )</label>
                                            <select className="form-control" onChange={ (e)=>{ this.setState({ experience: e.target.value }) } }>
                                                <option value="+ 1 ans" >+ 1 ans</option>
                                                <option value="+ 2 ans" >+ 2 ans</option>
                                                <option value="+ 3 ans" >+ 3 ans</option>
                                                <option value="+ 4 ans" >+ 4 ans</option>
                                                <option value="+ 5 ans" >+ 5 ans</option>
                                                
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Type</label>
                                            

                                            <select className="form-control" className="form-control" onChange={ (e)=>{ this.setState({ type: e.target.value }) } }>
                                            <option value="à plein temps" >à plein temps</option> 
                                            <option value="Mi-temps" >Mi-temps</option> 
                                                
                                                
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Salaire $</label>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <input className="form-control" onChange={ (e)=>{ this.setState({ min_salary: e.target.value }) } }/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <input className="form-control" onChange={ (e)=>{ this.setState({ max_salary: e.target.value }) } }/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <button className=" btn-secondary" onClick={ ()=>{ this.createOffre() } }>Ajouter l'offre</button>
                                        </div>

                                        {
                                                    this.state.errMsg != '' ?
                                                    <div className="form-group my-2" >
                                                    <div className="alert alert-warning">
                                                        {this.state.errMsg}
                                                    </div>
                                                </div>
                                                :
                                                <div></div>
                                                }

                                        
                                        





                                    </div>
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


export default AdminAddJob;