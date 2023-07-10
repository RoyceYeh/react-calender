import styled from "styled-components";
import moment from "moment";
import { generateDate, parseDate } from "../../util/calender";
import { useState } from "react";

const TabsWrap = styled.div`
  display: flex;
  background-color: #ede9dd;
  padding-top: 5px;
`;

const Arrow = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`;
const Tab = styled.div`
  width: 30%;
  padding: 12px 0;
  text-align: center;
  line-height: 1.5;
  color: #6c757d;
  font-weight: 700;
  cursor: pointer;

  ${({ classActive }) =>
    classActive &&
    `
    background-color: #fff;
    color: red;
  `}

  p {
    font-size: 12px;
    color: green;
  }
`;

export default function Tabs({ setToday, today, setTabsday, tabsday, dateArr }) {
  const tabsdate = [
    {
      date: moment(today).subtract(1, "months").format("YYYY-MM"),
      departureDay: generateDate(moment(today).subtract(1, "months").format("YYYY-MM-DD"), dateArr).map((res) => {
        return res.price ? true : false;
      }),
    },
    {
      date: parseDate(today, "YYYY-MM"),
      departureDay: generateDate(parseDate(today, "YYYY-MM-DD"), dateArr).map((res) => {
        return res.price ? true : false;
      }),
    },
    {
      date: moment(today).add(1, "months").format("YYYY-MM"),
      departureDay: generateDate(moment(today).add(1, "months").format("YYYY-MM-DD"), dateArr).map((res) => {
        return res.price ? true : false;
      }),
    },
  ];
  const [active, setActive] = useState(1);
  // const [departure, setDeparture] = useState(false);

  const handlePrevClick = () => {
    setActive(active - 1);
    setTabsday(moment(tabsday).subtract(1, "months").format("YYYY-MM"));
    if (0 > active - 1) {
      setActive(0);
      setToday(moment(today).subtract(1, "months").format("YYYY-MM"));
    }
  };
  const handleNextClick = () => {
    setActive(active + 1);
    setTabsday(moment(tabsday).add(1, "months").format("YYYY-MM"));
    if (active + 1 > 2) {
      setActive(2);
      setToday(moment(today).add(1, "months").format("YYYY-MM"));
    }
  };

  return (
    <TabsWrap>
      <Arrow onClick={() => handlePrevClick()}>＜</Arrow>
      {tabsdate.map((res, index) => {
        return (
          <Tab key={res.date} classActive={tabsdate[active] === res} onClick={() => setActive(index) & setTabsday(tabsdate[index].date)}>
            {parseDate(res.date, "YYYY M")}月{res.departureDay.includes(true) ? <></> : <p>無出發日</p>}
          </Tab>
        );
      })}
      <Arrow onClick={() => handleNextClick()}>＞</Arrow>
    </TabsWrap>
  );
}
