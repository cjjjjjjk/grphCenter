import React from 'react';
import './App.css';
import Home from './page/Home';

const App: React.FC = () => {
  return (
    <div>
      <header className="h-[72px] border-black border-b-2 flex items-center justify-center  " >
        <h1 className="text-center text-4xl justify-center">Welcome to grphCenter</h1>
      </header>
      <main>
        <h2>--- Welcome page !</h2>
        <Home />
      </main>
    </div>
  );
}

export default App;
