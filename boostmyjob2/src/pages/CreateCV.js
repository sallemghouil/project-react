
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


class AddCV extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            successUpdate:false,
            user:null,
            description:"",
            photoURL:"",
            


            // add diplomas
            tmpDiplomeTitle:'',
            tmpDiplomeEndDate:'',
            tmpDiplomeStartDate:'',
            diplomas:[],


            // add exp
            tmpDiplomeTitle:'',
            tmpDiplomeEndDate:'',
            tmpDiplomeStartDate:'',
            exps:[],


            // add comps
            tmpCompsTitle:'',
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
            mutation{
                myInfo {
                  id,
                  username,
                  email,
                  displayName,
                  userType,
                  cv
                }
              }
          `
          })
          .then(result =>{
              console.log(result);
                if (result.data.myInfo.cv != null) {
                    let cvstr = result.data.myInfo.cv.replaceAll('XXXX','"').replaceAll('PPPP',":"); 
              let cvJSON = JSON.parse(cvstr);
                console.log(cvJSON);
                this.setState(cvJSON)
                }

                console.log("we are good ");

                this.setState({
                    user:result.data.myInfo
                })
                
                  
          }).catch((err)=>{
              
            console.log(err);
              
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

                                <h1 className="h3 mb-4 text-gray-800">Ajouter un cv</h1>

                                <div className="mt-2">
                                    {
                                        this.state.user != null ?
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
                                                    <label>Lien photo</label>
                                                    <input rows="4" type="url"  className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="" value={this.state.photoURL}   onChange={ (e)=>{ this.setState({photoURL:e.target.value}) } } />
                                                </div>
                                                <div className="form-group">
                                                    <label>A propos</label>
                                                    <textarea rows="4" type="text"  className="form-control form-control-user"
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
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                        <label>Titre</label>
                                                            <input type="text"  className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder=""   onChange={ (e)=>{ this.setState({tmpDiplomeTitle:e.target.value}) } } />

                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                        <label>Date début</label>
                                                            <input type="date"  className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder=""   onChange={ (e)=>{ this.setState({tmpDiplomeStartDate:e.target.value}) } } />

                                                        </div>
                                                        <div className="col-sm-6">
                                                        <label>Date fin</label>
                                                            <input type="date"  className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder=""   onChange={ (e)=>{ this.setState({tmpDiplomeEndDate:e.target.value}) } } />

                                                        </div>
                                                        
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                        <button className="btn-primary mt-3" onClick={ ()=>{
                                                            const diplome = {
                                                                title:this.state.tmpDiplomeTitle,
                                                                start:this.state.tmpDiplomeStartDate,
                                                                end:this.state.tmpDiplomeEndDate
                                                            }
                                                            var oldList = this.state.diplomas;
                                                            oldList.push(diplome);
                                                            this.setState({
                                                                tmpDiplomeTitle:'',
                                                                tmpDiplomeStartDate:'',
                                                                tmpDiplomeEndDate:'',
                                                                diplomas:oldList
                                                            })

                                                        }} >Ajouter</button>
                                                        </div>
                                                    </div>
                                                    



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
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                        <label>Titre</label>
                                                            <input type="text"  className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder=""   onChange={ (e)=>{ this.setState({tmpExpsTitle:e.target.value}) } } />

                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                        <label>Date début</label>
                                                            <input type="date"  className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder=""   onChange={ (e)=>{ this.setState({tmpExpsStartDate:e.target.value}) } } />

                                                        </div>
                                                        <div className="col-sm-6">
                                                        <label>Date fin</label>
                                                            <input type="date"  className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder=""   onChange={ (e)=>{ this.setState({tmpExpsEndDate:e.target.value}) } } />

                                                        </div>
                                                        
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                        <button className="btn-primary mt-3" onClick={ ()=>{
                                                            const exp = {
                                                                title:this.state.tmpExpsTitle,
                                                                start:this.state.tmpExpsStartDate,
                                                                end:this.state.tmpExpsEndDate
                                                            }
                                                            var oldList = this.state.exps;
                                                            oldList.push(exp);
                                                            this.setState({
                                                                tmpExpsTitle:'',
                                                                tmpExpsStartDate:'',
                                                                tmpExpsEndDate:'',
                                                                exps:oldList
                                                            })

                                                        }} >Ajouter</button>
                                                        </div>
                                                    </div>
                                                    



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

                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                        <label>Titre</label>
                                                            <input type="text"  className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="" value={ this.state.tmpCompsTitle }   onChange={ (e)=>{ this.setState({tmpCompsTitle:e.target.value}) } } />

                                                        </div>
                                                    </div> 

                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                        <button className="btn-primary mt-3" onClick={ ()=>{
                                                            const comp = {
                                                                title:this.state.tmpCompsTitle, 
                                                            }
                                                            var oldList = this.state.comps;
                                                            oldList.push(comp);
                                                            this.setState({
                                                                tmpCompsTitle:'' 
                                                            })

                                                        }} >Ajouter</button>
                                                        </div>
                                                    </div>
                                                    



                                                </div>















                                                <div className="form-group">
                                                     <button className="btn-primary" onClick={ ()=>{ this.updateCV() } } >mettre à jour</button>
                                                </div>

                                               
                                                

                                                
                                                
                                            </div>   
                                        </div>  
                                        :
                                        <div >  </div>  


                                        

                                    }    

                                     {
                                                    this.state.successUpdate === true ?
                                                    <div className="form-group">
                                                        <div className="alert alert-success">Votre cv est a jour</div>
                                                    </div>:
                                                    <div></div>
                                                }
      
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


export default AddCV;