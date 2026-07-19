import './CourseList.css'

function CourseList () {
  const courses = [
    { id: "c1", title: "우에노 데이트", date: "7/12 (토)", count:4, startTime: "12:00", endTime: "23:00", region: "우에노" }
  ]

  return (
    <section className='course-list'>
      <h2>📅 예정된 코스</h2>
      {courses.map((course)=>(
        <div className='course-card' key={course.id}>
          <span className='course-icon'>🌸</span>
          <div className='course-contents'>
            <h3>{course.title}</h3>
            <p>
              {course.date} · 
              {course.startTime}~{course.endTime} · 
              {course.count}곳
            </p>
          </div>
          <span className='course-arrow'>›</span>    
        </div>
      ))}
    </section>
  )
}

export default CourseList;