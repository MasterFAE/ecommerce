const calculateTotal = (items) => {
  let _total: number = 0,
    _deal: number = 0;
  items.forEach((element) => {
    _total += element.item.price * element.quantity;
    if (element.item.deal) {
      _deal += Math.round(
        element.item.price * element.quantity * (element.item.deal / 100)
      );
    }
  });
  return { _total, _deal };
};
export default calculateTotal;
