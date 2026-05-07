const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createOpportunity = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      deadline,
      clubId,
    } = req.body;

    const opportunity = await prisma.opportunity.create({
      data: {
        title,
        description,
        type,
        deadline: deadline ? new Date(deadline) : null,

        creatorId: req.user.id,

        clubId,
      },
    });

    res.status(201).json(opportunity);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getOpportunities = async (req, res) => {
  try {
    const opportunities = await prisma.opportunity.findMany({
      include: {
        club: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(opportunities);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createOpportunity,
  getOpportunities,
};