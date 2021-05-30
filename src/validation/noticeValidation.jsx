export default function noticevalidation(values) {
  let errors = {}
  if (!values.title.trim()) {
    errors.title = 'Title required'
  }

  if (!values.details.trim()) {
    errors.details = 'Detail is required'
  }

  if (!values.postedBy.trim()) {
    errors.postedBy = 'Author of Post is required'
  }

  if (!values.date.trim()) {
    errors.date = 'Author of Post is required'
  }

  return errors
}
