import React from "react";
import { Link } from "react-router-dom";
import prettyBytes from "../utils/prettyBytes";
import redableTime from "../utils/redableTime";

function DriveItem({ id, name, modifiedTime, iconLink, mimeType, size }) {
  const isFolder = mimeType === "application/vnd.google-apps.folder";

  return (
    <Link to={isFolder ? `/${id}` : `/file/${id}`} className="drive-item">
      <div className="drive-item-main">
        <img className="drive-item-icon" src={iconLink} alt={mimeType} />
        <h3 className="drive-item-title">{name}</h3>
      </div>
      <div className="drive-item-info">
        <div className="row flex-wrap space-between">
          <h4>Modified at: {redableTime(modifiedTime)}</h4>
          {size && <h4>Size: {prettyBytes(size)}</h4>}
        </div>
      </div>
    </Link>
  );
}

export default DriveItem;
