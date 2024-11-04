import { getUsers } from "../../models/user.model"
import { UserInterface } from "../../utils/interfaces/UserInterface"

async function getAllUsers () {
    const allUsers: UserInterface[] = await getUsers()
    return {
      data: allUsers
    }
}

export default getAllUsers