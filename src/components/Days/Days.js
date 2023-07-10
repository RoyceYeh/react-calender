import styled from "styled-components";
import { parseDate } from "../../util/calender";
import { useState, useEffect } from "react";

const DaysWrap = styled.div`
  cursor: pointer;
  background-color: #fff;
  min-height: 85px;
  border-bottom: 1px solid #efefef;
  border-right: 1px solid #efefef;
  padding: 1.5px;
  p {
    font-size: 12px;
    padding: 2px 0;
    color: rgb(132 132 132);
    font-weight: bold;
    &.price {
      color: red;
    }
    &.state {
      font-weight: bold;
      color: #2aa2a2;
    }
    &.close {
      font-weight: bold;
      color: rgb(167 167 167);
    }
    &.open {
      font-weight: bold;
      color: #fe8300;
    }
  }

  &.none {
    opacity: 0;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
    .certain {
      color: #fff;
      background-color: #ff9224;
      padding: 3px;
    }
  }

  &:hover {
    background-color: rgba(255, 250, 186, 0.75);
  }

  ${({ classClicked }) =>
    classClicked &&
    `
    border:2px solid green;
    padding:0;
    background-color: rgba(255, 250, 186, 0.75);
    `}
`;

export default function Days({ res, currentDays, setCurrentDays, origiStatus }) {
  const [classState, setClassState] = useState("");

  const handleDaysClass = (e) => {
    setCurrentDays("");
    setCurrentDays(res.date);
  };

  const handleClassState = (state) => {
    switch (true) {
      case state === "截止":
        setClassState("close");
        // console.log("close");
        break;
      case state === "關團":
        setClassState("close");
        // console.log("close");
        break;
      case state === "取消":
        setClassState("close");
        // console.log("close");
        break;
      case state === "額滿":
        setClassState("close");
        // console.log("close");
        break;
      case state === "預定":
        setClassState("open");
        // console.log("open");
        break;
      case state === "報名":
        setClassState("open");
        // console.log("open");
        break;

      default:
        setClassState("state");
        break;
    }
  };
  useEffect(() => {
    handleClassState(origiStatus);
  });

  return res.date === "" ? (
    <DaysWrap className="none" />
  ) : res.price ? (
    <DaysWrap onClick={handleDaysClass} classClicked={currentDays === res.date}>
      <div className="row">
        <p>{parseDate(res.date, "D")}</p>
        {res.guaranteed || res.certain === true ? <p className="certain">成團</p> : ""}
      </div>
      <p className={classState}>{res.state || res.status}</p>
      <p>{res.onsell || res.availableVancancy ? `可賣:${res.onsell || res.availableVancancy}` : ""}</p>
      <p>{res.total || res.totalVacnacy ? `席次:${res.total || res.totalVacnacy}` : ""}</p>
      <p className="price">{res.price ? `$${res.price}` : ""}</p>
    </DaysWrap>
  ) : (
    <DaysWrap onClick={handleDaysClass} classClicked={currentDays === res.date}>
      <div className="row">
        <p>{parseDate(res.date, "D")}</p>
      </div>
    </DaysWrap>
  );
}
