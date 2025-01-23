import { useDispatch, useSelector } from "react-redux";

const useRedux = () => {
  const dispatch = useDispatch();
  const appSelector = useSelector;
  return { dispatch, appSelector };
};

export default useRedux;
