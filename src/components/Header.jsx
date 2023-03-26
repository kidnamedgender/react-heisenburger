import { useCallback, useState } from 'react';
import cls from '../scss/modules/Header.module.scss';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { clearFilters } from '../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../redux/slices/cartSlice';
import { changeSearch } from '../redux/slices/filterSlice';

const Header = () => {
  const [inputValue, setInputValue] = useState('');
  const { items, totalPrice } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const updateSearchValue = useCallback(
    debounce((value) => dispatch(changeSearch(value)), 250),
    [],
  );

  const onChangeSearchValue = (e) => {
    setInputValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={cls.header}>
      <div className={cls.wrapper}>
        <div className={cls.content}>
          <div className={cls.header__row}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div onClick={() => dispatch(clearFilters())} className={cls.logo__block}>
                <img className={cls.logo} src="img/burgers/4.png" alt="logo" />
                <div className={cls.logo__title}>
                  <h3>Хайзенбэрг</h3>
                </div>
              </div>
            </Link>
            <div className={cls.search}>
              <input
                onChange={(e) => onChangeSearchValue(e)}
                value={inputValue}
                type="text"
                placeholder="Поиск бургера..."
              />
            </div>
            <div className={cls.menu}>
              <ul>
                <li>
                  <Link to="/cart">
                    <div className={cls.image}>
                      <div className={cls.cart}>
                        <img src="img/cart-icon-white.png" alt="cart-icon" />
                        {items.length > 0 && (
                          <>
                            <h4>{items.reduce((acc, item) => (acc += item.quantity), 0)}</h4>
                            <div className={cls.total__price}>
                              <h3>{totalPrice} руб.</h3>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className={cls.image}>
                    <div className={cls.profile}>
                      <img src="img/user-icon-white.png" alt="user-icon" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
