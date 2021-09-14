import { Card, CardGroup, Container } from 'react-bootstrap'
import PageLayout from '../../components/PageLayout'
import axios from 'axios'

//define each possible value of [title] in order to build static paths (not necessary on non-dynamic routes)
export const getStaticPaths = async () => {
  const { data } = await axios.get('https://opencourse.dev/da/depts')

  const paths = data.map((dept) => {
    return {
      params: { title: dept.id },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const url = `https://opencourse.dev/da/depts/${context.params.title}/courses`
  const { data: courseData } = await axios.get(url)
  const { data: deptData } = await axios.get(url.replace('/courses', ''))

  return { props: { courseData, deptData } }
}

const course = ({ courseData, deptData }) => {
  return (
    <PageLayout>
      <Container>
        <div>
          <h1>{deptData.name}</h1>
        </div>
        <div>
          {courseData?.map((course) => (
            <CardGroup key={course.course}>
              <Card>
                <Card.Title>{course.title}</Card.Title>
              </Card>
            </CardGroup>
          ))}
        </div>
      </Container>
    </PageLayout>
  )
}

export default course
