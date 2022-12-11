import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SmartContractContext } from './Context/SmartContract';
import SignIn from './Pages/Authentication/SignIn';
import SignUp from './Pages/Authentication/SignUp';
import Footer from './Pages/components/Footer';
import Navbar from './Pages/components/Navbar/Navbar';
import CustomerDashboard from './Pages/CustomerDashboard';
import Homepage from './Pages/Homepage'
import NearbyStation from './Pages/NearbyStation';
import ProviderDashboard from './Pages/ProviderDashboard';

function App() {
  const { checkIfConnectedInPast } = React.useContext(SmartContractContext);

  useEffect(() => {
    checkIfConnectedInPast();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/nearby" element={<NearbyStation />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
