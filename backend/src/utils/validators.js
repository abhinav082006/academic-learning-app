const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateClass = (classLevel) => {
  const validClasses = ['Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  return validClasses.includes(classLevel);
};

const validateAge = (age) => {
  return age && age >= 3 && age <= 25;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateClass,
  validateAge
};