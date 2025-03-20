import "../Styles.css"
import  { useState } from 'react';
export default function PhoneBillPayment() {
  const [provider, setProvider] = useState('vodafone');

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
  };

  return (
    <div className="App">
      <h1>Pay Your {provider.charAt(0).toUpperCase() + provider.slice(1)} Bill</h1>

      <label>
        <input
          type="radio"
          value="vodafone"
          checked={provider === 'vodafone'}
          onChange={handleProviderChange}
        />
        Vodafone
        <br/>
      </label>

      <label>
        <input
          type="radio"
          value="airtel"
          checked={provider === 'airtel'}
          onChange={handleProviderChange}
        />
        Airtel
        <br/>
      </label>

      <label>
        <input
          type="radio"
          value="jio"
          checked={provider === 'jio'}
          onChange={handleProviderChange}
        />
        jio
        <br/>
      </label>

      <input
        type="text"
        placeholder={`Enter your ${provider} number`}
      />
    </div>
  );
}

