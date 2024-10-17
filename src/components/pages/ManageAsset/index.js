import React, { useState } from "react";
import ListAsset from "../../organism/ListAsset";
import UploadAsset from "../../organism/UploadAsset";

const ManageAsset = () => {
  const [fetchStatus, setFetchStatus] = useState(true); // Moved fetchStatus here

  return (
    <>
      <UploadAsset setFetchStatus={setFetchStatus}></UploadAsset>
      <ListAsset
        fetchStatus={fetchStatus}
        setFetchStatus={setFetchStatus}
      ></ListAsset>
    </>
  );
};
export default ManageAsset;
