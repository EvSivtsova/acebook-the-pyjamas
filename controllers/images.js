const fs = require("fs");
const Image = require("../models/image");
const path = require("path");

const ImageController = {
  Index: async (req, res) => {
    const images = await Image.find({});
    res.render("images/index", {
      images: images,
    });
  },

  Add: async (req, res) => {
    const uploadedFile = path.join(
      path.resolve(__dirname, "..") + "/uploads/" + req.file.filename
    );
    const image = new Image({
      name: req.body.name,
      desc: req.body.desc,
      img: {
        data: fs.readFileSync(uploadedFile, "base64"),
        contentType: req.file.mimetype,
      },
    });

    await image.save();
    fs.rm(uploadedFile, () => {});
    res.redirect("/image");
  },
};

module.exports = ImageController;