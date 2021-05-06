const axios = require(`axios`)
const Model = require(`../model/model`)
const ObjectId = require(`mongoose`).Types.ObjectId
const bcrypt = require('bcryptjs')

//
// /api/weather
//
exports.weather = async (request, response) => {
    const accuApiKey = process.env.KEY_ACCU_API;
    const { latitude, longitude } = request.query;
    console.log(`lat, long, accuapikey`, latitude, longitude, accuApiKey)

    const weatherPosApiUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuApiKey}&q=${latitude}%2C${longitude}`;
    let axios_posResponse;
    try {
        axios_posResponse = await axios.get(weatherPosApiUrl);
    } catch (err) {
        console.log(`err from fetch pos`, err)
        response.status(404).send({ messenger: "your info is so wrong!" });
        return;
    }
    const rawposKeyDt = axios_posResponse.data;
    console.log(`rawposKeyDt`, rawposKeyDt)
    const posKey = rawposKeyDt[`Key`];

    const weatherApiUrl = `http://dataservice.accuweather.com/currentconditions/v1/${posKey}?apikey=${accuApiKey}`;
    let axios_weatherResponse;
    try {
        axios_weatherResponse = await axios.get(weatherApiUrl);
    } catch (err) {
        console.log(`err from fetch weather`, err)
        response.status(404).send({ messenger: "your info is so wrong!" });
        return;
    }
    let rawWeatherDt = axios_weatherResponse.data;
    console.log(`rawWeatherDt`, rawWeatherDt)

    let temperInfo = {
        temperature: rawWeatherDt[0][`Temperature`][`Metric`][`Value`],
        skyStatus: rawWeatherDt[0][`WeatherText`],
        IsDayTime: rawWeatherDt[0][`IsDayTime`],
    }

    let finalData = {
        doc: {
            ...temperInfo,
            latitude,
            longitude,
            timestamp: Date.now(),
            locationKey: posKey,
        },
        messenger: "successfully"
    };
    response.json(finalData);
}
//
// /api/get-all-savefile-showcase
//
exports.getAllSaveFileShowCase = async (request, response) => {
    const { page, pageSize } = request.query
    const _pageSize = Number(pageSize) || 8
    const _page = Number(page) || 1
    const skip = (_page - 1) * _pageSize

    try {
        const docs = await Model.cycShowCaseSaveFile.aggregate(
            [
                {
                    $facet: {
                        totalItems: [
                            {
                                $match: {
                                    "saveData.preference.savePreference.isCvPublic": true
                                }
                            },
                            {
                                $count: "total"
                            }
                        ],
                        allSaveFiles: [
                            {
                                $match: {
                                    "saveData.preference.savePreference.isCvPublic": true
                                }
                            },
                            {
                                $skip: skip
                            },
                            {
                                $limit: _pageSize
                            },
                            {
                                $lookup: {
                                    from: "cycvusers",
                                    localField: "createdBy",
                                    foreignField: "_id",
                                    as: "_createdByUser"
                                }
                            },
                            {
                                $unwind: {
                                    path: "$_createdByUser",
                                }
                            },
                            {
                                $project: {
                                    "_id": 1,
                                    "saveData": 1,
                                    "createdBy": "$_createdByUser.email",
                                    "createdAt": 1,
                                }
                            }
                        ]
                    }
                },
                {
                    $unwind: {
                        path: "$totalItems",
                    }
                },
            ]
        )
        response.send({ docs, messenger: "successfully!" })
    } catch (err) {
        response.send({ docs, messenger: err })
    }
}
//
// /api/get-specific-savefile-showcase
//
exports.getSpecificSaveFileShowcase = (request, response) => {
    const { savefileId } = request.query

    Model.cycShowCaseSaveFile.findOne({
        _id: ObjectId(savefileId),
        "saveData.preference.savePreference.isCvPublic": true
    })
        .populate({
            path: "createdBy",
            select: "email"
        })
        .exec(function (err, doc) {
            if (!err) {
                if (doc) {
                    response.send({ doc, messenger: "successfully!" })
                    return
                }
                response.send({ messenger: "maybe this cv is not mean for public view!" })
                return
            }
            if (err) {
                console.log(`messenger`, err)
                response.status(404).send({ messenger: "your info are so wrong!" })
                return
            }
            console.log(`Can't find anything`)
            response.send({ messenger: "Can't find anything" })
        })
}
//
// /api/get-all-savefile-showcase-of-user
//
exports.getAllSaveFileShowCaseOfUser = (request, response) => {
    const userId = request.user._id

    Model.cycShowCaseSaveFile.find(
        {
            "createdBy": userId
        }
    )
        .populate({
            path: "createdBy",
            select: "email"
        })
        .exec(function (err, docs) {
            if (!err) {
                response.send({ docs, messenger: "successfully!" })
                return
            }
            if (err) {
                console.log(`messenger`, err)
                response.status(404).send({ messenger: "your info are so wrong!" })
                return
            }
            console.log(`Can't find anything`)
            response.send({ messenger: "Can't find anything" })
        })
}
//
// /api/remove-savefile-showcase
//
exports.removeSaveFileShowCase = (request, response) => {
    const { savefileId } = request.query

    Model.cycShowCaseSaveFile.findOneAndDelete(
        {
            _id: ObjectId(savefileId)
        },
        function (err, doc) {
            if (!err) {
                response.send({ doc, messenger: "successfully!" })
                Model.comment.deleteMany({ createdIn: ObjectId(savefileId) }, { new: true }, function (err) {
                    if (err) {
                        console.log("delete fail with err:", err)
                        return
                    }
                    console.log("All comments deleted")
                })
                return
            }
            if (err) {
                console.log(`messenger`, err)
                response.status(404).send({ messenger: "your info are so wrong!" })
                return
            }
            console.log(`Can't find anything due to invalid id!`)
            response.send({ messenger: "Can't find anything due to invalid id!" })
        })
}
//
// /api/update-savefile-showcase
//
exports.updateSaveFileShowCase = (request, response) => {
    const { saveData } = request.body
    const { savefileId } = request.query

    Model.cycShowCaseSaveFile.findOneAndUpdate(
        {
            _id: ObjectId(savefileId),
        },
        {
            $set: {
                saveData,
            }
        }, { new: true },
        function (err, doc) {
            if (!err) {
                response.send({ messenger: "successfully!" });
                return;
            }
            if (err) {
                console.log(`messenger`, err)
                response.status(404).send({ messenger: "your info are so wrong!" });
                return;
            }
            console.log(`Can't find anything due to invalid password or id!`)
            response.send({ messenger: "Can't find anything due to invalid password or id!" })
        })
}
//
// /api/add-savefile-showcase
//
exports.addSaveFileToShowCase = (request, response) => {
    const id = request.user._id
    const { saveData } = request.body

    Model.cycShowCaseSaveFile.create({ saveData, createdBy: id }, function (err, doc) {
        if (err) {
            response.send({ messenger: err })
            return
        }
        response.send({ doc, messenger: "successfully!" })
    })
}
//
// /api/get-comments
//
exports.getComments = (request, response) => {
    const { savefileId } = request.query
    if (!savefileId) {
        response.send({ messenger: "savefileId is empty!" })
        return
    }

    Model.comment.find({
        createdIn: savefileId
    })
        .populate({
            path: "createdBy",
            select: "email"
        })
        .exec(function (err, docs) {
            if (err) {
                console.log(err)
                response.send({ messenger: err })
                return
            }
            console.log(`getComment`, docs)
            response.send({ docs, messenger: "successfully!" })
        })
}
//
// /api/remove-comment
//
exports.addComment = (request, response) => {
    const { commentId } = request.query

    Model.comment.findByIdAndDelete(commentId, function (err, doc) {
        if (err) {
            response.send({ messenger: err })
            return
        }
        response.send({ messenger: "successfully!" })
    })
}
//
// /api/add-comment
//
exports.addComment = (request, response) => {
    const id = request.user._id
    const { content, createdIn } = request.body

    Model.comment.create({ content, createdIn, createdBy: id }, function (err, doc) {
        if (err) {
            response.send({ messenger: err })
            return
        }
        response.send({ doc, messenger: "successfully!" })
    })
}
//
//
//
//
// @Old-api
//
//
//
// /api/remove-savedata/:token
//
exports.removeSaveData = (request, response) => {
    const id = request.user._id
    const { saveDataId } = request.query;

    Model.cycvuser.findOneAndUpdate(
        {
            _id: ObjectId(id),
        },
        {
            $pull: {
                "savesData": {
                    _saveDataId: ObjectId(saveDataId)
                }
            }
        },
        function (err, doc) {
            if (!err) {
                response.send({ messenger: "successfully!" });
                return;
            }
            if (err) {
                console.log(`messenger`, err)
                response.status(404).send({ messenger: "your info are so wrong!" });
                return;
            }
            console.log(`Can't find anything due to invalid password or id!`)
            response.send({ messenger: "Can't find anything due to invalid password or id!" })
        })
}
//
// /api/update-savedata/:token
//
exports.updateSaveData = (request, response) => {
    const id = request.user._id
    const { saveDataId } = request.query
    const saveData = request.body
    if (!request.body) {
        response.status(404).send({ messenger: "content cannot be empty!" })
        return;
    }

    Model.cycvuser.findOneAndUpdate(
        {
            _id: ObjectId(id),
            "savesData._saveDataId": ObjectId(saveDataId)
        },
        {
            $set: {
                "savesData.$.saveData": saveData
            }
        }, { new: true },
        function (err, doc) {
            if (doc) {
                response.send({ messenger: "successfully!" })
                return;
            }
            if (err) {
                console.log(`err`, err)
                response.status(404).send({ messenger: "your info are so wrong!" })
                return;
            }
            console.log(`Can't find anything due to invalid password or id!`)
            response.send({ messenger: "Can't find anything due to invalid password or id!" })
        })
}
//
// /api/add-savedata/:token
//
exports.addSaveData = (request, response) => {
    const id = request.user._id
    const saveData = request.body;
    if (!request.body) {
        response.status(404).send({ messenger: "content cannot be empty!" });
        return;
    }

    Model.cycvuser.findOneAndUpdate(
        {
            _id: ObjectId(id),
        },
        {
            $push: {
                "savesData": {
                    _saveDataId: new ObjectId(),
                    _createdDate: new Date().toISOString(),
                    saveData
                }
            }
        }, { new: true },
        function (err, doc) {
            if (doc) {
                const { _saveDataId, _createdDate } = doc.savesData[doc.savesData.length - 1]
                response.send({ doc: { _saveDataId, _createdDate }, messenger: "successfully!" });
                return;
            }
            if (err) {
                console.log(`err`, err)
                response.status(404).send({ messenger: "your info are so wrong!" });
                return;
            }
            console.log(`Can't find anything due to invalid password or id!`)
            response.send({ messenger: "Can't find anything due to invalid password or id!" })
        })
}
//
// /api/get-savesdata/:token
//
exports.getSavesData = async (request, response) => {
    const id = request.user._id
    const { password, saveDataId } = request.query
    let doc
    if (password) {
        try {
            doc = await Model.cycvuser.findOne(
                {
                    _id: ObjectId(id),
                });
        } catch (err) {
            console.log(`err`, err)
            response.status(404).send({ messenger: "your info are so wrong!" })
            return;
        }
        if (doc) {
            const _doc_password = doc.password;
            const isMatch = bcrypt.compareSync(password, _doc_password);
            if (isMatch) {
                response.send({ doc: { savesData: doc.savesData }, messenger: "successfully!" })
                return;
            }
            response.send({ messenger: "authenticate fail!" })
            return;
        }
        response.status(404).send({ messenger: "something went wrong!" })
        return;
    }
    // Return Specific Fields in Embedded Documents
    // => Project Specific Array Elements in the Returned Array
    if (saveDataId) {
        try {
            doc = await Model.cycvuser.find(
                {
                    _id: ObjectId(id),
                },
                {
                    _id: 0, // omit _id property
                    "savesData": {
                        $elemMatch:
                        {
                            _saveDataId:
                            {
                                $eq: ObjectId(saveDataId)
                            }
                        }
                    }
                }
            );
        } catch (err) {
            console.log(`err`, err)
            response.status(404).send({ messenger: "your query are so wrong!" })
            return;
        }
        console.log(`doc`, doc[0])
        if (doc.length > 0) {
            response.send({ doc: doc[0].savesData[0], messenger: "successfully!" })
            return;
        }
        response.status(404).send({ messenger: "something went wrong!" })
        return;
    }

}
//
//
//
exports.notfound = (request, response) => {
    response.send({ messenger: `we can not found you location and this is a 404 page, if you ask :D` });
}