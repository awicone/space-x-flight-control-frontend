import React, { useState } from 'react';
import s from './FlightCard.module.scss';
import { Badge, Skeleton } from 'antd';
import { CardInfo } from '../../types/CardInfo';
import { useNavigate } from 'react-router-dom';
import LaunchImage from '../LaunchImage/LaunchImage';

const FlightCard = ({ id, name, success, details, date_local, status, loading, icon }: CardInfo) => {
  const [onHold, setOnHold] = useState(false);
  const navigate = useNavigate();

  const dragStartHandler = (e: any) => {
    e.dataTransfer.setData('cardInfo', JSON.stringify({ id, status }));
    e.target.className += ' ohhold';
    setTimeout(() => {
      setOnHold(true);
    }, 0);
  };

  const dragEndHandler = () => {
    setOnHold(false);
  };

  const onDragOverHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className === 'card') {
      setTimeout(() => {
        e.target.className = 'card anotherCardOnTop';
      }, 0);
    }
  };

  const onClickHandler = () => {
    navigate(`/flight/${id}`);
  };

  const onDragLeaveHandler = (e: any) => {
    resetClassName(e);
  };

  const onDropHandler = (e: any) => {
    resetClassName(e);
    /**
     TODO: Remove all anotherCardOnTop classnames
     from DOM after drop complete.
     */
  };

  const resetClassName = (e: any) => {
    e.preventDefault();
    const isCard =
      e.target.className === 'card' ||
      e.target.className === 'card anotherCardOnTop';
    if (isCard) {
      setTimeout(() => {
        e.target.className = 'card';
      }, 0);
    }
  };

  return (
    <div
      id={id}
      className={`card ${onHold ? 'hidden' : ''}`}
      draggable={status !== 'ended'}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
      onClick={onClickHandler}
    >
      {loading ? <Skeleton className={s.skeleton} active /> : <>
        <div className="cardTitle">
          {name}
          <LaunchImage icon={icon} className={s.cardPatch}/>
        </div>
        <div className="cardFooter">
          {details ? <div className={s.details}>{details}</div> :
            status === 'upcoming' ? 'Awaiting for flight' :
              status === 'reserved' ? 'You have booked this flight. Pack your bags 😉' : 'No description'
          }
          <div className={s.cardFooter}>
            <span className={s.dateInfo}>
              {new Date(date_local).toLocaleDateString('en-US')}
            </span>
            <span className={s.flightStatusInfo}>
              {success === true && <>
                <Badge status="success" />
                <span>Success</span>
              </>}
              {success === false && <>
                <Badge status="error" />
                <span>Failed</span>
              </>}
              {success === null && <>
                <Badge status="processing" />
                <span>Waiting result</span>
              </>}
            </span>
          </div>
        </div>
      </>}

    </div>
  );
};

export default FlightCard;
