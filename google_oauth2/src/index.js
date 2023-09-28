import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useGoogleLogin } from 'react-use-googlelogin'

import './index.css'

const App = () => {
  const { signIn, signOut, googleUser, isSignedIn } = useGoogleLogin({
    clientId: '192862003971-e3ne3er14ijgit447n760d6vsbcrq6g2.apps.googleusercontent.com',
  })

  console.log(googleUser)

  return (
    <div style={{ padding: '1rem' }}>
      { !isSignedIn && <button onClick={signIn} style={{ marginRight: '1rem' }}>
        Sign in
      </button>}
      {isSignedIn && <button onClick={signOut}>Sign Out</button>}

      {isSignedIn && (
        <div>
          <h1>{googleUser.profileObj.name}</h1>
          <h1>{googleUser.profileObj.fullName}</h1>
          <h1>{googleUser.profileObj.email}</h1>
          <img src={googleUser.profileObj.imageUrl} alt="Avatar." />
        </div>
      )}
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
