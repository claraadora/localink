import moment from "moment";

export const getChatById = (id, isShopper, chatList) => {
  let check;

  if (isShopper) {
    check = "shop";
  } else {
    check = "shopper";
  }
  for (let i = 0; i < chatList.length; i++) {
    console.log(chatList[i][check]);
    if (chatList[i][check] === id) {
      return chatList[i];
    }
  }
};

export const compareMoment = (unformatted) => {
  const now = new moment();
  return now.diff(unformatted, "days") >= 1 ? "sameElse" : "sameDay";
};
