import { Card, Container } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import PageLayout from '../components/PageLayout'
import { GET_USERS } from '../backend/queries'

const Home = () => {
  const { data, loading } = useQuery(GET_USERS)

  return (
    <PageLayout>
      <Container>
        <div className="div">
          <h1>Hello</h1>
        </div>
        {/* {deptData?.map((course) => (
          <div>{course.course}</div>
        ))} */}
        <div>
          {loading ? (
            <div>Loading... </div>
          ) : (
            data?.result?.map((user) => (
              <Card className="card" key={user.id}>
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Subtitle>{user.email}</Card.Subtitle>
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
