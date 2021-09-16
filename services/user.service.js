const User = require('../db/User');
const { userUtil } = require('../utils');

module.exports = {
    findAll: async (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;
        const skip = (page - 1) * perPage;
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        const filterObject = {};

        Object.keys(filters).forEach((key) => {
            switch (key) {
                case 'role':
                    const rolesArr = filters.role.split(';');
                    filterObject.role = { $in: rolesArr };
                    break;
                case 'email':
                    filterObject.email = filters.email;
                    break;
                case 'name':
                    filterObject.name = { $regex: `^${filters.name}`, $options: 'gi' };
                    break;
                case 'book':
                    filterObject.book = filters.book;
                    break;
            }
        });
        const users = await User
            .find(filterObject)
            .limit(+perPage)
            .skip(skip)
            .sort(sort);

        const normalizedUsers = users.map((user) => userUtil.userNormalizator(user));

        const count = await User.countDocuments(filterObject);

        return {
            data: normalizedUsers,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage)
        };
    }
};
