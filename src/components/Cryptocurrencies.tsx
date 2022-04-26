import { Card, Col, Input, Row } from 'antd';
import millify from 'millify';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Coin } from '../services/cryptoApi.types';
import Loader from './Loader';

type CryptocurrenciesProps = {
  simplified?: boolean;
};

function Cryptocurrencies({ simplified }: CryptocurrenciesProps): JSX.Element {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = React.useState<Coin[] | undefined>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  React.useEffect(() => {
    const filtredData = cryptoList?.data?.coins.filter((coin: Coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setCryptos(filtredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
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
    </>
  );
}

export default Cryptocurrencies;
