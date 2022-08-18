import React, { useMemo } from 'react';
import FlightCard from '../FlightCard/FlightCard';
import { Launch } from '../../types/Lounch';
import { LaunchStatus } from '../../types/Launches';
import { CardInfo } from '../../types/CardInfo';
import s from './FlightBoard.module.css';

interface FlightBoardProps {
  data: Launch[],
  title: string,
  status: LaunchStatus,
  onChange: (cardInfo: CardInfo, status: LaunchStatus, targetCardId: string) => Promise<void>,
  loading?: boolean
}

const FlightBoard = ({ data, title, status, onChange, loading }: FlightBoardProps) => {
  const sorted = useMemo(() => {
    return data.sort((a: Launch, b: Launch) => a.order - b.order);
  }, [data]);

  const onDragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if ((e.target as HTMLInputElement).className === 'boardContentArea') {
      setTimeout(() => {
        (e.target as HTMLInputElement).className = 'boardContentArea hovered';
      }, 0);
    }
  };
  const onDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if ((e.target as HTMLInputElement).className === 'boardContentArea hovered') {
      setTimeout(() => {
        (e.target as HTMLInputElement).className = 'boardContentArea';
      }, 0);
    }
  };
  const onDropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    const cardInfo = JSON.parse(e.dataTransfer.getData('cardInfo'));
    const targetCardId = (e.target as HTMLInputElement).id;
    await onChange(cardInfo, status, targetCardId);

    if ((e.target as HTMLInputElement).className === 'boardContentArea hovered') {
      setTimeout(() => {
        (e.target as HTMLInputElement).className = 'boardContentArea';
      }, 0);
    }
  };

  const renderCards = () => {
    return sorted.map((item: Launch) => (
      <FlightCard
        key={`status-${item.id}`}
        id={item.id}
        details={item.details}
        success={item.success}
        name={item.name}
        date_local={item.date_local}
        order={item.order}
        status={status}
        loading={loading}
        icon={item.links?.patch.small}
      />
    ));
  };

  return (
    <div>
      <h4 className={s.listTitle}>{title}</h4>
      <div
        className={s.boardContentArea}
        onDragEnter={onDragEnterHandler}
        onDragOver={onDragOverHandler}
        onDragLeave={onDragLeaveHandler}
        onDrop={onDropHandler}
      >
        {renderCards()}
      </div>
    </div>
  );
};

export default FlightBoard;
