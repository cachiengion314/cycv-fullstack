import React from 'react'
import styled from "styled-components"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import Block from '../../../../custom-components/Block'
import Vars from "../../../other-stuffs/Vars"
import Button from "../../../../custom-components/Button"

const BlockModified = styled(Block)`
    position: relative;
    @media (max-width : ${props => props.mediaMaxWidth || "600px"}){
        & {
            width : 100%;
        }
    }
`

const FloatButton = styled(Button)`
    position: absolute;
    bottom: -1.2rem;
    right: 0;
    height: 1rem;
    background-color: red;
`

const LocationMarker = ({ _id, indexOfHigherComponent, latitude, longitude, dispatch }) => {
    const [position, setPosition] = React.useState(null)
    const [isClicked, setIsClicked] = React.useState(false)

    const map = useMapEvents({
        click(e) {
            if (!isClicked) {
                Vars.showYesNo(dispatch, `Do you want to locate your self?`, () => {
                    Vars.showToast(dispatch, `Please wait for us to find your location`)
                    map.locate()
                })
            }
        },
        locationfound(e) {
            setIsClicked(true)
            Vars.showNotify(dispatch, `Congratulation! We've just found your location in this map!`)
            const { lat, lng } = e.latlng
            latitude = lat
            longitude = lng
            Vars.editingText(dispatch, latitude, `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/latitude`, _id)
            Vars.editingText(dispatch, longitude, `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/longitude`, _id)
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })
    return position === null ? null : (
        <Marker position={position}>
            <Popup>
                Please waiting....!
            </Popup>
        </Marker>
    )
}

const LocationBlock = ({ _id, latitude, longitude, IsDayTime, temperature, skyStatus, isHide, dispatch, indexOfHigherComponent, className }) => {
    React.useEffect(() => {
        const setCurrentWeatherMarkerInfo = async (latitude, longitude) => {
            const url_getCurrentWeather = Vars.urlGetWeather(latitude, longitude)
            const rawData = await Vars.fetchApi(url_getCurrentWeather)
            const weatherInfo = rawData.doc
            if (rawData.messenger === "successfully!") {
                Vars.editingText(dispatch, weatherInfo.IsDayTime, `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/IsDayTime`, _id)
                Vars.editingText(dispatch, weatherInfo.temperature, `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/temperature`, _id)
                Vars.editingText(dispatch, weatherInfo.skyStatus, `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/skyStatus`, _id)
                return
            }
        }

        setCurrentWeatherMarkerInfo(latitude, longitude)
    }
        , [longitude])

    const handleRemove = () => {
        Vars.removeComponentIn(dispatch,
            `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}`
        )
    }

    return (
        <BlockModified className={className} width="100%" height="16rem" mediaMaxWidth={Vars.MEDIA_MAX_WIDTH}>
            <MapContainer
                center={{ lat: latitude, lng: longitude }}
                zoom={13}
                scrollWheelZoom={false}
                className="w-100 h-100"
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    (!latitude && !longitude) &&
                    <LocationMarker _id={_id} indexOfHigherComponent={indexOfHigherComponent} latitude={latitude} longitude={longitude} dispatch={dispatch} />
                    ||
                    <Marker position={{ lat: latitude, lng: longitude }}>
                        <Popup>
                            I am here at {IsDayTime ? "day" : "night"} <br />
                            and the temperature is {temperature} celsius with <br />
                            the sky is quite {skyStatus}
                        </Popup>
                    </Marker>
                }
            </MapContainer>
            <FloatButton isHide={isHide} onClick={handleRemove} fontSize={Vars.FONT_SIZE_SM}></FloatButton>
        </BlockModified>
    )
}

export default (LocationBlock)