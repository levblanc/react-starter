import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyUserInfo } from '../../store/logon';
import { statusType } from '../../store/utils';
import paths from '../../routes/paths';
import './style.scss';

function Logon() {
  // Example: change page title before page render
  useEffect(() => {
    document.title = 'Logon | UI Courses';
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // set initial states
  const [verifyUsernameStatus, setVerifyUsernameStatus] = useState(
    statusType.idle
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const submitUserInfo = async () => {
    if (verifyUsernameStatus === statusType.idle) {
      try {
        setVerifyUsernameStatus(statusType.loading);
        const res = await dispatch(
          verifyUserInfo({ username, password })
        ).unwrap();

        if (res && res.data === 'success') {
          setVerifyUsernameStatus(statusType.idle);
          navigate(paths.courses);
        }
      } catch (error) {
        setVerifyUsernameStatus(statusType.idle);
        // inline error
      }
    }
  };

  return (
    <div className='userInfo'>
      <input
        id='username'
        value={username}
        placeholder='username'
        // for windows: onchange={(e) => setUsername(e.value)}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        id='password'
        value={password}
        placeholder='password'
        // for Windows: onChange={(e) => setPassword(e.value)}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMsg ? <p>{errorMsg}</p> : ''}
      <button type='submit' onClick={submitUserInfo}>
        Logon
      </button>
    </div>
  );
}

export default Logon;
