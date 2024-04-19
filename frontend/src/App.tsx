import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthProvider';
import { LoginLayout } from './components';
import Chat from './pages/Chat/Chat';
import Register from './pages/Register';

function App(): JSX.Element {
  return (
    <>
      <div className='bg-gray-100'>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={
                  <LoginLayout>
                    <Login />
                  </LoginLayout>
                }
              />
              <Route
                path='/register'
                element={
                  <LoginLayout>
                    <Register />
                  </LoginLayout>
                }
              />
              <Route
                path='/chatroom'
                element={
                  <LoginLayout>
                    <Chat />
                  </LoginLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
