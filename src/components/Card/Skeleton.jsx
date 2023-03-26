import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={290}
    height={290}
    viewBox="0 0 290 290"
    backgroundColor="#DEDEDE"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="16" ry="16" width="290" height="290" />
  </ContentLoader>
);

export default MyLoader;
