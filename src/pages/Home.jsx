import { Fragment, useState, useEffect, useMemo, useRef } from 'react';
import CategoriesAndSort, { sortsBy } from '../components/CategoriesAndSort';
import Card from '../components/Card/Card';
import Skeleton from '../components/Card/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, filterSelector } from '../redux/slices/filterSlice';
import { fetchGoods, goodsSelector } from '../redux/slices/goodSlice';
import { useNavigate } from 'react-router-dom';
import NotFoundBlock from '../components/NotFoundBlock.jsx';
import qs from 'qs';

const Home = () => {
  const { currentCategory, currentSortBy, searchValue } = useSelector(filterSelector);
  const { burgers, status } = useSelector(goodsSelector);
  const [sortType, setSortType] = useState(false);
  const isSearchRef = useRef(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortBy = sortsBy.find((obj) => obj.sortProp === params.sortBy);
      dispatch(setFilters({ ...params, sortBy }));
      isSearchRef.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortBy: currentSortBy.sortProp,
          category: currentCategory,
        },
        { addQueryPrefix: true },
      );
      if (!(queryString === '?sortBy=rating&category=%D0%92%D1%81%D0%B5')) {
        navigate(queryString);
      } else {
        navigate('');
      }
    }
    isMounted.current = true;
  }, [currentCategory, currentSortBy, sortType, navigate]);

  useEffect(() => {
    const getBurgers = async () => {
      dispatch(fetchGoods({ currentCategory, currentSortBy, sortType }));
    };
    if (!isSearchRef.current) {
      getBurgers();
    }
    isSearchRef.current = false;
    window.scrollTo(0, 0);
  }, [currentCategory, currentSortBy, sortType, dispatch]);

  const searchedBurgers = useMemo(() => {
    return burgers.filter((burger) =>
      burger.title.trim().toLowerCase().includes(searchValue.trim().toLowerCase()),
    );
  }, [searchValue, burgers]);

  const renderBurgers = () => {
    return status === 'pending' ? (
      [...new Array(6)].map((_, id) => <Skeleton key={id} />)
    ) : !searchedBurgers.length ? (
      <NotFoundBlock
        title="Таких бургеров у нас нет!🤪"
        desc="Попробуйте другие, они могут оказаться вполне ничего."
      />
    ) : (
      searchedBurgers.map((burger) => <Card key={burger.id} {...burger} />)
    );
  };
  if (status === 'rejected') {
    return (
      <NotFoundBlock
        title="Что-то пошло не так... 😵💫"
        desc="Произошла ошибка при попытке получить бургеры. Попробуйте позже."
        image="img/not-found.gif"
      />
    );
  }
  return (
    <Fragment>
      <CategoriesAndSort setSortType={setSortType} sortType={sortType} />
      <h1>Все бургеры</h1>
      <div className="blocks">{renderBurgers()}</div>
    </Fragment>
  );
};

export default Home;
