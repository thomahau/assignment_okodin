const SearchHelper = {};

SearchHelper.setChecked = function(value, currentValue) {
  if (value == currentValue) {
    return 'checked';
  } else {
    return '';
  }
};

SearchHelper.setSelect = function(selected, options) {
  return options
    .fn(this)
    .replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"');
};

module.exports = SearchHelper;
