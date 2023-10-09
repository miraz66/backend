import React from "react";

export default function page({ params }) {
  console.log(params.id);
  return <div>{params.id}</div>;
}
