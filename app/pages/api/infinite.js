/*
  TODO: Make it look pretty
*/
import prisma from "../../lib/prisma";
/*
  Home Page Base Route
  Only GET is allowed here
*/
export default async function infiniteHandler(req, res) {
  // request object
  const {
    query: { cursor },
    method,
  } = req;
  // limit is the number of items to be returned
  const limit = 7;

  switch (method) {
    case "GET":
      try {
        const projects = await dbQuery(limit, cursor);
        const count = await prisma.project.count();
        // Remember: zero-based index! Database count starts form 0
        const lastPostInResults = projects[projects.length - 1];
        const lastCursor = lastPostInResults.id;

        // response should be a serializable json object
        res.status(200).json(
          JSON.stringify({
            projects,
            count,
            nextCursor: projects.length === limit ? lastCursor : undefined,
          })
        );
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function dbQuery(limit, cursor) {
  // page cursor is an object inside the prisma
  const pageCursor = cursor === "" ? undefined : { id: cursor };

  return await prisma.project.findMany({
    take: limit,
    cursor: pageCursor,
    skip: cursor === "" ? 0 : 1,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: true,
      keywords: {
        select: {
          keyword: true,
        },
      },
      team: {
        include: {
          members: {
            select: {
              // id: true,
              name: true,
              image: true,
              github: true,
            },
          },
        },
      },
    },
  });
}
