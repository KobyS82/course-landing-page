import {gql, GraphQLClient} from 'graphql-request'
import CourseSection from '../components/CourseSection'

export default function Home() {
  const course = getStaticProps();
  console.log("course");
  console.log(course);
  return (
    <div>
      <h1>Home Page</h1>
      {/* {course.courseDetail.map(section => <CourseSection details = {section} key={section.id} />)} */}
    </div>
  )
}

const query = gql`
  query {
    course {
      id
      name
      slug
      courseDetail {
        ... on HeaderRecord {
          __typename
          bigTitle
          smallTitle
          buttonText
          description
          id
        }
      }
    }
  }
`

export async function getStaticProps() {
  const endpoint = "https://graphql.datocms.com/"
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
    }
  });

  const course = await graphQLClient.request(query)
  console.log("course querried");

  return {
    props: {
      course
    }
  }
}



