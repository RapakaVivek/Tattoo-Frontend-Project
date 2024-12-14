import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import MainArtists from './Components/MainArtists';
import Login from './Components/Login'
import Register from './Components/Register';
import PasswordReset from './Components/ForgetPassword'
import SelectProductById from './Components/SelectProductById';
import Design from './Components/Design';
import MainCartPage from './Components/MainCartPage';
import AboutMain from './Components/AboutMain';
import ArtistDetailPage from './Components/ArtistDetailPage'
import MainContactpage from './Components/MainContactpage';
import ResetPassword from './Components/ResetPass';
import OTPform from './Components/OtpForm';
import MainProfilepage from './Components/MainProfilepage';
import MainBooking from './Components/MainBooking';
import Appointment from './Components/Appointment';

function App() {
  return (
    <div>

  <BrowserRouter>
  <Routes>
    <Route path='/home' element={<Home />} />
    <Route path='/design' element={<Design />}/>
    <Route path='/selectProduct' element={<SelectProductById />} />
    <Route path='/Artists' element={<MainArtists />} />
    <Route path='//ArtistDetailpage' element={<ArtistDetailPage />} />
    <Route path='/Profile' element={<MainProfilepage  />} />
    <Route path='/cart' element={<MainCartPage />} />
    <Route path='' element={<Login />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/forgetpassword' element={<PasswordReset />} />
    <Route path='/reset-confirmation' element={<OTPform />} />
    <Route path='/newpassword' element={<ResetPassword />} />
    <Route path='/about' element={<AboutMain />} />
    <Route path='/contact' element={<MainContactpage />} />
    <Route path='/booking' element={<Appointment />} />
    <Route path='/bookings' element={<MainBooking />} />
  </Routes>  
  </BrowserRouter>
   
    </div>
  );
}

export default App;
