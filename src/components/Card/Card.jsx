import React from 'react';
import cls from '../../scss/modules/Card.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, cartItemSelector } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
const Card = ({ id, title, image, price }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(cartItemSelector(id));
  const addClickHandler = () => {
    const item = {
      id,
      title,
      image,
      price,
    };
    dispatch(addItem(item));
  };

  return (
    <div className={cls.block}>
      <div onClick={addClickHandler} className={cls.add__block}>
        <div className={cls.add}>
          <h2>
            <img src="img/plus-icon-white.png" alt="plus-icon" />
            {cartItem && <span>{cartItem ? cartItem.quantity : 0}</span>}
          </h2>
        </div>
      </div>
      <Link to={`/${id}`} style={{ all: 'unset', cursor: 'pointer' }}>
        <div className={cls.info}>
          <div className={cls.text}>
            <h2>это...</h2>
            <h2>{title}</h2>
          </div>
          <div className={cls.image}>
            <img src={image} alt="burger" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
