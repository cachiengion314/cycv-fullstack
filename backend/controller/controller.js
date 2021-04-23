const axios = require(`axios`);
const Model = require(`../model/model`);
const ObjectId = require(`mongoose`).Types.ObjectId;
const bcrypt = require('bcryptjs');

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
// /api/remove-savedata/:id
//
exports.removeSaveData = (request, response) => {
    const { id } = request.params;
    const { saveDataId, password } = request.query;

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
                response.status(404).send({ messenger: "your info is so wrong!" });
                return;
            }
            console.log(`Can't find anything due to invalid password or id!`)
            response.send({ messenger: "Can't find anything due to invalid password or id!" })
        })
}
//
// /api/update-savedata/:id
//
exports.updateSaveData = (request, response) => {
    const { id } = request.params;
    const { saveDataId, password } = request.query;
    const saveData = request.body;
    if (!request.body) {
        response.status(404).send({ messenger: "content cannot be empty!" });
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
                response.send({ messenger: "successfully!" });
                return;
            }
            if (err) {
                console.log(`err`, err)
                response.status(404).send({ messenger: "your info is so wrong!" });
                return;
            }
            console.log(`Can't find anything due to invalid password or id!`)
            response.send({ messenger: "Can't find anything due to invalid password or id!" })
        })
}
//
// /api/add-savedata/:id
//
exports.addSaveData = (request, response) => {
    const { id } = request.params;
    const { password } = request.query;
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
                response.status(404).send({ messenger: "your info is so wrong!" });
                return;
            }
            console.log(`Can't find anything due to invalid password or id!`)
            response.send({ messenger: "Can't find anything due to invalid password or id!" })
        })
}
//
// /api/get-savesdata/:id
//
exports.getSavesData = async (request, response) => {
    const { id } = request.params;
    const { password, saveDataId } = request.query;
    let doc;
    if (password) {
        try {
            doc = await Model.cycvuser.findOne(
                {
                    _id: ObjectId(id),
                });
        } catch (err) {
            console.log(`err`, err)
            response.status(404).send({ messenger: "your info is so wrong!" });
            return;
        }
        if (doc) {
            const _doc_password = doc.password;
            const isMatch = bcrypt.compareSync(password, _doc_password);
            if (isMatch) {
                response.send({ doc: { savesData: doc.savesData }, messenger: "successfully!" });
                return;
            }
            response.send({ messenger: "authenticate fail!" });
            return;
        }
        response.status(404).send({ messenger: "something went wrong!" });
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
            response.status(404).send({ messenger: "your query is so wrong!" });
            return;
        }
        console.log(`doc`, doc[0])
        if (doc.length > 0) {
            response.send({ doc: doc[0].savesData[0], messenger: "successfully!" });
            return;
        }
        response.status(404).send({ messenger: "something went wrong!" });
        return;
    }

}
//
//
//
exports.notfound = (request, response) => {
    response.send({ messenger: `we can not found you location and this is a 404 page, if you ask :D` });
}