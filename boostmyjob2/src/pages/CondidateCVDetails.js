
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


class CondidateCvDetails extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            idUser:this.props.match.params.id,
            
            
            user:null,
            description:"",
            photoURL:"",
             
            diplomas:[],
 
            exps:[],
 
            comps:[]
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
            query{
                user(id:"${this.state.idUser}") {
                  id,
                  cv,
                  displayName,
                  email,
                  address
                }
              }
          `
          })
          .then(result =>{
              console.log(result);
              let cvstr = result.data.user.cv.replaceAll('XXXX','"').replaceAll('PPPP',":"); 
              let cvJSON = JSON.parse(cvstr);
              console.log("User cv",cvJSON);

              this.setState(cvJSON)

                
                
                  
          }).catch((err)=>{
              /*console.log(err);
              window.localStorage.clear();
              this.props.history.push('/signin')*/
              
          })
    
    }


    componentDidMount(){
        this.getProfileData();
    }


    updateCV(){

            this.setState({
            successUpdate:false
          })

            var cv = this.state;

            delete cv.tmpDiplomeTitle;
            delete cv.tmpDiplomeStartDate;
            delete cv.tmpDiplomeEndDate;
            
            delete cv.tmpExpsTitle;
            delete cv.tmpExpsStartDate;
            delete cv.tmpExpsEndDate;
            
            delete cv.tmpCompsTitle;
            delete cv.user;


            var dbs = JSON.stringify(cv).replaceAll('"',"XXXX");
            dbs.replaceAll(':',"PPPP");



            console.log(dbs);
            
        



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
                updateProfileCV(cv:"${dbs}") {
                  id,
                  cv
                }
              }
          `
          })
          .then(result =>{
              console.log(result);

              this.setState({
                successUpdate:true
              })
               
              console.log(this.state);
          }).catch((err)=>{
               console.log(err);
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

                                <h1 className="h3 mb-4 text-gray-800">CV condidat</h1>

                                <div className="mt-2">
                                     
                                        <div className="card">
                                            <div className="card-body">

                                                {
                                                    this.state.photoURL != '' ?
                                                    <div className="form-group">
                                                    <img src={this.state.photoURL } width={200} className="mb-5" />
                                                </div>
                                                :<div></div>
                                                }
                                                
                                                
                                                <div className="form-group">
                                                    <label>A propos</label>
                                                    <textarea disabled rows="4" type="text"  className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="" value={this.state.description}   onChange={ (e)=>{ this.setState({description:e.target.value}) } } ></textarea>
                                                </div>

                                                <div className="form-group">
                                                    <label>Mes diplomes</label>
                                                    <ul>
                                                        {
                                                            this.state.diplomas.map((d)=>{
                                                                return <li>
                                                                    <p> <strong>{d.title}</strong> <br/>
                                                                        {d.start} / {d.end}
                                                                     </p>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>

                                                    <hr/>
                                                    
                                                </div>


                                                <div className="form-group">
                                                    <label>Mes Expériences pro</label>
                                                    <ul>
                                                        {
                                                            this.state.exps.map((d)=>{
                                                                return <li>
                                                                    <p> <strong>{d.title}</strong> <br/>
                                                                        {d.start} / {d.end}
                                                                     </p>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>

                                                    <hr/>
                                                    
                                                    



                                                </div>

                                                

                                                <div className="form-group">
                                                    <label>Mes compétance</label>
                                                    <ul>
                                                        {
                                                            this.state.comps.map((d)=>{
                                                                return <li>
                                                                    <p> <strong>{d.title}</strong> 
                                                                     </p>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>

                                                    


                                                </div>












 

                                                
                                                
                                            </div>   
                                        </div>  
                                         
 
      
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


export default CondidateCvDetails;