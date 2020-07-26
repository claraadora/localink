function dynamicSort(property, order, id) {
  let sort_order = 1;
  if (order === "descending") {
    sort_order = -1;
  }
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
}

function getProperty(property, elem) {
  if (property === "distance") {
    return elem.shop_docs[0].distance;
  } else if (property === "price") {
    return elem.price;
  } else if (property === "ratings") {
    return elem.shop_docs[0].ratings;
  } else {
    return null;
  }
}

// const ans = () => {
//   const array = arr.sort(dynamicSort('ratings', 'descending'));
// };

// module.exports = ans;
