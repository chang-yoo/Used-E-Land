import React from 'react';

const page = {
  minHeight: 'calc(100vh - 20vh)'
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
