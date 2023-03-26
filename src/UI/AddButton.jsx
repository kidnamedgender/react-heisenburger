import React from 'react';
import cls from '../scss/modules/AddButton.module.scss';
const AddButton = ({ cartItem, addClickHandler, removeClickHandler }) => {
  return (
    <div className={cls.add__block}>
      <div className={cls.add}>
        <div>
          {cartItem ? (
            <img onClick={removeClickHandler} src="img/minus-icon-white.png" alt="plus-icon" />
          ) : (
            ''
          )}
          <img onClick={addClickHandler} src="img/plus-icon-white.png" alt="plus-icon" />
        </div>
        {cartItem ? <h2>{cartItem.quantity}</h2> : ''}
      </div>
    </div>
  );
};

export default AddButton;
