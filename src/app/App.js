import './App.css';
import SearchBar from '../features/SearchBar/SearchBar';
import { Provider } from 'react-redux';
import { store } from './store';
import InitialView from '../features/Posts/InitialView/InitialView';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <nav className="App-nav">
          <p>
            LOGO
          </p>
          <SearchBar />
          <p>
            subreddits
          </p>
        </nav>
        <section>
          <InitialView />
        </section>
      </div>
    </Provider>
  );
}

export default App;
