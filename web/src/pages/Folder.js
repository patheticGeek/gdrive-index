import React, { useState, useMemo } from "react";
import { useRouteMatch } from "react-router";
import useSwr from "swr";
import DriveItem from "../components/DriveItem";

function Folder({ search, share }) {
  const [query, setQuery] = useState("");
  const match = useRouteMatch(share ? "/share/:folderId" : "/:folderId");
  const folderId = match ? match.params.folderId : "";
  const { data, error } = useSwr(`/api/folder/${folderId}`, (url) => fetch(url).then((res) => res.json()));

  const searched = useMemo(() => {
    if (query.length < 3) return [];
    return data.files.filter((val) => val.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }, [query, data]);

  if (!data && !error)
    return (
      <>
        {search && (
          <input type="text" name="query" value={query} placeholder="Search in this folder..." onChange={(e) => setQuery(e.target.value)} />
        )}
        <div className="loading-div" />
      </>
    );
  if (error) return <h4 style={{ textAlign: "center", color: "red" }}>Cannot find the folder</h4>;

  return (
    <>
      {search && (
        <input type="text" name="query" value={query} placeholder="Search in this folder..." onChange={(e) => setQuery(e.target.value)} />
      )}
      {query.length >= 3 ? (
        <>
          <h4 className="drive-results-title">Search results:</h4>
          <div className="drive-items">
            {searched.map((item) => (
              <DriveItem key={item.id} {...item} />
            ))}
          </div>
        </>
      ) : (
        <div className="drive-items">
          {data.files.map((item) => (
            <DriveItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </>
  );
}

Folder.defaultProps = { search: true, share: false };

export default Folder;
