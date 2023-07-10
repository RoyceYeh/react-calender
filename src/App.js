import "./App.css";
import Tabs from "./components/Tabs/Tabs";
import Days from "./components/Days/Days";
import styled from "styled-components";
import { generateDate } from "./util/calender";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";

const Wrap = styled.div`
  max-width: 550px;
  margin: 50px auto;
  border: 1px solid #efefef;
`;

const Week = styled.div`
  display: grid;
  border-top: 1px solid #efefef;
  border-left: 1px solid #efefef;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  background: #efefef;
  &.days {
    border: unset;
  }
`;

const Weekday = styled.div`
  text-align: center;
  font-size: 16px;
  padding: 12px 0;
  color: #212529;
  font-weight: 600;
  background-color: #fff;
`;

const App = () => {
  moment.locale("zh-tw");
  const [today, setToday] = useState("2017-04-01");
  const [tabsday, setTabsday] = useState(today);
  // json
  const [dateArr, setDateArr] = useState([]);
  const [currentDays, setCurrentDays] = useState("");

  useEffect(() => {
    axios
      .get("/json/data2.json")
      .then(function (res) {
        setDateArr(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Wrap>
      <Tabs setToday={setToday} today={today} setTabsday={setTabsday} tabsday={tabsday} dateArr={dateArr} />
      <Week>
        <Weekday>星期日</Weekday>
        <Weekday>星期一</Weekday>
        <Weekday>星期二</Weekday>
        <Weekday>星期三</Weekday>
        <Weekday>星期四</Weekday>
        <Weekday>星期五</Weekday>
        <Weekday>星期六</Weekday>
      </Week>
      <Week className="days">
        {generateDate(tabsday, dateArr).map((res, index) => {
          // console.log(res.price ? true : false);

          return <Days key={index} res={res} currentDays={currentDays} setCurrentDays={setCurrentDays} origiStatus={res.state} />;
        })}
      </Week>
    </Wrap>
  );
};

export default App;
