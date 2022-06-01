import React from 'react';

const page = {
  minHeight: 'calc(100vh - 10rem)'
};

export default function PageContainer({ children }) {
  return (
    <div>
      <div style={page}>
        {children}
      </div>
    </div>
  );
}
