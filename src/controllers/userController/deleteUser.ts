import { deleteUserDb } from "../../models/user.model";
import { DeleteUserPayloadInterface } from "../../utils/interfaces/DeleteUserPayloadInterface";

async function deleteUser(payload: DeleteUserPayloadInterface) {
  const id = payload.id
  if (!id) throw new Error('Ha ocurrido un error.')
  const userDelete = await deleteUserDb(id)

  return {
    message: "User deleted",
  }
}

export default deleteUser