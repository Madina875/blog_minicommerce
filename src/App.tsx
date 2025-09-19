import { memo } from 'react';
import Main from './components/main/Main';

const App = () => {
  return (
    <div className="App">
      <h2>App</h2>
      <Main/>
    </div>
  );
};

export default memo(App);