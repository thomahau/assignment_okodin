const formatProfileParams = input => {
  let profileParams = {};
  for (let key in input) {
    if (input[key]) {
      profileParams[key] = input[key];
    }
  }
  return profileParams;
};

module.exports = { formatProfileParams };
