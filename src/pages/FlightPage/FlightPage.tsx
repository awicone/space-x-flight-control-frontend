import React, { useEffect, useState } from 'react';
import s from './FlightPage.module.scss';
import { Spin, Typography } from 'antd';
import api from '../../api/api';
import { useParams } from 'react-router-dom';
import { Launch } from '../../types/Lounch';
import LaunchImage from '../../components/LaunchImage/LaunchImage';

const FlightPage = () => {
  const param: any = useParams();
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [flight, setFlight] = useState<Launch>({
    id: '',
    name: '',
    order: 0,
    details: '',
    success: null,
    date_local: '',
    status: 'ended',
    links: {
      patch: {
        large: '',
        small: ''
      }
    }
  });

  useEffect(() => {
    const getFlight = async () => {
      const flightResponse = await api.launch.request(param.id);
      setFlight(flightResponse.data);
    };
    getFlight();
    setTimeout(() => {
      setDataFetched(true);
    }, 1000);
  }, []);

  const { Title, Paragraph, Text } = Typography;
  return (
    dataFetched ?
      <div className={s.flightPageContainer}>
        <Typography>
          <div className={s.sss}>
            <Title>{flight.name}</Title>
            <LaunchImage className={s.patchIcon} icon={flight?.links?.patch?.large} />
          </div>

          <Paragraph>
            <Title>Flight details</Title>
            {flight.details}
          </Paragraph>
          <Paragraph>
            Flight date: {flight.date_local}
          </Paragraph>
          <Paragraph>
            <Title>Result: {flight.success === true ? 'success ✅' : flight.success === false ? 'failed ❌' : 'waiting for a flight 🕐'}</Title>
          </Paragraph>
          <Paragraph>
          After massive project practice and summaries, Ant Design, a design language for background
          applications, is refined by Ant UED Team, which aims to{' '}
            <Text strong>
            uniform the user interface specs for internal background projects, lower the unnecessary
            cost of design differences and implementation and liberate the resources of design and
            front-end development
            </Text>
          .
          </Paragraph>
        </Typography>
      </div> : <Spin size={'large'}/>
  );
};
export default FlightPage;
