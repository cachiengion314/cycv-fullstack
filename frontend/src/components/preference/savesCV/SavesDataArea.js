import React from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import Block from "../../../custom-components/Block";
import Avatar from '../../../custom-components/Avatar';
import Button from '../../../custom-components/Button';
import EditableText from '../../other-stuffs/EditableText';
import Vars from "../../other-stuffs/Vars";
import useRoute from "../../authenticate/useRoute";

const SavesDataBlock = styled(Block)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const SingleSaveBlockModified = styled(Block)`
    position: relative;
    padding: 4px;
    transition: .5s;
    background-color: inherit;
    @media (max-width: ${props => props.mediaMaxWidth || "600px"}){
       & {
           width: 100%;
       }
   }
`;
const FloatButton = styled(Button)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    &:hover {
        background-color: white;
    }
`;

const SavesDataArea = ({ width, savesData, userId, password, current_saveDataId, name, dispatch, className }) => {
    const route = useRoute()

    const handleRemove = (e) => {
        const this_saveDataId = e.target.parentNode.parentNode.id;
        if (current_saveDataId === this_saveDataId) {
            Vars.showNotify(dispatch, "You can't not remove this file since you are opening it already!", Vars.sadImg)
            return
        }
        Vars.showYesNo(dispatch, `Do you really want to remove this save file?`, () => {
            Vars.showLoading(dispatch, `Please wait!`, async () => {
                let rawData = await Vars.fetchApi(Vars.urlRemoveSaveData(this_saveDataId), {
                    method: 'DELETE',
                })
                if (rawData && rawData.messenger === "successfully!") {
                    Vars.showNotify(dispatch, `Remove completed!`)
                    // update the removal into redux store
                    const updatedSavesData = Vars.removeSaveDataInSavesData(savesData, this_saveDataId)
                    Vars.updateSavesDataInStore(dispatch, updatedSavesData)
                    // save to local
                    Vars.saveUserInfoToLocal(userId, password, name, updatedSavesData, current_saveDataId);
                    return;
                }
                Vars.showNotify(dispatch, "Something went wrong!", Vars.sadImg)
                Vars.signOut(dispatch)
                console.log(`responseData:`, rawData)
            }, 300)
        })
    }

    const handleOpen = (e) => {
        const this_saveDataId = e.target.parentNode.id;
        if (current_saveDataId === this_saveDataId) {
            Vars.showNotify(dispatch, "You are opening it already!", Vars.happyImg);
            return;
        }
        Vars.showYesNo(dispatch, `Do you want to open this file?`, () => {
            // apply the new saveDataId into redux store
            Vars.applySaveDataId(dispatch, this_saveDataId)
            // save to local
            Vars.saveUserInfoToLocal(userId, password, name, savesData, this_saveDataId)
            Vars.closeModal(dispatch)
            // redirect route
            // route.push(`${userId}?saveDataId=${this_saveDataId}`)
            route.push(Vars.url_username_saveid(name, this_saveDataId))
        });
    }

    if (!savesData || savesData.length === 0) {
        return (
            <div>There is no save file</div>
        )
    }

    return (
        <SavesDataBlock zIndex="0" width={width} className={className}>
            {
                savesData.map(singleSave => {
                    const { saveData, createdAt, _id } = singleSave;
                    return (
                        <SingleSaveBlockModified id={_id} key={_id} width="100%" border="1px solid darkblue" borderRadius=".5rem" className="mb-2">
                            <Avatar width="7%" zIndex="2" src={Vars.mailImg} className="me-3 float-start" />
                            <EditableText width="35%" zIndex="2" textAlign="left" fontSize={Vars.FONT_SIZE_SM} className="float-start" readOnly value={saveData.name} />
                            <EditableText width="6%" zIndex="2" onClick={handleRemove} fontSize={Vars.FONT_SIZE_MD} readOnly value="X" className={"float-end custom-btn"} />
                            <EditableText width="18%" zIndex="2" fontSize={Vars.FONT_SIZE_SM} className="float-end me-3" readOnly value={createdAt.split("T")[0]} />
                            <FloatButton zIndex="1" onClick={handleOpen}></FloatButton>
                        </SingleSaveBlockModified>
                    )
                })
            }

        </SavesDataBlock>
    )
}
const mapStoreToProps = (currentStore) => {
    return {
        savesData: currentStore.user.savesData,
        current_saveDataId: currentStore.user.current_saveDataId,
        password: currentStore.user.password,
        userId: currentStore.user.userId,
        name: currentStore.user.name,
    }
}
export default connect(mapStoreToProps)(SavesDataArea);