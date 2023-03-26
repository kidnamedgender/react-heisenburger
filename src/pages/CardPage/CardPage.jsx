import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card/Card';
import AddButton from '../../UI/AddButton';
import Skeleton from '../../components/Card/Skeleton';
import NotFoundBlock from '../../components/NotFoundBlock';
import { fetchGood } from '../../redux/slices/goodIdSlice';
import { useParams } from 'react-router-dom';
import cls from '../../scss/modules/CardPage.module.scss';
import axios from 'axios';
import { addItem, cartItemSelector, removeItem } from '../../redux/slices/cartSlice';
import MyLoader from './Skeleton';

const CardPage = () => {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { burger, status } = useSelector((state) => state.goodId);
  const cartItem = useSelector(cartItemSelector(burger.id));
  useEffect(() => {
    dispatch(fetchGood({ id }));
  }, [dispatch, id]);
  const addClickHandler = () => {
    const item = {
      id: burger.id,
      title: burger.title,
      image: burger.image,
      price: burger.price,
    };
    dispatch(addItem(item));
  };
  const removeClickHandler = () => {
    dispatch(removeItem(burger.id));
  };
  useEffect(() => {
    setIsLoading(true);
    const getDrinks = async () => {
      try {
        const res = await axios.get('https://6410bdf72fcea003328ba02f.mockapi.io/drinks');
        setDrinks(res.data);
        setIsLoading(false);
      } catch (err) {
        alert('Ошибка запроса');
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getDrinks();
    window.scroll(0, 0);
  }, []);
  const renderDrinks = () => {
    return isLoading
      ? [...new Array(6)].map((_, id) => <Skeleton key={id} />)
      : drinks.map((drink) => <Card key={drink.id} {...drink} />);
  };

  const renderBurger = () => {
    return status === 'pending' ? (
      <MyLoader />
    ) : (
      <div className={cls.burger__page}>
        <div className={cls.information__wrapper}>
          <div className={cls.image__block}>
            <div className={cls.image}>
              <img src={burger.image} alt={burger.title} />
            </div>
          </div>
          <div className={cls.inf}>
            <div className={cls.desc}>
              <h2>{burger.desc}</h2>
              <h1>{burger.title}</h1>
              <p>{burger.compound ? burger.compound.map((ing) => ing.toLowerCase() + ', ') : []}</p>
            </div>
            <div className={cls.bottom__row}>
              <div className={cls.price}>
                <h2>
                  от <span>{burger.price}</span> руб.
                </h2>
              </div>
              <AddButton
                addClickHandler={addClickHandler}
                cartItem={cartItem}
                removeClickHandler={removeClickHandler}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (status === 'rejected') {
    return (
      <NotFoundBlock
        title="Что-то пошло не так... 😵💫"
        desc="Произошла ошибка при попытке получить бургер. Попробуйте позже."
        image="img/not-found.gif"
      />
    );
  }
  return (
    <Fragment>
      <div className="more">
        {renderBurger()}
        <h1>Зачем же в сухомятку?</h1>
        <div className="blocks">{renderDrinks()}</div>
      </div>
    </Fragment>
  );
};

export default CardPage;
