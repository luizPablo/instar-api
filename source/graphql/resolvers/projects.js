import models, { Sequelize } from '../../../models'

const users = models.users
const projects = models.projects
const profiles = models.profiles

const projectsResolver = {
    Query: {
        async showProject(root, { id }) {
            const response = await projects.findOne({
                where: {
                    id: id,
                },
                include: [{ model: users }, { model: profiles }]
            })

            return response
        },

        async showProjects(root) {
            const response = await projects.findAll({
                where: {
                    userId: root.sub
                }
            })

            return response
        },

        async showOtherProjects(root) {
            const response = await projects.findAll({
                include: {
                    model: profiles, where: { id: { [Sequelize.Op.ne]: null } }, include: {
                        model: users, where: { id: root.sub }
                    }
                }
            })

            return response
        }
    },

    Mutation: {
        async storeProject(root, { input }) {
            input.userId = root.sub
            const response = await projects.create(input);

            return response
        }
    }
};

export default projectsResolver