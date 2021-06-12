import React from 'react';

const Landing: React.FC<{ code: string }> = ({ code }) => {
  console.log('Code:', code);

  return (
    <div>
      <h1>Hello Landing</h1>
      <p>{code}</p>
    </div>
  );
};

export default Landing;
