import models from '../../../models'

const users = models.users
const roles = models.roles

const usersResolver = {
    Query: {
        async user(root) {
            return await users.findOne({
                where: {
                    id: root.sub
                },
                include: {
                    model: roles
                }
            })
        },
    },
};

export default usersResolver