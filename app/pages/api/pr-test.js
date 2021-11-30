import prisma from "../../lib/prisma";
/*
  Home Page Base Route
  Only GET is allowed here
*/
export default async function projectsHandler(req, res) {
  // request object
  const {
    query: { page, cursorId },
    method,
  } = req;

  const limit = 5;
  const p = parseInt(page) || 0;

  switch (method) {
    case "GET":
      try {
        // need to check if it's the first query and pass undefined
        // const pageNum = page ? page : 0;
        // console.log(pageNum);
        const projects = await dbQuery(limit, p, cursorId);
        // Remember: zero-based index! Database count starts form 0
        const lastPostInResults = projects[projects.length - 1];
        const lastCursor = lastPostInResults.id;

        /* For now make this ver inefficient request to determine if there are more items */
        // fetch one item more and see if it actually exists in the database or not
        const tmpQuery = await dbQuery(1, p, lastCursor);
        // console.log(tmpQuery);
        const hasMore = tmpQuery.length !== 0;
        console.log(hasMore);
        // console.log(tmpQuery);
        // response should be a serializable json object
        res
          .status(200)
          .json(JSON.stringify({ projects, lastCursor, hasMore: hasMore }));
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function dbQuery(limit, page, cursorId) {
  // page cursor is an object inside the prisma
  const pageCursor = page === 0 ? undefined : { id: cursorId };

  return await prisma.project.findMany({
    take: limit,
    cursor: pageCursor,
    skip: page === 0 ? 0 : 1,
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
