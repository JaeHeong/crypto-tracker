import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import { PriceData } from "./Coin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons'

interface PriceProps {
  coinId: string;
}

const Label = styled.div`
	font-size: 0.9rem;
	font-weight: 700;
	opacity: 0.6;
`;

const Percentage = styled.div`
	font-size: 1.8rem;
	font-weight: 700;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1px;
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 6rem;
	gap: 1rem;
`;

const BigGridItem = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	grid-column: 1 / 3;
	grid-row: 1 / 2;
	padding: 1.2rem;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 0.7rem;
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
	& > ${Label} {
		line-height: 1.5;
	}
	& > div:last-child {
		font-size: 2rem;
		font-weight: 300;
	}
`;

const GridItem = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: column;
	padding: 1rem;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 0.7rem;
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data: pricedata } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const date = new Date(pricedata?.quotes.USD.ath_date ?? "");
  const up = <FontAwesomeIcon icon={faArrowTrendUp} />;
  const down = <FontAwesomeIcon icon={faArrowTrendDown} />;

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) :
        <div>
          <GridContainer>
            <BigGridItem>
              <Label>
                {date.toLocaleDateString("ko-KR")} {date.toLocaleTimeString("ko-KR")}
                <br />
                The Hightes Price is
              </Label>
              <div>${pricedata?.quotes.USD.ath_price.toFixed(3)}</div>
            </BigGridItem>
            <GridItem>
              <Label>than 1 hour ago</Label>
              <Percentage>{pricedata?.quotes.USD.percent_change_1h}%{(pricedata?.quotes.USD.percent_change_1h ?? 0) > 0 ? up : down}</Percentage>
            </GridItem>
            <GridItem>
              <Label>than 6 hours ago</Label>
              <Percentage>{pricedata?.quotes.USD.percent_change_6h}%{(pricedata?.quotes.USD.percent_change_6h ?? 0) > 0 ? up : down}</Percentage>
            </GridItem>
            <GridItem>
              <Label>than 12 hours ago</Label>
              <Percentage>{pricedata?.quotes.USD.percent_change_12h}%{(pricedata?.quotes.USD.percent_change_12h ?? 0) > 0 ? up : down}</Percentage>
            </GridItem>
            <GridItem>
              <Label>than 24 hours ago</Label>
              <Percentage>{pricedata?.quotes.USD.percent_change_24h}%{(pricedata?.quotes.USD.percent_change_24h ?? 0) > 0 ? up : down}</Percentage>
            </GridItem>
            <GridItem>
              <Label>than 7 days ago</Label>
              <Percentage>{pricedata?.quotes.USD.percent_change_7d}%{(pricedata?.quotes.USD.percent_change_7d ?? 0) > 0 ? up : down}</Percentage>
            </GridItem>
            <GridItem>
              <Label>than 30 days ago</Label>
              <Percentage>{pricedata?.quotes.USD.percent_change_30d}%{(pricedata?.quotes.USD.percent_change_30d ?? 0) > 0 ? up : down}</Percentage>
            </GridItem>
          </GridContainer>
        </div>
      }
    </div>
  );
}

export default Price;