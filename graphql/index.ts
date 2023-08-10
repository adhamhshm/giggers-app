//to write queries
//queries will be used from "/lib/actions.ts"

export const getUserQuery = `
    query GetUser($email: String!) {
        user(by: { email: $email }) {
            id
            name
            email
            avatarUrl
            description
            optionalUrl
        }
    }
`

export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!) {
        userCreate(input: $input) {
            user {
                name
                email
                avatarUrl
                description
                optionalUrl
                id
            }
        }
    }
`

export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
                    name
				}
			}
		}
	}
`

export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`
export const projectsQuery = `
  query getProjects($category: String="", $endCursor: String) {
    projectSearch(first: 1, after: $endCursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          description
          optionalUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`

export const allProjectsQuery = `
  query getProjects($endCursor: String) {
    projectSearch(first: 1, after: $endCursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          description
          optionalUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`

export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      optionalUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`

export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      optionalUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`