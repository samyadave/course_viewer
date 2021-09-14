const axios = require('axios')

export const getDeAnzaDept = async (dept) => {
  const url = `https://opencourse.dev/da/depts/${dept}/courses`
  const { data } = await axios.get(url)
  return data
}

// getDeAnzaDept('MATH')

// export const GET_COURSES = () => {
//   let response = new Array()
//   fetch('https://opencourse.dev/da/depts').then((r) => r.json())
//   console.log('r', response)

//   return response
// }

// export const getCourses = fetch('https://opencourse.dev/da/depts')
//   .then((r) => r.json())
//   .then(function (r) {
//     return r
//   })
