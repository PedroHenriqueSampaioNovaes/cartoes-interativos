const formatData = (text, regex) => {
  function onClean(value) {
    return value.replace(/\D/g, '');
  }

  function onBuild(value) {
    return value.replace(regex, '$1 $2 $3 $4');
  }

  return onBuild(onClean(text));
};
export default formatData;
