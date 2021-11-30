import prisma from "../../lib/prisma";
/*
  Home Page Base Route
  Only GET is allowed here
*/
export default async function projectsHandler(req, res) {
  const limit = 10;
  const {
    query: { page },
    method,
  } = req;
  console.log(req.query);
  switch (method) {
    case "GET":
      try {
        // console.log("I've actually worked");
        // const pageNum = page === "" ? undefined : { id: parseInt(page) };
        const pageNum = page ? parseInt(page) : 0;
        console.log(pageNum);
        const projects = await prisma.project.findMany({
          take: limit,
          cursor: pageNum,
          skip: 1,
          orderBy: {
            createdAt: "desc",
          },
          include: {
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
        // JSON.stringify(projects);
        res.status(200).json(projects);
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
