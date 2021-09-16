import { Container } from 'react-bootstrap'
import PageLayout from '../../components/PageLayout'
import { useRouter } from 'next/dist/client/router'
import axios from 'axios'

export const getStaticPaths = async (context) => {
  // console.log(context) ${id.split('-')[0]} ${id.split('-')[1]}
  const { data } = await axios.get(
    `https://opencourse.dev/da/depts/MATH/courses`
  )
  const paths = data.map((course) => {
    return {
      params: { id: course.dept },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  console.log({ context })
  const url = `https://opencourse.dev/da/depts/${context.params.id}/courses`
  const { data: courseData } = await axios.get(url)
  const { data: deptData } = await axios.get(url.replace('/courses', ''))

  return { props: { courseData, deptData } }
}

const CoursePage = () => {
  const router = useRouter()
  const { id, title } = router.query

  console.log(title)
  return (
    <PageLayout>
      <Container>
        <div>
          <h1>Course ID: {id}</h1>
        </div>
      </Container>
    </PageLayout>
  )
}

export default CoursePage
