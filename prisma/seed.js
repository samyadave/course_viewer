const { PrismaClient } = require('@prisma/client')
const { default: axios } = require('axios')

const prisma = new PrismaClient()

const getDeAnzaDepts = async () => {
  const { data: deptData } = await axios.get(`https://opencourse.dev/da/depts/`)
  deptData.map(async (dept) => {
    await prisma.dept.create({
      data: {
        id: dept.id,
        name: dept.name,
      },
    })
  })
}

const getDeAnzaCourses = async () => {
  const { data: courseData } = await axios.get(
    `https://opencourse.dev/da/courses/`
  )
  courseData.map(async (course) => {
    await prisma.course.create({
      data: {
        id: course.dept + '-' + course.course,
        title: course.title,
        number: course.course,
        dept: { connect: { id: course.dept } },
      },
    })
  })
}

const getDeAnzaClasses = async () => {
  const { data: classData } = await axios.get(
    `https://opencourse.dev/da/classes/`
  )
  classData.map(async (c) => {
    await prisma.courseclass.create({
      data: {
        crn: parseInt(c.CRN),
        professor: c.times[0].instructor[0],
        title: c.title,
        section: c.section,
        units: parseFloat(c.units),
        start: new Date(c.start),
        end: new Date(c.end),
        times: c.times.map((e) => {
          const string = JSON.stringify(e)
          return string
        }),
        course: { connect: { id: c.dept + '-' + c.course } },
      },
    })
  })
}

async function main() {
  console.log(`Start seeding ...`)
  await getDeAnzaDepts()
  await getDeAnzaCourses()
  await getDeAnzaClasses()
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
