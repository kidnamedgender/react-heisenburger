import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cls from '../scss/modules/CardOnCart.module.scss';
import { Link } from 'react-router-dom';
import AddButton from '../UI/AddButton';
import { addItem, removeItem, cartItemSelector } from '../redux/slices/cartSlice';
const CardOnCart = ({ id, title, price, image }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(cartItemSelector(id));
  const addClickHandler = () => {
    const item = {
      id,
    };
    dispatch(addItem(item));
  };
  const removeClickHandler = () => {
    dispatch(removeItem(id));
  };
  return (
    <div className={cls.cart__block}>
      <Link to={`/${id}`}>
        <div className={cls.image}>
          <img src={image} alt="burger" />
        </div>
      </Link>
      <div className={cls.info}>
        <div className={cls.text}>
          <h2>{title}</h2>
          <h3>
            от <span>{price}</span>руб.
          </h3>
        </div>
      </div>
      <div className={cls.add__block}>
        <AddButton
          cartItem={cartItem}
          addClickHandler={addClickHandler}
          removeClickHandler={removeClickHandler}
        />
      </div>
    </div>
  );
};

export default CardOnCart;
