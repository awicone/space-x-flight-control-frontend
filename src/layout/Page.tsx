import React, { ReactNode } from 'react';
import s from './Page.module.scss';
import Header from '../components/Header/Header';

interface PageProps {
  children: ReactNode
}
const Page = (props: PageProps) => {
  return (
    <div className={s.pageContainer}>
      <Header />
      {props.children}
    </div>
  );
};
export default Page;
