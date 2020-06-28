import React from "react";
import { useRouteMatch } from "react-router";
import useSwr from "swr";
import prettyBytes from "../utils/prettyBytes";
import redableTime from "../utils/redableTime";

export default function File() {
  const match = useRouteMatch("/file/:fileId");
  const fileId = match ? match.params.fileId : "";
  const { data, error } = useSwr(`/api/file/${fileId}`, (url) => fetch(url).then((res) => res.json()));

  if (!data && !error) return <div className="loading-div" />;
  if (error) return <h4 style={{ textAlign: "center", color: "red" }}>Cannot find the file</h4>;

  const { id, name, modifiedTime, iconLink, mimeType, size, hasThumbnail, thumbnailLink } = data;

  return (
    <div className="drive-file" id={id}>
      {hasThumbnail && <img className="drive-file-thumb" src={thumbnailLink} alt={name} />}
      <div className="row items-center mt-1 mb-05">
        <img className="drive-item-icon" src={iconLink} alt={mimeType} />
        <h2 className="drive-item-title">{name}</h2>
      </div>
      <h4>Type: {mimeType}</h4>
      <h4>Size: {prettyBytes(size)}</h4>
      <h4>Last modified: {redableTime(modifiedTime)}</h4>
      <div className="row flex-wrap space-evenly mt-1">
        <a href={`/api/file/download/${name}?id=${id}`} className="button primary">
          <span className="btn-icon">
            <ion-icon name="download-outline" />
          </span>
          Download now
        </a>
        <button>
          <span className="btn-icon">
            <ion-icon name="play-outline" />
          </span>
          Copy streamable link
        </button>
        <button>
          <span className="btn-icon">
            <ion-icon name="copy-outline" />
          </span>
          Copy share link
        </button>
      </div>
    </div>
  );
}

{
  /* <button>
<span className="btn-icon">
  <ion-icon name="logo-github" />
</span>
Copy share link
</button> */
}
