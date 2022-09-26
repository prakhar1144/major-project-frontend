import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Pages/Authentication/SignIn';
import SignUp from './Pages/Authentication/SignUp';
import Footer from './Pages/components/Footer';
import Navbar from './Pages/components/Navbar/Navbar';
import Homepage from './Pages/Homepage'
import NearbyStation from './Pages/NearbyStation';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/nearby" element={<NearbyStation/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
