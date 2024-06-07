import { BrowserRouter,  Route,  Routes } from "react-router-dom";
import HomePage from "./pages/guest/HomePage";
import BooksPage from "./pages/guest/BooksPage";
import AboutPage from "./pages/guest/AboutPage";
import LoginPage from "./pages/guest/LoginPage";
import BookDetailsPage from "./pages/guest/BookDetailsPage";

import ProfilePage from "./pages/guest/ProfilePage";
import CreateBookPage from "./pages/admin/CreateBook";
import DashboardPage from "./pages/admin/DashboardPage";
import AllBooks from "./pages/admin/AllBooks";
import UpdateBook from "./pages/admin/UpdateBook";
import UsersPage from "./pages/admin/UsersPage";
import RegisterPage from "./pages/guest/RegisterPage";
import FavoritePage from "./pages/guest/FavoritePage";


function App(){
  return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/book/details/:id" element={<BookDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/favorite" element={<FavoritePage />} />

          

                       {/* //Admin// */}
          <Route path="/admin/" element={<DashboardPage />} />
          <Route path="/createbook" element={<CreateBookPage />} />
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/updatebook/:id" element={<UpdateBook />} />
          <Route path="/users" element={<UsersPage />} />



        </Routes>
      </BrowserRouter>
  )
}
export default App;