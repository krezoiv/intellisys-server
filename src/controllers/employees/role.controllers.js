import { getConnection } from "../../database";
import { req, res } from "express";
import RoleModel from "../../models/role.model";
import RolesFieldsMappings from "../../mapping/roleMapping";
import { roles_queries } from "../../database/querys/rolesQuerys";


export const createRole = async (req, res) => {
  const roleModel = new RoleModel(req.body);

  try {
    const pool = await getConnection();
    const request = pool.request();

    const rolesMapping = RolesFieldsMappings.getMappings();

    for (const fieldsdRole in rolesMapping) {
      request.input(
        fieldsdRole,
        rolesMapping[fieldsdRole],
        roleModel[fieldsdRole]
      );
    }

    await request.query(roles_queries.createNewRole);

    res.json(roleModel)
  } catch (error) {

    console.log(error)
  }

  
};
