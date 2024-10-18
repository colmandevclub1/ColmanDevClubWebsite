import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import First from './pages/First';
import StudentsPage from './pages/StudentsPage/StudentsPage';


const ManageRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/board" element={<StudentsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default ManageRouter;
