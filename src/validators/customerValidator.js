exports.validateCustomer = (data) => {
  const { email } = data;

  if (!email) {
    return { error: 'Email is required' };
  }

  if (!email.includes('@')) {
    return { error: 'Email must contain @' };
  }

  return { error: null };
};
