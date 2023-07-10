import moment from "moment";

export const generateDate = (current = moment(), dateData) => {
  moment.locale("zh-tw");
  const firstDateOfMonth = moment(current).startOf("month");
  const lastDateOfMonth = moment(current).endOf("month");

  const arrayOfDate = [];

  //產生目前日期
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      date: parseDate(current, "YYYY-MM") + "-" + i,
    });
  }

  //比對當前月份同月的資料
  const dataCurrentMonth = dateData.filter((res) => {
    return parseDate(current, "YYYY-MM") === parseDate(res.date, "YYYY-MM");
  });

  // 大小排序
  dataCurrentMonth.sort(function (a, b) {
    return parseDate(a.date, "DD") - parseDate(b.date, "DD");
  });

  //放入當月資料
  const insertDateData = arrayOfDate.filter((res) => {
    return res.date !== "";
  });

  for (let i = 0; i < dataCurrentMonth.length; i++) {
    let order = parseDate(dataCurrentMonth[i].date, "D") - 1;
    insertDateData.splice(order, 1, dataCurrentMonth[i]);
  }

  // 前一個月
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    insertDateData.unshift({
      // currentMonth: true,
      date: "",
    });
  }

  //後一個月
  if (lastDateOfMonth.day() === 6) {
    insertDateData.push();
  } else {
    for (let i = lastDateOfMonth.day(); i <= 5; i++) {
      insertDateData.push({
        date: "",
      });
    }
  }

  return insertDateData;
};

export const parseDate = (date, formatDate) => {
  return moment(new Date(date)).format(formatDate);
};
