import * as mgtRole from "~/stores/roles";

const roles = mgtRole.roles;
const UserCanAccess = (action, type, permissions) => {
	if (
		permissions.find(
			(id) => id === roles.admin.all || id === roles[type][action] || roles[type].all === id,
			id === roles.all[type]
		)
	) {
		return true;
	}
};
export { UserCanAccess };
