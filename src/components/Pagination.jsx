import React from 'react';
import cls from '../scss/modules/Pagination.module.scss';
export const Pagination = ({ setCurrentPage, currentPage }) => {
  const pages = [1, 2, 3];
  return (
    <div className={cls.main}>
      <ul>
        <li onClick={() => (currentPage > 1 ? setCurrentPage(currentPage - 1) : '')}>{'<'}</li>
        {pages.map((num) => (
          <li
            key={num}
            className={currentPage === num ? cls.active : ''}
            onClick={() => setCurrentPage(num)}>
            {num}
          </li>
        ))}
        <li onClick={() => (currentPage < pages.length ? setCurrentPage(currentPage + 1) : '')}>
          {'>'}
        </li>
      </ul>
    </div>
  );
};
