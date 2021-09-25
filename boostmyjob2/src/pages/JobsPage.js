
import React from 'react';
import '../front/assets/css/style.css';
import '../front/assets/css/fontawesome-all.min.css';
import { Link } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
    gql,
    createHttpLink
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';

class JobsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            categoryFilter: "",
            experienceFilter: "",
            keywordsFilter: ''
        }
    }

    getOffers() {


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
                posts {
                  id,
                  type,
                  title,
                  body,
                  status,
                  keywords,
                  experience,
                  salary,
                  date_time,
                  category,
                  author {
                    id,
                    displayName,
                    email
                  }
                  
                }
              }
          `
            })
            .then(result => {
                console.log(result);

                this.setState({
                    posts: result.data.posts
                })


            }).catch((err) => {
                console.log(err);

            })
    }

    componentDidMount() {
        this.getOffers();
    }


    render() {
        return (
            <div>
                {

                }
                <header>
                    <div class="header-area header-transparrent">
                        <div class="headder-top header-sticky">
                            <div class="container">
                                <div class="row align-items-center">
                                    <div class="col-lg-3 col-md-2">
                                        <div class="logo">
                                            <a href="index.html"><img src="assets/img/logo/logo.png" alt="" /></a>
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
                                                            <Link to="/signup" class="btn head-btn1">Créer un compte</Link>
                                                            <Link to="/signin" class="btn head-btn2">connexion</Link>
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


                    <div class="job-listing-area pt-120 pb-120">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-3 col-lg-3 col-md-4">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="small-section-tittle2 mb-45">
                                                <div class="ion">

                                                </div>
                                                <h4>Filter</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="job-category-listing mb-50">

                                        <div class="single-listing">
                                            <div class="small-section-tittle2">
                                                <h4>Mot clé</h4>
                                            </div>
                                            <div class="select-job-items2">
                                                <input className="form-control" onChange={(e) => { this.setState({ keywordsFilter: e.target.value }) }} />
                                            </div>

                                        </div>
                                        <div class="single-listing">
                                            <div class="small-section-tittle2">
                                                <h4>Catégory</h4>
                                            </div>
                                            <div class="select-job-items2">
                                                <select name="select" className="form-control" onChange={(e) => { this.setState({ categoryFilter: e.target.value }) }} >
                                                    <option value="">Tous les catégory</option>
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

                                        </div>
                                        <div class="single-listing">
                                            <div class="small-section-tittle2">
                                                <h4>Experience( en années )</h4>
                                            </div>
                                            <div class="select-job-items2">
                                                <select name="select" className="form-control" onChange={(e) => { this.setState({ experienceFilter: e.target.value }) }} >
                                                        <option value="">Tous</option>
                                                    <option value="+ 1 ans" >+ 1 ans</option>
                                                    <option value="+ 2 ans" >+ 2 ans</option>
                                                    <option value="+ 3 ans" >+ 3 ans</option>
                                                    <option value="+ 4 ans" >+ 4 ans</option>
                                                    <option value="+ 5 ans" >+ 5 ans</option>

                                                </select>


                                            </div>

                                        </div>




                                    </div>
                                </div>
                                <div class="col-xl-9 col-lg-9 col-md-8">
                                    <section class="featured-job-area">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="count-job mb-35">
                                                        <span>{this.state.posts.filter((o) => {
                                                    var res = true;

                                                    if (this.state.categoryFilter != '') {
                                                        res = res && (o.category == this.state.categoryFilter)
                                                    }

                                                    if (this.state.experienceFilter != '') {
                                                        res = res && (o.experience == this.state.experienceFilter)
                                                    }

                                                    if (this.state.keywordsFilter != '') {
                                                        res = (o.keywords.toLowerCase().indexOf(this.state.keywordsFilter.toLowerCase()) != -1)
                                                    }




                                                    return res;
                                                }



                                                ).length} offre trouvé</span>
                                                        <div class="select-job-items">


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            {
                                                this.state.posts.filter((o) => {
                                                    var res = true;

                                                    if (this.state.categoryFilter != '') {
                                                        res = res && (o.category == this.state.categoryFilter)
                                                    }

                                                    if (this.state.experienceFilter != '') {
                                                        res = res && (o.experience == this.state.experienceFilter)
                                                    }

                                                    if (this.state.keywordsFilter != '') {
                                                        res = (o.keywords.toLowerCase().indexOf(this.state.keywordsFilter.toLowerCase()) != -1)
                                                    }




                                                    return res;
                                                }



                                                ).map((o) => {

                                                    return (
                                                        <div class="single-job-items mb-30">
                                                            <div class="job-items">
                                                                <div class="company-img">
                                                                    <a href="#"><img src="assets/img/icon/job-list1.png" alt="" /></a>
                                                                </div>
                                                                <div class="job-tittle job-tittle2">
                                                                    <a href="#">
                                                                        <h4 style={{ textTransform: "capitalize" }}>{o.title} <br /> <small>{o.category}</small> </h4>
                                                                    </a>
                                                                    <ul>
                                                                        <li>{o.author.displayName}</li>
                                                                        <li><i class="fas fa-envelope"></i>{o.author.email}</li>
                                                                        <li>{o.salary}</li>
                                                                    </ul>

                                                                    <div style={{ width: 500 }}>
                                                                        {
                                                                            o.keywords.split(" ").map((k) => {
                                                                                return (<span className="badge badge-primary mr-1">{k}</span>);
                                                                            })
                                                                        }
                                                                    </div>

                                                                    <Link className="btn btn-outline-info my-3" to={'/offre/' + o.id} >plus de détails </Link>
                                                                </div>
                                                            </div>
                                                            <div class="items-link items-link2 f-right">
                                                                <a  >{o.type}</a>


                                                                <span>{



                                                                    new Date(o.date_time).toISOString().replace("T", " ").replace(".000Z", " ")



                                                                }</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }



                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>


                </main>
                 




            </div>
        );
    }
}


export default JobsPage;