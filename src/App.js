import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import FoldersDetails from './components/FolderDetails';
import FoldersList from './components/FoldersList';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path={"/"} render={(props) => <FoldersList {...props} />} />
        <Route path={"/:id"} render={(props) => <FoldersDetails {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
