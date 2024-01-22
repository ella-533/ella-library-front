import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/user/HomePage';
import EachBook from './pages/user/EachBook';
import BooksPage from './pages/admin/BooksPage';
import UpdateBooks from './pages/admin/UpdateBooks';
import AllUsers from './pages/admin/superadmin/AllUsers';
import EachUser from './pages/admin/superadmin/EachUser';
import Contact from './pages/admin/Contact';
import Login from './pages/user/Login';
import CreateBook from './pages/admin/CreateBook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Book/:id' element={<EachBook />} />
        
        <Route path='/Admin/Books' element={<BooksPage />} />
        <Route path ='/Admin/CreateBook' element={<CreateBook />}/>
        <Route path='/Admin/UpdateBook' element={<UpdateBooks />} />

        <Route path='/Admin/Users' element={<AllUsers />} />
        <Route path='/Admin/User/:id' element={<EachUser />} />
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
