import React from "react";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import Block from "../../../custom-components/Block";
import Button from "../../../custom-components/Button";
import Text from "../../../custom-components/Text";
import Utility from "../../../custom-components/Utility";
import styled from "styled-components";
import Vars from "../../other-stuffs/Vars";
import SavesDataArea from "./SavesDataArea";
import { connect } from "react-redux";
import Input from "../../../custom-components/Input";
import useRoute from "../../authenticate/useRoute";

const BlockModified = styled(Block)`
    position: absolute;
    display: flex;
    top: ${props => props.top || "0"};
    left: ${props => props.right || "0"};
    z-index: ${props => props.zIndex || "1"};
    @media (max-width : ${props => props.mediaMaxWidth || "600px"}) {
        & {
            display: block;
        }
    }
`;

const savePdf = (imgData) => {
    const pdf = new jsPdf({
        orientation: 'landscape',
    });
    const imgProps = pdf.getImageProperties(imgData);
    console.log(`imgProps`, imgProps)
    const pdfWidth = pdf.internal.pageSize.getWidth();
    console.log(`pdf.internal.pageSize`, pdf.internal.pageSize)
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    console.log(`pdfWidth,pdfHeight`, pdfWidth, pdfHeight)
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${new Date().toISOString()}.pdf`);
}

const SaveCvNavbar = ({ width, userId, password, current_saveDataId, savesData, homePage, preference, name, dispatch, className }) => {
    const currentSaveData = React.useMemo(() => Vars.findCurrentSaveData(current_saveDataId, savesData), [current_saveDataId]);
    const route = useRoute();

    const savePng = () => {
        const domElement = document.querySelector(".root-container");
        html2canvas(domElement, {
            onclone: document => {
                document.getElementById(Vars.TINY_PREFERENCE_BLOCK).style.visibility = "hidden";
            }
        }).then(canvas => {
            Vars.showHomePageButtons(dispatch);
            Vars.closeModal(dispatch);
            const imgUrlData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            Utility.downloadImage(imgUrlData, `${new Date().toISOString()}.png`);
        });
    }

    const handleOpenSavesArea = () => {
        if (!Vars.isUserSignIn()) {
            Vars.showNotify(dispatch, `You must sign in to use this feature!`, Vars.sadImg);
            return;
        }
        Vars.showCustomModal(dispatch, `All of your save files are here`, "70%", Vars.createModalBody(<SavesDataArea width="100%" className="" />));
    }

    const handleSaveCvToHarddrive = () => {
        Vars.showYesNo(dispatch, `Are you sure wanting save your hard work into hard drive right now?`, () => {
            Vars.showLoading(dispatch, `Please wait! Processing...!`, () => {
                Vars.hideHomePageButtons(dispatch);
                savePng();
            }, 2000);
        });
    };

    const handleSaveNewCvToCloud = () => {
        if (!Vars.isUserSignIn()) {
            Vars.showNotify(dispatch, `You must sign in to use this feature!`, Vars.sadImg);
            return;
        }
        const EnterSaveFileName = ({ width, className, dispatch }) => {
            const [saveName, setSaveName] = React.useState("your_save_file");

            const saveAction = () => {
                const saveData = {
                    name: saveName,
                    homePage,
                    preference
                }
                Vars.showLoading(dispatch, `Please wait...!`, async () => {
                    const rawData = await Vars.fetchApi(Vars.urlAddSaveData(userId, password), {
                        method: "POST",
                        data: (saveData)
                    });
                    console.log(`addNewSaveData.res.rawData`, rawData)
                    if (rawData.messenger === "successfully!") {
                        Vars.closeModal(dispatch, Vars.MODAL_CUSTOM);
                        Vars.showNotify(dispatch, `Add new save file ${rawData.messenger}`);
                        const { _saveDataId, _createdDate } = rawData.doc;
                        const nextSaveData = {
                            saveData,
                            _saveDataId,
                            _createdDate,
                        }
                        // update the add saved to the redux store
                        const addedSavesData = Vars.addNewSaveDataToSavesData(savesData, nextSaveData);
                        Vars.updateSavesDataInStore(dispatch, addedSavesData, _saveDataId);
                        // save to local
                        Vars.saveUserInfoToLocal(userId, password, name, addedSavesData, _saveDataId);
                        // redirect route
                        route.push(Vars.url_userid_saveid(userId, _saveDataId));
                        return;
                    }
                    Vars.showNotify(dispatch, `Something went wrong!`, Vars.sadImg);
                }, 500)

            }

            const handleNameChange = (e) => {
                setSaveName(e.target.value);
            }

            return (
                <Block width={width} className={className} flexbox={true}>
                    <Input width="75%" maxLength="24" fontSize={Vars.FONT_SIZE_MD} onChange={handleNameChange} value={saveName} />
                    <Button width="25%" fontSize={Vars.FONT_SIZE_MD} onClick={saveAction}>Save</Button>
                </Block>
            )
        }
        Vars.showCustomModal(dispatch, `Choose your favourite name`, "70%", Vars.createModalBody(<EnterSaveFileName width="100%" className="" dispatch={dispatch} />))
    }

    const handleSaveCvToCloud = () => {
        if (!Vars.isUserSignIn()) {
            Vars.showNotify(dispatch, `You must sign in to use this feature!`, Vars.sadImg);
            return;
        }
        if (!savesData || !current_saveDataId) {
            handleSaveNewCvToCloud();
            return;
        }

        const saveObj = {
            name: currentSaveData.saveData.name,
            homePage,
            preference
        }
        Vars.showLoading(dispatch, `Please wait...!`, async () => {
            const rawData = await Vars.fetchApi(Vars.urlUpdateSaveData(userId, password, current_saveDataId), {
                method: "PUT",
                data: (saveObj)
            });
            if (rawData.messenger === "successfully!") {
                console.log(`saveCurrentSaveData.res.rawData`, rawData)
                Vars.closeModal(dispatch, Vars.MODAL_CUSTOM);
                Vars.showNotify(dispatch, `${rawData.messenger}`);
                // update the current saved to the redux store
                const updatedSavesData = Vars.updateCurrentSavesData(currentSaveData, savesData, { homePage, preference });
                Vars.updateSavesDataInStore(dispatch, updatedSavesData);
                // save to local
                Vars.saveUserInfoToLocal(userId, password, name, updatedSavesData);
                return;
            }
            Vars.showNotify(dispatch, `Something went wrong!`, Vars.sadImg);
        }, 500);
    }

    const handleReset = () => {
        Vars.showYesNo(dispatch, `Are you sure want to make a new file? All of your unsaved works will be lost!`, () => {
            Vars.clearHomepage(dispatch);
        });
    }

    return (
        <BlockModified width={width} className={className}>
            <Button onClick={handleOpenSavesArea} className="me-1 mb-1 bg-white">
                Load
            </Button>
            <Button onClick={handleSaveCvToCloud} className="me-1 mb-1 bg-white">
                Save
            </Button>
            <Button onClick={handleSaveNewCvToCloud} className="me-1 mb-1 bg-white">
                Save new
            </Button>
            <Button onClick={handleSaveCvToHarddrive} className="me-1 mb-1 bg-white">
                Save png
            </Button>
            <Button onClick={handleReset} className="me-2 mb-1 bg-white">
                New
            </Button>
            <Text fontSize={Vars.FONT_SIZE_SM} className="mb-1">{currentSaveData && currentSaveData.saveData.name || "unsaved"}</Text>
        </BlockModified>
    );
}

const mapCurrentStoreToProps = (currentStore) => {
    return {
        homePage: currentStore.homePage,
        preference: currentStore.preference,
        current_saveDataId: currentStore.user.current_saveDataId,
        savesData: currentStore.user.savesData,
        userId: currentStore.user.userId,
        password: currentStore.user.password,
        name: currentStore.user.name,
    }
}

export default connect(mapCurrentStoreToProps)(SaveCvNavbar);