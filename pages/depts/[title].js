import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import { getDeAnzaDept } from '../../backend/opencourse_api'
import PageLayout from '../../components/PageLayout'

const course = () => {
  const router = useRouter()
  const { title } = router.query

  const deptData = getDeAnzaDept(title).then((r) => {
    return r
  })

  console.log(deptData)

  return (
    <PageLayout>
      <Container></Container>
    </PageLayout>
  )
}

export default course
