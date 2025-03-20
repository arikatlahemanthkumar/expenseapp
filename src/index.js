import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import App from './redux-implementation/App'
import store from './redux-implementation/store'
import {Provider} from 'react-redux'
//import PhoneBillPayment from './Assignments/PhoneBillPayment';
//import DisplayCap from './Assignments/DisplayCapitals';
//import VowelSkip from './Assignments/VowelsSkip';
//import EmployeeSelection from './Assignments/SelectEmployee';
//import MarkAsComplete from './Assignments/MarkAsComplete';

console.log(store.getState())
store.subscribe(()=>{
    console.log("su",store.getState())
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
<Provider store = {store}>
<App/>
</Provider>
);


