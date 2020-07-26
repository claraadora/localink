export const dynamicSort = (property, order, id) => {
  let sort_order = 1;
  if (order === "descending") {
    sort_order = -1;
  }

  const getProperty = (property, elem) => {
    if (property === "distance") {
      return elem.shop_docs[0].distance.filter((obj) => {
        return obj && obj[id];
      })[0][id];
    } else if (property === "price") {
      return elem.price;
    } else if (property === "ratings") {
      return elem.shop_docs[0].ratings;
    } else {
      return null;
    }
  };

  return function (e1, e2) {
    const property1 = getProperty(property, e1);
    const property2 = getProperty(property, e2);
    if (property1 < property2) {
      return -1 * sort_order;
    } else if (property1 > property2) {
      return 1 * sort_order;
    } else {
      return 0 * sort_order;
    }
  };
};
