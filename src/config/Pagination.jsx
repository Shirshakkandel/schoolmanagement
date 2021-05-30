export default function Pagination({
  postPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = []
  for (let i = 1; i < Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i)
  }
  console.log(postPerPage, totalPosts, currentPage)
  return (
    <ul className="flex justify-end flex-wrap">
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          onClick={() => paginate(pageNumber)}
          className={`border-green-300  border-r-2 p-2 cursor-pointer bg-red-500 ${
            currentPage === pageNumber && 'bg-green-500'
          }`}
        >
          <a>{pageNumber}</a>
        </li>
      ))}
    </ul>
  )
}
