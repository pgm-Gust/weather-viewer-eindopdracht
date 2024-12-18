// src/app/components/design/LoadingSpinner.js
import React from 'react';
// import { ClipLoader } from 'react-spinners';

const LoadingSpinner = ({ loading }) => {
  return loading ? <ClipLoader color="#36d7b7" loading={loading} size={50} /> : null;
};

export default LoadingSpinner;
