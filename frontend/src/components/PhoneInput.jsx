import React from 'react';

const PhoneInput = ({ value, onChange, placeholder }) => {
  const handlePhoneChange = (e) => {
    let inputValue = e.target.value;
    
    // Allow only digits and format as E.164
    const numericValue = inputValue.replace(/[^\d+]/g, '');
    
    // Ensure it starts with +
    let formattedValue = numericValue;
    if (!formattedValue.startsWith('+') && formattedValue.length > 0) {
      formattedValue = '+' + formattedValue;
    }
    
    // Limit to reasonable length
    if (formattedValue.length <= 16) { // Max length for international numbers
      onChange(formattedValue);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </div>
      <input
        type="tel"
        value={value}
        onChange={handlePhoneChange}
        placeholder={placeholder || "+1 (234) 567-8900"}
        className="w-full py-3 pl-12 pr-4 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
};

export default PhoneInput;