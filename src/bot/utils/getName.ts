const getName = (session): string => {
  const name = session.userData.name
    ? session.userData.name
    : session.message.user.name.split(' ')[0];
  return name;
};
export default getName;
