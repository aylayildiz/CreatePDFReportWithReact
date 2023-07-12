import { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import influencerData from './influencerData';
import PDFReport from './PDFReport';

const columns = useMemo(
  () => [
    {
      Header: 'NAME',
      accessor: 'name',
    },
    {
      Header: 'AGE',
      accessor: 'age',            
    },
    {
      Header: 'WORK AT',
      accessor: 'WorkAt'      
    }
  ]
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>        
      </header>
      <PDFReport data={influencerData} columns={columns} raporHeader={'Influencer List'} />
    </div>
  );
}

export default App;
