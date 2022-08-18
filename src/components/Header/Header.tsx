import React from 'react';
import s from './Header.module.scss';
import { HomeOutlined } from '@ant-design/icons';
import routes from '../Router/routes';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={s.headerContainer}>
      <HomeOutlined className={s.homeIcon} onClick={() => navigate(routes.index)} />
      <div className={s.headerCenter}>
        <h1 className={s.headerTitle}>Explore the space</h1>
      </div>

    </div>
  );
};
export default Header;
