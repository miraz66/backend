import React from "react";

function Employes({ id, name, role, img, editEmploye }) {
  return (
    <div className="w-[455px]">
      <div className="px-4 max-w-sm bg-white rounded-xl shadow-lg  sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-16">
        <img
          className=" object-cover h-[100px] w-[100px] block mx-auto rounded-full sm:mx-0 sm:shrink-0"
          src={img}
          alt="Woman's Face"
        />

        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0.5">
            <p className="text-lg text-black font-semibold">{name}</p>
            <p className="text-slate-500 font-medium">{role}</p>
          </div>

          <div className="flex justify-center gap-2">{editEmploye}</div>
        </div>
      </div>
    </div>
  );
}

export default Employes;
