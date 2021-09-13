import { Card, Container } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import PageLayout from '../components/PageLayout'
import { GET_USERS } from '../backend/queries'
import { GET_COURSES, getCourses } from '../backend/opencourse_api'

const Home = () => {
  const { data, loading } = useQuery(GET_USERS)
  const { data: courseData, loading: courseLoading } = useQuery(getCourses)

  console.log({ courseData })

  return (
    <PageLayout>
      <Container>
        <div className="div">
          <h1>Hello</h1>
        </div>

        <div>
          {loading ? (
            <div>Loading... </div>
          ) : (
            data?.result?.map((e) => (
              <Card className="card" key={e.id}>
                <Card.Body>
                  <Card.Title>{e.username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Link href="/course">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </Container>
    </PageLayout>
  )
}

export default Home
