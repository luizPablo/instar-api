const typeDefs = `
    scalar Date
    scalar Confirmation

    type Role {
        id: ID!
        identifier: String!
    }

    type User {
        id: ID!
        username: String!
        name: String!
        password: String!
        cpf: String!
        role: Role
    }

    type Project {
        id: ID!
        name: String!
        user: User
        profiles: [Profile]
    }

    type Profile {
        id: ID!
        name: String!
        project: Project
        users: [User]
    }
    
    type Query {
        user: User
        showProjects: [Project]
        showProject(id: Int): Project
        showOtherProjects: [Project]
        showProfiles(projectId: Int): [Profile]
        showProfile(id: Int): Profile
    }

    input InputProject {
        name: String!
    }

    input InputProfile {
        name: String!
        projectId: Int!
    }

    type Mutation {
        storeProject(input: InputProject): Project
        storeProfile(input: InputProfile): Profile
        addProfileUser(username: String, profileId: Int): Confirmation
    }
`;

export default typeDefs;