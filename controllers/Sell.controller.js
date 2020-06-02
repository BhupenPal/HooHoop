const carModel = require("../models/carModel");
const fs = require("fs");
const ffmpeg = require("ffmpeg");
const sharp = require("sharp");
sharp.cache(false);
const fetch = require("node-fetch");

/* Sell Routes */
module.exports = {
  getSell: (req, res, next) => {
    res.render("sell_car");
  },

  getSellForm: (req, res, next) => {
    res.render("sell_form", { detailedCarObject: false });
  },

  getCarJam: async (req, res, next) => {
    if (req.xhr) {
      const vinFigure = req.query.Plate;
      const secret = process.env.API_KEY;
      const urlReq = `https://carjam.co.nz/a/vehicle:abcd?key=${secret}&plate=${vinFigure}`;
      let carDetails = await fetch(urlReq).then((res) => res.json());
      res.json(carDetails);
      res.end();
    } else {
      next(new Error("Unauthorised Access"));
    }
  },

  postCar: async (req, res, next) => {
    console.log("POST"+ req.stop)
    if (req.stop) {
      res.send("CAR ALREADY EXISTS");
    } else {
      try {
        const VideoFileName = req.files.exterior[0].filename;

        let {
          Price,
          minPrice,
          Make,
          Model,
          FuelType,
          BodyType,
          ModelYear,
          Transmission,
          DoorNum,
          SeatNum,
          ModelDetail,
          ImportHistory,
          PreviousOwners,
          vinNum,
          kMeters,
          Colour,
          engineSize,
          cylinderNum,
          Description,
          DealerName,
          DealerNum,
          DealerEmail,
          WoFexpiry,
          regExpiry,
          DriveWheel4,
          RoadCost,
          FuelStar,
          SafetyStar,
          carAddr,
        } = req.body;

        let newCar = new carModel({
          Price,
          minPrice,
          FuelType,
          BodyType,
          ModelYear,
          Transmission,
          DoorNum,
          SeatNum,
          ModelDetail,
          ImportHistory,
          PreviousOwners,
          kMeters,
          Colour,
          engineSize,
          cylinderNum,
          Description,
          WoFexpiry,
          regExpiry,
        });

        vinNum = vinNum.toUpperCase();
        newCar.Make = Make.toUpperCase();
        newCar.Model = Model.toUpperCase();
        newCar.Age = new Date().getFullYear() - ModelYear;
        newCar.authorEmail = req.user.email;
        newCar.vinNum = vinNum;
        newCar.authorID = req.user._id;

        if (FuelStar !== null) {
          FuelStar = FuelStar > 10 ? 10 : FuelStar;
          newCar.FuelStar = FuelStar;
        }

        if (SafetyStar !== null) {
          SafetyStar = SafetyStar > 10 ? 10 : SafetyStar;
          newCar.SafetyStar = SafetyStar;
        }

        if (carAddr !== null) {
          newCar.carAddr = carAddr;
        }

        newCar.DealerName = DealerName;
        if (!DealerName) {
          newCar.DealerName = `${req.user.firstName} ${req.user.lastName}`;
        }

        newCar.DealerNum = DealerNum;
        if (!DealerNum) {
          newCar.DealerNum = req.user.phoneNum;
        }

        newCar.DealerEmail = DealerEmail;
        if (!DealerEmail) {
          newCar.DealerEmail = req.user.email;
        }

        if (DriveWheel4 == "on") {
          newCar.DriveWheel4 = 4;
        }

        if (RoadCost == true) {
          newCar.RoadCost = "";
        }

        newCar.date = getTodayDate();

        const process = new ffmpeg(
          `./assets/Uploads/${vinNum}/exterior/${VideoFileName}`
        );
        process
          .then(
            function (video) {
              video.fnExtractFrameToJPG(
                `./assets/Uploads/${vinNum}/exterior`,
                {
                  frame_rate: 2,
                  file_name: "Photo%i",
                  keep_pixel_aspect_ratio: true,
                  keep_aspect_ratio: false,
                  size: "1920x1080",
                },
                function (error) {
                  if (!error) {
                    console.log("Frame Break Done");
                    fs.mkdirSync(`./assets/Uploads/${vinNum}/thumbnail`);
                    fs.unlink(
                      `./assets/Uploads/${vinNum}/exterior/${VideoFileName}`,
                      () => {
                        Promise.all(
                          [380, 30].map(async (size) => {
                            await sharp(
                              `./assets/Uploads/${vinNum}/exterior/Photo_1.jpg`
                            )
                              .resize(size, size)
                              .jpeg({ quality: 90 })
                              .toFile(
                                `./assets/Uploads/${vinNum}/thumbnail/Photo${size}.jpg`
                              );
                          })
                        ).then(() => {
                          let FileCount = fs.readdirSync(
                            `./assets/Uploads/${vinNum}/exterior/`
                          );
                          newCar.TotFrame = FileCount.length;
                          newCar.save();
                        });
                      }
                    );
                  }
                }
              );
            },
            function (err) {
              console.log("Error: " + err);
            }
          )
          .catch((err) => {
            console.log(err);
          });

        fs.readdir(`./assets/Uploads/${vinNum}/interior`, (err, files) => {
          files.forEach(async (currFile) => {
            await sharp(`./assets/Uploads/${vinNum}/interior/${currFile}`)
              .resize(3200, 1600)
              .jpeg({ quality: 100 })
              .toFile(
                `./assets/Uploads/${vinNum}/interior/${currFile.toUpperCase()}`,
                (err, info) => {
                  fs.unlinkSync(
                    `./assets/Uploads/${vinNum}/interior/${currFile}`
                  );
                }
              );
          });
        });
        res.send("CAR UPLOADED SUCCESSFULLY");
        res.end();
      } catch (err) {
        res.send(err);
        res.end();
      }
    }
  },
};

function getTodayDate() {
  let date = new Date();
  date = date.toDateString();
  date = date.substring(4);
  date = date.split(" ").join("-");
  return date;
}
