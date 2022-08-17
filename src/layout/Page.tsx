import React from 'react';
import s from './Page.module.scss';
import Header from '../components/Header/Header';

const Page = ({ children }: any) => {
  return (
    <div className={s.pageContainer}>
      <Header />
      {children}
    </div>
  );
};
export default Page;
