import { useDispatch } from "react-redux";

import { editScript, removeScript } from "../../store/scriptsSlice";
import { Script } from "../../types/Scripts";
import ScriptsListItem from "../ScriptsListItem/ScriptsListItem";

import s from "./ScriptsList.module.scss";

interface IScriptListProps {
    scripts: Script[];
}

const ScriptsList = ({ scripts } : IScriptListProps) => {
  const dispatch = useDispatch();

  return <div className={s.scriptsList}>
    {
      scripts.map((script) => (
        <ScriptsListItem
          script={script}
          onDelete={() => {  dispatch(removeScript(script.id));}}
          onToggle={(isEnabled) => {
            dispatch(editScript({
              ...script,
              enabled: isEnabled,
            }));
          }}
        />
      ))
    }
  </div>;
};

export default ScriptsList;