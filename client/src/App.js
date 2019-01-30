import React, { Component } from 'react';
import './App.css';
import { isUndefined } from 'util';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import MedComponent from './components/MedComponent';
import EditMedComponent from './components/EditMedComponent';
import LogInComponent from './components/LogInComponent';
import NavBarComponent from './components/NavBarComponent';
import AddMedComponent from './components/AddMedComponent';
import RegisterComponent from './components/RegisterComponent';
import IngrComponent from './components/IngrComponents';
import EditIngrComponent from './components/EditIngrComponent';
import AddIngrComponent from './components/AddIngrComponent';
import RecComponent from './components/RecComponent';
import AddRecComponent from './components/AddRecComponent';
import ShowRecComponent from './components/ShowRecComponent';
import OrderComponent from './components/OrderComponent';
import AddOrderComponent from './components/AddOrderComponent';
import EditOrderComponent from './components/EditOrderComponent';
import StorageComponent from './components/StorageComponent';
import AddStorageComponent from './components/AddStorageComponent';
import EditStorageComponent from './components/EditStorageComponent';
import ShowUserComponent from './components/ShowUser';
import HomeComponent from './components/HomeComponent';
import EditRecComponent from './components/EditRecComponent';

const server = axios.create({ baseURL: 'http://localhost:4000' })

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      user_id: '',
      user_name: 'Not Loged in',
      user_loged_in: false,
      user_rank: 'none'
    };

    this.handle_login = this.handle_login.bind(this);
    this.handle_logout = this.handle_logout.bind(this);
  }

  handle_login(user) {
    if (!isUndefined(user)) {
      this.setState({ user: user, user_id: user._id, user_name: user.username, user_loged_in: true, user_rank: user.rank });
      console.log("user loged in");
    }
    else{
      console.log("fail log in");
      this.setState({user_name: "Login Failed"});
    }
  }

  handle_logout() {
    server.post('/user/logout', { username: this.state.user_name});
    console.log("Login out " + this.state.user_name);
    this.setState({ user: "", user_id: "", user_name: "User Loged Out", user_loged_in: false, user_rank: "none" });
  }



  render() {
    return (
      <BrowserRouter>
        <div className="Main">
          <Route path='/' component={(props1) => <NavBarComponent user_name={this.state.user_name} user_loged_in={this.state.user_loged_in} handle_logout={this.handle_logout.bind(this)} history={props1.history} />} />
          <Route exact path='/' component={HomeComponent} />
          <Route exact path='/med' component={(props2) => <MedComponent user_rank={this.state.user_rank} history={props2.history} />} />
          <Route exact path='/med/:id' component={EditMedComponent} />
          <Route exact path='/med_add' component={AddMedComponent} />
          <Route exact path='/ingr' component={(propsi) => <IngrComponent user_rank={this.state.user_rank} history={propsi.history} />} />
          <Route exact path='/ingr/:id' component={EditIngrComponent} />
          <Route exact path='/ingr_add' component={AddIngrComponent} />
          <Route exact path='/rec' component={(propsr) => <RecComponent user_rank={this.state.user_rank} history={propsr.history} />} />
          <Route exact path='/rec_add' component={AddRecComponent} />
          <Route exact path='/rec/:id' component={EditRecComponent} />
          <Route exact path='/med_show/:id' component={ShowRecComponent} />
          <Route exact path='/order' component={(propso) => <OrderComponent user={this.state.user} history={propso.history} />} />
          <Route exact path='/order_add/:id' component={AddOrderComponent} />
          <Route exact path='/order/:id' component={EditOrderComponent} />
          <Route exact path='/storage' component={(propss) => <StorageComponent user={this.state.user} history={propss.history} />} />
          <Route exact path='/storage_add' component={AddStorageComponent} />
          <Route exact path='/storage/:id' component={EditStorageComponent} />
          <Route exact path='/users' component={(propsu) => <ShowUserComponent user_rank={this.state.user_rank} history={propsu.history} />} />
          <Route exact path='/login' component={(propsl) => <LogInComponent handle_login={this.handle_login.bind(this)} history={propsl.history} />} />
          <Route exact path='/register' component={(propsr) => <RegisterComponent history={propsr.history} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
