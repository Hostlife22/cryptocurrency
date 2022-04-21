import { Card, Col, Row } from 'antd';
import millify from 'millify';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Coin } from '../services/cryptoApi.types';

type CryptocurrenciesProps = {
  simplified?: boolean;
};

function Cryptocurrencies({ simplified }: CryptocurrenciesProps): JSX.Element {
  const count = simplified ? 10 : 50;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = React.useState<Coin[] | undefined>(cryptoList?.data?.coins);

  console.log(cryptos);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Row gutter={[32, 32]} className="crypto-card-container">
      {cryptos?.map((currency) => (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
          <Link to={`/crypto/${currency.uuid}`}>
            <Card
              title={`${currency.rank}. ${currency.name}`}
              extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.name} />}
              hoverable>
              <p>Price: {millify(+currency.price)}</p>
              <p>Market Cap: {millify(+currency.marketCap)}</p>
              <p>Daily Change: {millify(+currency.change)}%</p>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default Cryptocurrencies;
