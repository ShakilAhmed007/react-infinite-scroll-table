import React from 'react'

function Table(props) {
  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

      <div className="p-6 bg-white border-b border-gray-200">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {
              props.posts &&
                props.posts ?
                props.posts.map((post, index) => {
                  return (
                    <tr key={index}>
                      <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{index + 1}</td>
                      <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{post.title}</td>
                      <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{post.auther}</td>
                      <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{post.views}</td>
                    </tr>
                  )
                }) :
                <tr>
                  <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">No data found</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Table
