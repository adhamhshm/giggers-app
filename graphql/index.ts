//to write queries

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
//this query will be used to create new project from "/lib/actions.ts"
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