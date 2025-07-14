exports.addDate = (req, res) => {
  res.send('Date added');
};

exports.removeDate = (req, res) => {
  const id = req.params.id;
  res.send(`Date with id ${id} removed`);
};

exports.getDates = (req, res) => {
  res.send('Returning attendance dates');
};