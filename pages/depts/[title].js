import { Col, Container, Row, Button } from 'react-bootstrap'
import PageLayout from '../../components/PageLayout'
import axios from 'axios'
import { useRouter } from 'next/dist/client/router'

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

const DeptPage = ({ courseData, deptData }) => {
  const router = useRouter()
  // ${course.dept}-

  return (
    <PageLayout>
      <Container>
        <div>
          <h1>{deptData.name}</h1>
        </div>
        <div>
          <Row xs={1} md={2} className="g-2">
            {courseData?.map((course) => (
              <Col key={course.course}>
                <Button
                  variant="primary"
                  onClick={() => router.push(`../courses/${course.course}`)}
                >
                  {course.dept + ' ' + course.course + ' - ' + course.title}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </PageLayout>
  )
}

export default DeptPage
