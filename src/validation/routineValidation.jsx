export default function routineValidation(values) {
  let errors = {}
  if (!values.subjectName.trim()) {
    errors.subjectName = 'Subject Name is required'
  }
  if (!values.subjectCode.trim()) {
    errors.subjectCode = 'Subject Code is required'
  }

  if (!values.date.trim()) {
    errors.date = 'Date is required'
  }

  if (!values.grade.trim()) {
    errors.grade = 'Grade is required'
  }
  if (!values.time.trim()) {
    errors.time = 'Time is required'
  }
  if (!values.day.trim()) {
    errors.day = 'Day is required'
  }

  if (!values.teacherName.trim()) {
    errors.teacherName = 'TeacherName is required'
  }

  if (!values.section.trim()) {
    errors.section = 'Section is required'
  }

  return errors
}
