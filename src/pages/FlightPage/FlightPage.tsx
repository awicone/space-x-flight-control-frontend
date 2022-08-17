import React, { useEffect, useState } from 'react';
import s from './FlightPage.module.scss';
import { Result, Typography } from 'antd';
import api from '../../api/api';
import { useParams } from 'react-router-dom';

const FlightPage = () => {
  const param: any = useParams();
  const [flight, setFlight] = useState<any>({});
  useEffect(() => {
    const getFlight = async () => {
      const flightResponse = await api.launch.request(param.id);
      setFlight(flightResponse.data);
    };
    getFlight();
  }, []);

  const { Title, Paragraph, Text, Link } = Typography;
  return (
    <div className={s.flightPageContainer}>
      <Typography>
        <div className={s.sss}>
          <Title>{flight.name}</Title>
          <img className={s.patchIcon} src={flight?.links?.patch?.large} />
        </div>

        <Paragraph>
          {flight.details}
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
        <Paragraph>
          <Result
            status={flight.success === true ? 'success' : flight.success === false ? 'error' : 'info'}
            title='Flight result'
            subTitle={flight.success === true ? 'Success!' : flight.success === false ? 'Failed' : 'Waiting for a flight'}
          />
        </Paragraph>
      </Typography>
    </div>
  );
};
export default FlightPage;
