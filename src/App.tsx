import 'react-clock/dist/Clock.css';
import { Link } from 'react-router-dom';
function App() {
  return (
    <div>
      <ul>
        {/* <li>
          <Link to="/dashBoard01" >DashBoard01</Link>
        </li>
        <li>
          <Link to="/dashBoard02">DashBoard02</Link>
        </li>
        <li>
          <Link to="/dashBoard03">DashBoard03</Link>
        </li>
        <li>
          <Link to="/dashBoard04">DashBoard04</Link>
        </li> */}
        <li>
          <Link to="/dashboard">DashBoard</Link>
        </li>
        <li>
          <Link to="/mamory">Mamory</Link>
        </li>
        <li>
          <Link to="/setting">Setting</Link>
        </li>
      </ul>
    </div >
  );
}

export default App;
