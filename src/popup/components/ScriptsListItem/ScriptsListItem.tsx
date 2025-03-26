import { FC } from "react";
import { Link } from "react-router-dom";

import { Script } from "../../types/Scripts";

import s from "./ScriptsListItem.module.scss";

interface IScriptsListItemProps {
  script: Script;
  onToggle: (enabled: boolean) => void;
  onDelete: () => void;
}

const getDomainFromUrl = (url: string) => {
  try {
    const { hostname } = new URL(url);

    return hostname.replace("www.", "");
  } catch {
    return url;
  }
};

const ScriptsListItem: FC<IScriptsListItemProps> = ({ script, onToggle, onDelete }) => {
  const domain = getDomainFromUrl(script.url);

  return (
    <div className={s.container}>
      <div className={s.left}>
        <input
          type="checkbox"
          checked={script.enabled}
          onChange={(e) => onToggle(e.target.checked)}
          className={s.checkbox}
        />
        <span className={s.domain}>{domain}</span>
      </div>
      <div className={s.actions}>
        <Link
          to={`/edit-script/${script.id}`}
          className={s.iconButton}
          title="Edit script"
        >
          <img src="/icons/edit.png" alt="Edit" className={s.icon} />
        </Link>

        <button
          onClick={onDelete}
          className={s.iconButton}
          title="Delete script"
        >
          <img src="/icons/send-to-trash.png" alt="Delete" className={s.icon} />
        </button>
      </div>
    </div>
  );
};

export default ScriptsListItem;
