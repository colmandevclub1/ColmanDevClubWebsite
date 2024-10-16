import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from 'src/ui/Navbar';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import SyllabusPage from './pages/SyllabusPage/SyllabusPage';
import { Footer } from './components';
import { SignInPage, SignUpPage } from '../auth/pages';
import { AuthContextProvider } from '../auth/authContext';
import ProtectedRoute from 'src/utils/protectedRoutes';


const LandingRouter = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          {/* an example of how to use the protected route */}
          <Route path="/team" element={<ProtectedRoute><TeamPage /> </ProtectedRoute>} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
};


export default LandingRouter;
