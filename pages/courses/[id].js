import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import PageLayout from '../../components/PageLayout'

const course = () => {
  const router = useRouter()
  const { id } = router.query

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

export default course
