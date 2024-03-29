import Image from "next/image";
import React from "react";

export default async function Blog() {
  const res = await fetch(
    "https://api.unsplash.com/photos/?client_id=ZKtrh4DYSC7gHvf7DUubAjDEw44h7JIoAtANXWOrDBs"
  );
  const data = await res.json();

  return (
    <>
      <div>
        {data
          ? data.map(({ id, user }) => (
              <div key={id}>
                <p>{id}</p>
                <p className="pb-20">{user.bio}</p>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
