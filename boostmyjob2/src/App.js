import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUpPage from './pages/SignupPage';
import AdminJobOffersList from './pages/AdminJobOffersList';
import WelcomePage from './pages/WelcomePage';
import AdminAddJob from './pages/AdminAddJob';
import JobsPage from './pages/JobsPage';
import OffreDetails from './pages/OffreDetails';
import CondidateOffresPage from './pages/CondidateOffresPage';
import AdminOffreSubmitions from './pages/AdminOffreSubmitions';
import UserProfile from './pages/ProfileUser';
import AddCV from './pages/CreateCV';
import CondidateCvDetails from './pages/CondidateCVDetails';

function App() {
  return (
    <Router>
      <div>

        <Switch>
        <Route path="/" component={WelcomePage} exact />
        <Route path="/welcome" component={WelcomePage} exact />
        
        <Route path="/filteroffers" component={JobsPage} exact />
        <Route path="/offre/:id" component={OffreDetails} exact />
        

        
        
        <Route path="/signin" component={SignInPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/profile" component={HomePage} exact />
        <Route path="/profile/admin/offres" component={AdminJobOffersList} exact />
        <Route path="/profile/admin/add" component={AdminAddJob} exact />

        
        <Route path="/profile/condidate" component={UserProfile} exact />
        <Route path="/profile/cv/add" component={AddCV} exact />
        <Route path="/users/cv/:id" component={CondidateCvDetails} exact />
        
        

        
        <Route path="/profile/condidate/listoffres" component={CondidateOffresPage} exact />
        <Route path="/profile/condidate/listoffres/condidatures/:id" component={AdminOffreSubmitions} exact />
        

        
        
        

        
          



        </Switch>
      </div>
    </Router>
  );
}

export default App;
