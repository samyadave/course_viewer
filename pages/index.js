import { Card, Col, Container, Row } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/dist/client/router'

import { GET_DEPTS } from '../backend/queries'
import PageLayout from '../components/PageLayout'

const Home = () => {
  const router = useRouter()
  const { data: deptData, loading: deptLoading } = useQuery(GET_DEPTS)

  return (
    <PageLayout>
      <Container>
        <div>
          {deptLoading ? (
            <div>Loading...</div>
          ) : (
            <Row xs={1} md={3} className="g-2">
              {deptData?.result?.map((dept) => (
                <Col key={dept.id}>
                  <Card
                    variant="primary"
                    onClick={() => router.push(`../depts/${dept.id}`)}
                  >
                    {dept.name}
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
    </PageLayout>
  )
}

export default Home
