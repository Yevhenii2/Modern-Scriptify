import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ScriptsList from "../components/ScriptsList/ScriptsList";
import { AppDispatch, RootState } from "../store";
import { loadScripts } from "../store/scriptsSlice";

const Home = () => {
  const scripts = useSelector((state: RootState) => state.scripts.scripts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadScripts());
  }, [ dispatch ]);

  return <div className="main-page-wrapper">
    <Link to={"/add-script"} className="centered-button">
      Add script to current page
    </Link>
    <ScriptsList scripts={scripts} />
  </div>;
};

export default Home;
