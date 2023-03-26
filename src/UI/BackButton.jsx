import React from 'react';
import cls from '../scss/modules/BackButton.module.scss';
const BackButton = () => {
  return (
    <div className={cls.image__back}>
      <div className={cls.back}>
        <img src="img/back-icon-white.png" alt="back-icon" />
      </div>
    </div>
  );
};

export default BackButton;
