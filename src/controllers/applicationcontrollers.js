const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const applyToOpportunity = async (req, res) => {
  try {
    const { opportunityId, roleId } = req.body;

    const existingApplication = await prisma.application.findFirst({
      where: {
        userId: req.user.id,
        opportunityId,
      },
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied",
      });
    }

    const application = await prisma.application.create({
      data: {
        userId: req.user.id,
        opportunityId,
        roleId,
      },
    });

    res.status(201).json(application);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        userId: req.user.id,
      },

      include: {
        opportunity: true,
      },
    });

    res.json(applications);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  applyToOpportunity,
  getMyApplications,
};