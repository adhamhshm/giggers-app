import { getUserProjects } from "@/lib/actions";
import ProfileLayout from "@/components/ProfileLayout";
import { UserProfile } from "@/common.types";


type Props = {
    params: {
        id: string,
    },
}

const Profile = async ({ params }: Props) => {

    //get the user projects as the same used when user click a project that shows other projects by the user
    //can pass a limit on how many projects to show
    const result = await getUserProjects(params.id, 100) as { user: UserProfile }

    //if user failed to fetch user
    if (!result?.user) { 
        return (
            <p className="no-result-text">User not found.</p>
        )
    }

    //return a component that show the profile details
    return (
        <ProfileLayout user={result?.user}  />
    )
}


export default Profile;