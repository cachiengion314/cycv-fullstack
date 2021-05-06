import React from 'react';
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import Block from '../../../../custom-components/Block';
import Vars from "../../../other-stuffs/Vars";
import Button from "../../../../custom-components/Button";

const BlockModified = styled(Block)`
    position: relative;
    @media (max-width : ${props => props.mediaMaxWidth || "600px"}){
        & {
            width : 100%;
        }
    }
`;

const FloatButton = styled(Button)`
    position: absolute;
    bottom: -1.2rem;
    right: 0;
    height: 1rem;
    background-color: red;
`;

const LocationMarker = ({ _id, indexOfHigherComponent, latitude, longitude, dispatch }) => {
    const [position, setPosition] = React.useState(null);
    const [isClicked, setIsClicked] = React.useState(false);

    const map = useMapEvents({
        click(e) {
            if (!isClicked) {
                Vars.showYesNo(dispatch, `Do you want to locate your self?`, () => {
                    Vars.showLoading(dispatch, `Please wait for us to find your location`);
                    map.locate();
                });
            }
        },
        locationfound(e) {
            setIsClicked(true);
            Vars.showNotify(dispatch, `Congratulation! We've just found your location in this map!`);
            // console.log(`latlong`, e.latlng) // latlong LatLng {lat: 21.015507, lng: 105.829033}
            const { lat, lng } = e.latlng;
            latitude = lat;
            longitude = lng;
            Vars.editingText(dispatch, latitude, `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/latitude`, _id);
            Vars.editingText(dispatch, longitude, `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}/longitude`, _id);
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    })
    return position === null ? null : (
        <Marker position={position}>
            <Popup>
                You are here. <br /> Heheeehehe.
            </Popup>
        </Marker>
    )
}

const LocationBlock = ({ _id, latitude, longitude, isHide, dispatch, indexOfHigherComponent, className }) => {
    const getWeatherFromApi = (latitude, longitude) => {
        fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}`)
            .then(async (response) => {
                let rawDt = await response.json();
                console.log(`raw data in weather api`, rawDt);
            });
    }

    const handleRemove = () => {
        Vars.removeComponentIn(dispatch,
            `homePage/aboutMe/${indexOfHigherComponent}/childs/${_id}`
        );
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
                            You are here. <br /> Heheeehehe.
                        </Popup>
                    </Marker>
                }
            </MapContainer>
            <FloatButton isHide={isHide} onClick={handleRemove} fontSize={Vars.FONT_SIZE_SM}></FloatButton>
        </BlockModified>
    )
}

export default (LocationBlock);