import './CourseList.css'

function CourseList () {
  const courses = [
    { title: "우에노 데이트", date: "7/12 (토)", region: "우에노", count:4 }      
  ]

  return (
    <section className='course-list'>
      <h2>📅 예정된 코스</h2>
      {courses.map((course)=>(
        <div className='course-card'>
          <h3>{course.title}</h3>
          <p>
            {course.date} · 
            {course.count}곳 · 
            📍{course.region}
          </p>
        </div>
      ))}
    </section>
  )
}

export default CourseList;