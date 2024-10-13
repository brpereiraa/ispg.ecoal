import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Contact from './pages/contact';
import TermOfUse from './pages/termOfUse';
import Inscription from './pages/inscription';
import Connection from './pages/connection';
import AuthAccount from './pages/authaccount';
import ModifyArticle from './pages/modifyarticle';
import About from './pages/about';
import Header from './Header';


import Footer from './Footer';
import { useState } from 'react';
import Account from './pages/account';
import Article from './pages/article';
import CreateArticle from './pages/create_article';
import TermsOfUse from './pages/termOfUse';
import axios from 'axios';
import Season from './pages/season';
import SeasonArticles from './pages/season_articles';
function App() {
  const server = "http://localhost:8000/api/"
  const [authorization, setAuthorization] = useState(null);
  const [user,setUser] = useState(null);

  async function updateUser(){
    try{
      const response = await axios.get(server + "user",{
        headers: {
          Authorization : authorization
        }
      });
      setUser(response.data);
    } catch (err){
      console.log(err.response.data)
    }
  }

  return (
    <div className='w-screen min-h-screen flex flex-col font-dm'>
        <BrowserRouter> 
        <Header user={user}/>
        <main className='grow'>
          <Routes>
            <Route path="/" element={<Home server={server} user={user}/>}/>
            <Route path="/register" element={<Inscription server={server} user={user} changeUser={setUser} changeAuthorization={setAuthorization}/>}/>
            <Route path="/login" element={<Connection server={server} user={user} changeUser={setUser} changeAuthorization={setAuthorization}/>}/>
            <Route path="/account" element={<Account server={server} user={user} authorization={authorization} updateUser={updateUser} changeUser={setUser}/>}/>
            <Route path='/articles/create' element={<CreateArticle server={server} user={user} authorization={authorization} updateUser={updateUser} changeUser={setUser}/>}/>
            <Route path='/articles/:id' element={<Article server={server} user={user} authorization={authorization}/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/termOfUse" element={<TermOfUse/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/seasons/:season" element={<Season server={server}/>}/>
            <Route path="/seasons/:season/articles" element={<SeasonArticles server={server}/>}/>
          </Routes>
        </main>
        <Footer/>
        </BrowserRouter> 
    </div>
  );
}

export default App;
