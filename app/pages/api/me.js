import prisma from "../../lib/prisma";
import { getSession } from "next-auth/client";
/*
  Fetch the current user's profile
  Only GET is allowed here ->
*/
export default async function meHandler(req, res) {
  const session = await getSession({ req });
  // if there is no session, send 401
  if (!session) {
    res.status(401).send("Not authenticated");
    return;
  }

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const me = await prisma.session.findUnique({
          where: {
            accessToken: session.accessToken,
          },
          select: {
            user: {
              include: {
                creatorOf: true,
                memberOf: true,
              },
            },
          },
        });
        // JSON.stringify(me);

        res.status(200).json(me);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
