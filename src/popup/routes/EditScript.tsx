import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ScriptForm from "../components/ScriptForm/ScriptForm";
import { getScriptById } from "../store/scriptsSelectors";

const EditScript = () => {
  const navigate = useNavigate();
  const { scriptId } = useParams<{ scriptId: string }>();
  const script = useSelector(getScriptById(scriptId));

  if(!script){
    navigate("/index.html");

    return null;
  }

  return <div>
    <ScriptForm script={script} />
  </div>;
};

export default EditScript;