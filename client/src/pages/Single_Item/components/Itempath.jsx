import React from "react";

export default function Breadcrumbs({ paths }) {
  return (
    <nav className="text-gray-600  text-sm sm:text-xs md:text-sm flex flex-wrap items-center gap-2 mt-10 ml-14">
      {paths.map((path, index) => (
        <span key={index} className="flex items-center">
          {index !== 0 && <span className="mx-1">{">"}</span>}
          {path.href ? (
            <a href={path.href} className="hover:underline hover:text-purple-700">
              {path.label}
            </a>
          ) : (
            <span className="font-semibold text-gray-900">{path.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}




//      <Itempath 
//            paths={[
 //             { label: "Home", href: "/" },
 //             { label: "Components", href: "/components" },
 //             { label: "Processors", href: "/components/processors" },
 //             { label: "Intel Core Ultra 9 Processor 285K" }
 //           ]}    />