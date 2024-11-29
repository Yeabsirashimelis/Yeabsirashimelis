import InititalModal from "@/components/folder/InititalModal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/InitialProfile";
import { redirect } from "next/navigation";

const SetupPage = async function name() {
  const profile = (await initialProfile()) as {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InititalModal />;
};

export default SetupPage;
