import { useEffect, useState } from "react";

// actions
import { changePageTitle } from "../redux/actions";

// hooks
import { useRedux } from ".";

export default function usePageTitle(value) {
  const { dispatch } = useRedux();

  const [pageTitle] = useState(value);

  useEffect(() => {
    // set page title
    dispatch(changePageTitle(pageTitle));
  }, [dispatch, pageTitle]);
}
