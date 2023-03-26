import React from 'react';
import cls from '../scss/modules/NotFoundBlock.module.scss';
const EmptyBlock = ({ title, desc, image }) => {
  return (
    <div className={cls.wrapper}>
      {image ? <img src={image} alt="not-found" /> : ''}
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );
};

export default EmptyBlock;
