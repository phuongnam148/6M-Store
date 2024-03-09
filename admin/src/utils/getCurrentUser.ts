export const getCurrentUser = () => {
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
};
export default getCurrentUser;
