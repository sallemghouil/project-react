
import React from 'react';
import { Link } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
    gql
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";

class SignInPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:"",
            password:"",
            messageError:""
        }
    }


    componentDidMount(){
        if (localStorage.getItem('token') != null) {
            this.props.history.push('/profile');
        }
    }


    /*authUser(){
        this.setState({
            messageError:''
        })
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"username":this.state.username,"password":this.state.password});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/auth/signin", requestOptions)
        .then(response => response.json())
        .then((res)=>{
            if (res.status == 400) {
                // error access
                this.setState({
                    messageError:"Verifier nom d'utilisateur et mot de passe."
                })
            }else if (res.status == 401) {
                // error access
                this.setState({
                    messageError:"Mauvais nom d'utilisateur et mot de passe."
                })
            }else{
                console.log(res);

                // we are good to go !!

                localStorage.setItem('token',res.accessToken);
                localStorage.setItem('tokenType',res.tokenType);

                this.props.history.push('/home');
                

            }
        })
        .catch((error)=>{
            console.log("oups"+error.status);
        });
    }*/



    authUser() {

        this.setState({
            messageError:''
        })


        const errorLink = onError(({ graphqlErrors, networkError }) => {
          if (graphqlErrors) {
            graphqlErrors.map(({ message, location, path }) => {
              alert(`Graphql error ${message}`);
            });
          }
        });
        
        const link = from([
          errorLink,
          new HttpLink({ uri: "http://localhost:5000/graphql" }),
        ]);
        
        const client = new ApolloClient({
          cache: new InMemoryCache(),
          link: link,
        });
    
    
        console.log(client);
    
        client
          .mutate({
            mutation: gql`
            mutation{
              login(email:"${this.state.username}",password:"${this.state.password}")
            }
          `
          })
          .then(result =>{
              if (result.data.login) {
                  console.log(result.data.login);
                localStorage.setItem('token',result.data.login);
                this.props.history.push('/profile');
              }
          }).catch((err)=>{
              console.log(err);
              this.setState({
                messageError:"Mauvais nom d'utilisateur et mot de passe."
            })
          })
    
     
      }
    



    render() {
        return (

            <div className="container">


                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Connexion !</h1>
                                            </div>
                                            
                                                <div className="form-group">
                                                    <input type="text"  className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Email" value={ this.state.username } onChange={ (e)=>{ this.setState({username:e.target.value}) } } />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password"  className="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Mot de passe" onChange={ (e)=>{ this.setState({password:e.target.value}) } }  />
                                                </div>
                                                <button onClick={ (e)=>{ this.authUser() } }  type="submit" className="btn btn-primary btn-user btn-block">
                                                    Se connecter
                                                </button>

                                                {
                                                    this.state.messageError != '' ?
                                                    <div className="form-group my-2" >
                                                    <div className="alert alert-warning">
                                                        {this.state.messageError}
                                                    </div>
                                                </div>
                                                :
                                                <div></div>
                                                }

                                            <div className="text-center mt-3">
                                                <Link to="/signup" >Créez votre compte maintenant</Link>
                                            </div>
                                            
                                            


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}


export default SignInPage;