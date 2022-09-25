import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Pages/Authentication/SignIn';
import SignUp from './Pages/Authentication/SignUp';
import Homepage from './Pages/Homepage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/user/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
