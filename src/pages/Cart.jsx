import React, { Fragment } from 'react';
import CardOnCart from '../components/CardOnCart';
import cls from '../scss/modules/Cart.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { clearItems, cartSelector } from '../redux/slices/cartSlice';
import NotFoundBlock from '../components/NotFoundBlock';
const Cart = () => {
  const { items, totalPrice } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const clickRemoveHandler = () => {
    if (window.confirm('Вы действительно хотите очистить корзину?')) {
      dispatch(clearItems());
    }
  };

  if (!items.length) {
    return (
      <NotFoundBlock
        title="Ваша корзина пуста! 🥴"
        desc="Попробуйте добавить бургеров в корзину с главной страницы. Это не сложно. Но вкусно!"
        image="img/not-found.gif"
      />
    );
  }

  return (
    <Fragment>
      <div className={cls.top__row}>
        <h1>Корзина</h1>
        <p onClick={clickRemoveHandler}>
          <img src="img/trash-icon.png" alt="trash-icon" /> Очистить корзину
        </p>
      </div>
      <div>
        {items.map((item) => (
          <CardOnCart key={item.id} {...item} />
        ))}
      </div>
      <div className={cls.totalPrice}>
        <h2>Итоговая цена</h2>
        <h3>
          <span>{totalPrice}</span> руб.
        </h3>
      </div>
    </Fragment>
  );
};

export default Cart;
