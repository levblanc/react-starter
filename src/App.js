import routes from './routes';
import { useRoutes } from 'react-router-dom';
import './App.scss';

function App() {
  const elements = useRoutes(routes);
  return <div className='App'>{elements}</div>;
}

export default App;
