import React from "react";

export default async function Blog() {
  const res = await fetch(
    "https://api.unsplash.com/photos/?client_id=ZKtrh4DYSC7gHvf7DUubAjDEw44h7JIoAtANXWOrDBs"
  );

  const data = await res.json();
  console.log(data.id);

  return (
    <>
      <div>
        {data
          ? data.map(({ id }) => (
              <div key={id}>
                <p>{id}</p>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
