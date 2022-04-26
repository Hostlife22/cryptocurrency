import { Avatar, Col, Collapse, Row, Typography } from 'antd';
import millify from 'millify';
import React, { useEffect } from 'react';
import { Loader } from '.';
import { Exchange, IExchangesData } from '../services/cryptoExchanges';

const { Text } = Typography;
const { Panel } = Collapse;

function Exchanges() {
  const [exchangesList, setExchangesList] = React.useState<Exchange[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  useEffect(() => {
    async function fetchData() {
      const json = await fetch(
        'https://cors-anywhere.herokuapp.com/https://coinranking.com/api/v2/exchanges?offset=0&orderDirection=desc&referenceCurrencyUuid=yhjMzLPhuIDl&limit=100',
      );
      const data: IExchangesData = await json.json();

      setExchangesList(data.data.exchanges);
      setIsFetching(false);
    }

    fetchData();
  }, []);

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList &&
          exchangesList.map((exchange) => (
            <Col span={24} key={exchange.uuid}>
              <Collapse>
                <Panel
                  key={exchange.uuid}
                  showArrow={false}
                  header={
                    <Row key={exchange.uuid} className="exchange-row">
                      <Col span={6}>
                        <Text>
                          <strong>{exchange.rank}.</strong>
                        </Text>
                        <Avatar className="exchange-image" src={exchange.iconUrl} />
                        <Text>
                          <strong>{exchange.name}</strong>
                        </Text>
                      </Col>
                      <Col span={6}>$ {millify(+exchange['24hVolume'])}</Col>
                      <Col span={6}>{millify(+exchange.numberOfMarkets)}</Col>
                      <Col span={6}>{millify(+exchange.marketShare)}%</Col>
                    </Row>
                  }>
                  <a href={exchange.coinrankingUrl} target="_blank" rel="noreferrer">
                    {exchange.name}
                  </a>
                </Panel>
              </Collapse>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Exchanges;
