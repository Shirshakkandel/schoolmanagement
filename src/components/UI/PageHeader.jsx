import React from 'react'

function PageHeader({ width, title, subTitle, open, children, onePageTitle }) {
  return (
    <div
      width={width}
      className={`bg-gray-200 h-auto ml-${
        width > 1024 && open ? 80 : 0
      } p-3 transition-all duration-500 ease-in-out md:p-8`}
      overflow-x-hidden
    >
      <h1 className="h-6 text-lg font-bold ">{title}</h1>
      <div className="pb-3">
        Home <span className="text-yellow-600"> &gt; {subTitle}</span>
      </div>
      <div className={`card ${!onePageTitle && 'bg-gray-100'} w-full`}>
        {!onePageTitle && (
          <div className="content p-5">
            <h2 className="header font-bold text-gray-800 mb-4">
              {onePageTitle}
            </h2>
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

export default PageHeader
