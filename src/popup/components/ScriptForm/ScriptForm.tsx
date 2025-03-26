import { FormEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCurrentTabUrl } from "../../../utils";
import { addScript, editScript } from "../../store/scriptsSlice";
import { Script } from "../../types/Scripts";

import s from "./ScriptForm.module.scss";

interface IScriptFormProps {
    script?: Script;
}

const ScriptForm = ({ script }: IScriptFormProps) => {
  const [ newCode, setNewCode ] = useState(script ? script.code : "");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ tabUrl, setTabUrl ] = useState<string>("");

  useEffect(() => {
    const fetchTabUrl = async() => {
      try {
        const { tabUrl } = await getCurrentTabUrl();
        setTabUrl(script ? script.url : tabUrl);
      } catch (error) {
        console.error("Failed to fetch tab URL", error);
      }
    };

    fetchTabUrl();
  }, []);

  const onSubmit:FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault();

    const newScript: Script =
        script ?
          {
            ...script,
            code: newCode,
          }
          :
          {
            id: Date.now().toString(),
            url: tabUrl,
            code: newCode,
            enabled: true,
          };

    if(script) {
      dispatch(editScript(newScript));
    } else {
      dispatch(addScript(newScript));
    }

    navigate("/index.html");
  };

  return (
    <div className={s.wrapper}>
      <div className={s.pageUrl}>
        {tabUrl}
      </div>
      <form onSubmit={onSubmit} className={s.form}>
        <textarea
          name="code"
          id="code"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
          className={s.textarea}
        />
        <button type="submit" className={s.button}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ScriptForm;