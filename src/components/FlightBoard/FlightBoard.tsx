import React, { useMemo } from 'react';
import FlightCard from '../FlightCard/FlightCard';
import { Launch } from '../../types/Lounch';
import { LaunchStatus } from '../../types/Launches';
import { CardInfo } from '../../types/CardInfo';

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

  const onDragEnterHandler = (e: any) => {
    e.preventDefault();
  };
  const onDragOverHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className === 'boardContentArea') {
      setTimeout(() => {
        e.target.className = 'boardContentArea hovered';
      }, 0);
    }
  };
  const onDragLeaveHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className === 'boardContentArea hovered') {
      setTimeout(() => {
        e.target.className = 'boardContentArea';
      }, 0);
    }
  };
  const onDropHandler = (e: any) => {
    const cardInfo = JSON.parse(e.dataTransfer.getData('cardInfo'));
    const targetCardId = e.target.id;
    onChange(cardInfo, status, targetCardId);
    if (e.target.className === 'boardContentArea hovered') {
      setTimeout(() => {
        e.target.className = 'boardContentArea';
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
      />
    ));
  };

  return (
    <div className="board-col">
      <div className="list">
        <h4 className="list-title">{title}</h4>
        <div
          className="boardContentArea"
          onDragEnter={onDragEnterHandler}
          onDragOver={onDragOverHandler}
          onDragLeave={onDragLeaveHandler}
          onDrop={onDropHandler}
        >
          {renderCards()}
        </div>
      </div>
    </div>
  );
};

export default FlightBoard;
