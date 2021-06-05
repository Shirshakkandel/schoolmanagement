export default function examValidation(values) {
  let errors = {}
  if (!values.date.trim()) {
    errors.date = 'Date field is required'
  }

  if (!values.examName.trim()) {
    errors.examName = 'Exam Name is required'
  }

  if (!values.grade.trim()) {
    errors.grade = 'Grade is required'
  }

  if (!values.section.trim()) {
    errors.section = 'Section is required'
  }
  if (!values.time) {
    errors.time = 'Time is required'
  }
  if (!values.subjectName.subjectName.trim()) {
    errors.subjectName = 'Subject Name is required'
  }
  return errors
}
