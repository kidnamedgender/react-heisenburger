import { useEffect, useRef, useState } from 'react';
import cls from '../scss/modules/CategoriesAndSort.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCategory,
  changeSortBy,
  currentSortBySelector,
  currentCategorySelector,
} from '../redux/slices/filterSlice';

export const sortsBy = [
  { sortTitle: 'популярности', sortProp: 'rating' },
  { sortTitle: 'цене', sortProp: 'price' },
  { sortTitle: 'названию', sortProp: 'title' },
];

const CategoriesAndSort = ({ sortType, setSortType }) => {
  const currentCategory = useSelector(currentCategorySelector);
  const currentSortBy = useSelector(currentSortBySelector);
  const dispatch = useDispatch();

  const sortRef = useRef();
  const categories = ['Все', 'Говядина', 'Курица', 'Сигнатура'];
  const [popupIsActive, setPopupIsActive] = useState(false);

  const popupHandler = (sort) => {
    dispatch(changeSortBy(sort));
    setPopupIsActive(false);
  };

  useEffect(() => {
    const outsideHandler = (e) => {
      if (!e.path.includes(sortRef.current)) {
        setPopupIsActive(false);
      }
    };
    document.body.addEventListener('click', outsideHandler);
    return () => {
      document.body.removeEventListener('click', outsideHandler);
    };
  }, [popupIsActive]);

  return (
    <div className={cls.categories__sort}>
      <div className={cls.categories}>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => dispatch(changeCategory(category))}
              className={category === currentCategory ? cls.active : ''}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div ref={sortRef} className={cls.sort}>
        <div onClick={() => setPopupIsActive(!popupIsActive)} className="btn">
          <h3>сортировать по:</h3>
          <p>{currentSortBy.sortTitle}</p>
        </div>
        <div className={popupIsActive ? cls.sort__popup__active : cls.sort__popup__unactive}>
          <ul>
            {sortsBy.map((sort) => (
              <li
                onClick={() => popupHandler(sort)}
                className={currentSortBy.sortTitle === sort.sortTitle ? cls.active : ''}
                key={sort.sortTitle}>
                {sort.sortTitle}
              </li>
            ))}
          </ul>
        </div>
        <div className={cls.sort__arrow}>
          <img
            onClick={() => setSortType(!sortType)}
            src={sortType ? 'img/arrow-down-icon.png' : 'img/arrow-up-icon.png'}
            alt="DESC-sort-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesAndSort;
