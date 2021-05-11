export function DetailField({ label, detail }) {
  return (
    <div className="name flex space-x-2 pb-2">
      <h2 className=" text-gray-500 w-1/3 md:w-1/3">{label}</h2>
      <h2 className="font-medium w-1/2 md:w-2/3">{detail}</h2>
    </div>
  )
}
