exports.isExpired = (createdAt) => {
  const expirationTime = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
  const currentTime = new Date().getTime();
  return currentTime - new Date(createdAt).getTime() > expirationTime;
};
