import React, { useEffect, useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';
import FlightBoard from '../../components/FlightBoard/FlightBoard';
import { Column } from '../../types/ColumnList';
import { initialLaunches, initialLists } from '../../components/FlightBoard/FlightBoard.contant';
import api from '../../api/api';
import { Launches, LaunchStatus } from '../../types/Launches';
import { Launch } from '../../types/Lounch';
import { CardInfo } from '../../types/CardInfo';
import { AxiosResponse } from 'axios';
import { message, Modal } from 'antd';

const FlightControlDashboard = () => {
  const [columnList] = useState<Column[]>(initialLists);
  const [launches, setLaunches] = useState<Launches>(initialLaunches);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [isBookingCancellationModalOpened, setIsBookingCancellationModalOpened] = useState<boolean>(false);
  const [actionConfirmed, setActionConfirmed] = useState<boolean>(false);
  const [cachedCardInfo, setCachedCardInfo] = useState<any>({});

  const confirmBookingCancellation = () => {
    setIsBookingCancellationModalOpened(true);
    setActionConfirmed(true);
  };

  const cancelBookingCancellation = () => {
    setIsBookingCancellationModalOpened(false);
  };

  useEffect(() => {
    const getLaunches = async () => {
      const pastLaunches: AxiosResponse<Launch[]> = await api.launches.past.request();
      const upcomingLaunches: AxiosResponse<Launch[]> = await api.launches.upcoming.request();

      setLaunches({
        ended: pastLaunches.data,
        upcoming: upcomingLaunches.data,
        reserved: []
      });
    };

    try {
      getLaunches();
    } catch (e: any) {
      console.log('error');
    } finally {
      setTimeout(() => {
        setDataFetched(true);
      }, 2000);
    }
  }, []);

  useUpdateEffect(() => {
    if (actionConfirmed) {
      cardChangeHandler(cachedCardInfo.cardInfo, cachedCardInfo.newStatus, cachedCardInfo.targetCardId);
      message.success('Your booking was cancelled successfully!', 2);
    }
    setActionConfirmed(false);
    setIsBookingCancellationModalOpened(false);
  }, [actionConfirmed]);

  const cardChangeHandler = async (cardInfo: CardInfo, newStatus: LaunchStatus, targetCardId: string) => {
    if (cardInfo.status === 'ended' ||
      newStatus === 'ended' ||
      cardInfo.status === newStatus) {
      return;
    }

    if (newStatus === 'upcoming') {
      setIsBookingCancellationModalOpened(true);
      setCachedCardInfo({ cardInfo, newStatus, targetCardId });
      if (!actionConfirmed) {
        return;
      }
    }

    const { id, status: oldStatus } = cardInfo;
    const dropCard = launches[oldStatus].find((el: Launch) => el.id === id);

    if (!dropCard) {
      return;
    }

    const targetCard =
      targetCardId !== ''
        ? launches[newStatus].find((el: Launch) => el.id === targetCardId)
        : null;

    const newListOrderValueMax = launches[newStatus]
      .map((item: Launch) => item.order)
      .reduce((maxValue: number, a: number) => Math.max(maxValue, a), 0);

    if (oldStatus === newStatus) {
      const temp = launches[oldStatus]
        .map((item: Launch) => {
          if (item.id === dropCard.id)
            return {
              ...dropCard,
              order: targetCard
                ? targetCard.order - 1
                : newListOrderValueMax + 1
            };
          return item;
        })
        .sort((a: Launch, b: Launch) => a.order - b.order)
        .map((item: Launch, i: number) => {
          return { ...item, order: i + 1 };
        });
      setLaunches((d: Launches) => {
        return { ...d, [oldStatus]: temp };
      });

      return;
    }

    const tempGaveList: Launch[] = launches[oldStatus]
      .filter((item: Launch) => item.id !== id)
      .sort((a: Launch, b: Launch) => a.order - b.order)
      .map((item: Launch, i: number) => {
        return { ...item, order: i + 1 };
      });

    const tempRecievedList: Launch[] = [
      ...launches[newStatus],
      {
        ...dropCard,
        order: targetCard ? targetCard.order - 1 : newListOrderValueMax + 1
      }
    ]
      .sort((a, b) => a.order - b.order)
      .map((item, i) => {
        return { ...item, order: i + 1 };
      });

    setLaunches((d: Launches) => {
      return { ...d, [oldStatus]: tempGaveList, [newStatus]: tempRecievedList };
    });

    if (newStatus === 'reserved') {
      message.success('Your flight was reserved successfully!', 2);
    }
  };

  return (
    <div className="trello_page">
      <Modal
        title="Cancel confirmation"
        visible={isBookingCancellationModalOpened}
        onOk={confirmBookingCancellation}
        onCancel={cancelBookingCancellation}
        okText="Yes"
        cancelText="Cancel"
      >
        <p>Are you sure you want to cancel your booking?</p>
      </Modal>
      <div className="app-content-area">
        {<main className="app-board">
          <section className="board-body">
            <div className="wrap-lists">
              {columnList.map((l: Column) => (
                <FlightBoard
                  data={launches[l.status]}
                  key={l.status}
                  title={l.title}
                  status={l.status}
                  onChange={cardChangeHandler}
                  loading={!dataFetched}
                />
              ))}
            </div>
          </section>
        </main>}
      </div>
    </div>
  );
};

export default FlightControlDashboard;
