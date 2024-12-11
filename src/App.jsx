import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader/index.jsx';
import PageTitle from './components/PageTitle.jsx';

import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import Docter from './pages/docter/Index.jsx';
import DocterEdit from './pages/docter/edit.jsx';
import DocterCreate from './pages/docter/create.jsx';
import Pasien from './pages/pasien/Index.jsx';
import PasienEdit from './pages/pasien/edit.jsx';
import PasienCreate from './pages/pasien/create.jsx';
import Obat from './pages/obat/Index.jsx';
import ObatEdit from './pages/obat/edit.jsx';
import ObatCreate from './pages/obat/create.jsx';
import Ruangan from './pages/ruangan/Index.jsx';
import RuanganEdit from './pages/ruangan/edit.jsx';
import RuanganCreate from './pages/ruangan/create.jsx';
import RekapMedisCreate from './pages/medis/create.jsx';
import RekapMedisEdit from './pages/medis/edit.jsx';
import User from './pages/user/Index.jsx';
import RekapMedis from './pages/medis/Index.jsx';
import SignUp from './pages/Authentication/SignUp';
import SignIn from './pages/Authentication/SignIn';
import { AppContext } from './Context/AppContext'

import PrivateRoute from './PrivateRoute.jsx';

function App() {
  // console.log('API URL:', API_URL);
  const { user } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        index
        element={
          <PrivateRoute>
            <PageTitle title="Dashboard | Rekap Medis" />
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path='/home'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* docter */}
      <Route path="docter">
        <Route index element={
          <PrivateRoute>
            <PageTitle title="Docter | Rekap Medis" />
            <Docter />
          </PrivateRoute>} />
        <Route path="create" element={
          <PrivateRoute>
            <PageTitle title="Tambah Docter | Rekap Medis" />
            <DocterCreate />
          </PrivateRoute>} />
        <Route path="edit/:id" element={
          <PrivateRoute>
            <PageTitle title="Edit Docter | Rekap Medis" />
            <DocterEdit />
          </PrivateRoute>} />
      </Route>
      {/* pasien */}
      <Route path="pasien">
        <Route index element={
          <PrivateRoute>
            <PageTitle title="Pasien | Rekap Medis" />
            <Pasien />
          </PrivateRoute>} />
        <Route path="create" element={
          <PrivateRoute>
            <PageTitle title="Tambah | Rekap Medis" />
            <PasienCreate />
          </PrivateRoute>} />
        <Route path="edit/:id" element={
          <PrivateRoute>
            <PageTitle title="Edit | Rekap Medis" />
            <PasienEdit />
          </PrivateRoute>} />
      </Route>
      {/* obat */}
      <Route path="obat">
        <Route index element={
          <PrivateRoute>
            <PageTitle title="Obat | Rekap Medis" />
            <Obat />
          </PrivateRoute>} />
        <Route path="create" element={
          <PrivateRoute>
            <PageTitle title="Tambah Obat | Rekap Medis" />
            <ObatCreate />
          </PrivateRoute>} />
        <Route path="edit/:id" element={
          <PrivateRoute>
            <PageTitle title="Edit Obat | Rekap Medis" />
            <ObatEdit />
          </PrivateRoute>} />
      </Route>
      {/* ruangan */}
      <Route path="ruangan">
        <Route index element={
          <PrivateRoute>
            <PageTitle title="Ruangan | Rekap Medis" />
            <Ruangan />
          </PrivateRoute>} />
        <Route path="create" element={
          <PrivateRoute>
            <PageTitle title="Tambah Ruangan | Rekap Medis" />
            <RuanganCreate />
          </PrivateRoute>} />
        <Route path="edit/:id" element={
          <PrivateRoute>
            <PageTitle title="Edit Ruangan | Rekap Medis" />
            <RuanganEdit />
          </PrivateRoute>} />
      </Route>

      <Route
        path="/medis/create"
        element={
          <PrivateRoute>
            <PageTitle title="Update Docter | Rekap Medis" />
            <RekapMedisCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/laporan"
        element={
          <PrivateRoute>
            <PageTitle title="Update Docter | Rekap Medis" />
            <RekapMedis />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <PageTitle title="Update Docter | Rekap Medis" />
            <User />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <PageTitle title="Profile | Rekap Medis" />
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path='/signin'
        element={user ?
          <>
            <Navigate to={'/home'} />
          </>
          :
          <>
            <PageTitle title="Signin | Rekap Medis" />
            <SignIn />
          </>
        }
      />
      <Route
        path='/signup'
        element={
          <>
            <PageTitle title="Signup | Rekap Medis" />
            <SignUp />
          </>
        }
      />
    </Routes>
  );
}

export default App;
