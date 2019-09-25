import models from '../../../models'

const users = models.users
const profiles = models.profiles

const profilesResolver = {
    Query: {
        async showProfiles(root, { projectId }) {
            const response = await profiles.findAll({
                where: {
                    projectId: projectId
                }
            })

            return response
        },

        async showProfile(root, { id }) {
            const response = await profiles.findOne({
                where: {
                    id: id,
                },
                include: {
                    model: users
                }
            })

            return response
        },
    },

    Mutation: {
        async storeProfile(root, { input }) {
            const response = await profiles.create(input);

            return response
        },

        async addProfileUser(root, { username, profileId }) {
            const user = await users.findOne({
                where: {
                    username: username
                }
            })

            if (!user) {
                return { error: true, message: 'user not found' }

            } else {
                const profile = await profiles.findByPk(profileId)

                if (!profile) {
                    return { error: true, message: 'profile not found' }

                } else {
                    if (profile.addUser(user.id)) {
                        return { error: false, message: 'sucess' }
                    } else {
                        return { error: true, message: 'profile add user error' }
                    }
                    
                }

            }
        }
    }
};

export default profilesResolver