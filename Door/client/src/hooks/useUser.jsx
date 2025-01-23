export default function useUser() {
  const api = {};

  const loggedInUser = api.getLoggedInUser();
  return [loggedInUser];
}
