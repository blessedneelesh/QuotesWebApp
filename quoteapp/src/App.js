import "./App.css";

import AuthProvider from "./provider/AuthProvider";
import DataProvider from "./provider/DataProvider";
import Routes from "./routes";

function App() {
  return (
    <div>
      <AuthProvider>
        <DataProvider>
          <Routes />
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
