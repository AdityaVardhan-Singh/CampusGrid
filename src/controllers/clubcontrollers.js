const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createClub = async (req, res) => {
  try {
    const { name, description, collegeId } = req.body;

    const club = await prisma.club.create({
      data: {
        name,
        description,
        collegeId,
      },
    });

    res.status(201).json(club);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getClubs = async (req, res) => {
  try {
    const clubs = await prisma.club.findMany();

    res.json(clubs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createClub,
  getClubs,
};