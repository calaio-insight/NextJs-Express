'use client';
import { HomeBasicTab } from "@/app/components/home/homeBasicTab.component";
import { HomeTabs } from "@/app/components/home/homeTabs.component";
import { HomeItemModal } from "@/app/components/homeItems/homeItemModal.component";
import { HomeItemTab } from "@/app/components/homeItems/homeItemTab.component";
import { PageSpinnerComponent } from "@/app/components/pageSpinner.component";
import { usePermissionsHook } from "@/app/hooks/usePermissions.hook";
import { IHome } from "@/app/interfaces/home.interface";
import { IHomeItem } from "@/app/interfaces/homeItem.interface";
import { IHomeRequest, IUploadHomeIconRequest, IUpsertHomeItemRequest, IUpsertHomeRequest } from "@/app/interfaces/request.interface";
import { useUploadHomeIconMutation } from "@/services/file/file.api";
import { useGetHomeByIdQuery, useUpsertHomeMutation } from "@/services/home/home.api";
import { useGetHomeItemsByHomeIdQuery, useUpsertHomeItemMutation } from "@/services/homeItem/homeItem.api";
import { useLoginMutation } from "@/services/user/user.api";
import { useGetUserTrustedNeighborsByUserIdQuery } from "@/services/userTrustedNeighbor/userTrustedNeighbor.api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Tab } from "react-bootstrap";

const HousePage = () => {
    const {homeId} = useParams();    
    const [homeRequest, setHomeRequest] = useState<IHomeRequest|undefined>(undefined);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);
    const [file, setFile] = useState<File>();

    const [, {isLoading: isUserLoading, data: currentUser}] = useLoginMutation({fixedCacheKey: 'currentUser'});
    const [ doUpsert, {isLoading:isSaveLoading, isError: isSaveError}] = useUpsertHomeMutation();
    const [ doItemUpsert, {isError: isItemSaveError}] = useUpsertHomeItemMutation();
    const [ doHomeIconUpload ] = useUploadHomeIconMutation();
    const { data:home, isLoading, isFetching, isError } = useGetHomeByIdQuery(homeRequest);
    const { data: homeItems, isLoading: isHomeItemsLoading } = useGetHomeItemsByHomeIdQuery(home?.homeId);

    // Preload trusted neighbor data for current user
    useGetUserTrustedNeighborsByUserIdQuery(currentUser?.userId);

    const {isOwner, canViewItems, canEditItems, canViewBasic, canEditBasic} = usePermissionsHook(home);

    const handleItemClose = () => setShowItemModal(false);
    const handleItemShow = () => setShowItemModal(true);

    const handleSubmit = (formValues: IHome) => {        
        console.log(formValues);
        const request: IUpsertHomeRequest = {
            home: formValues,
            userId: currentUser!.userId
        }
        
        doUpsert(request)
            .unwrap()
            .then((response: number) => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    const handleItemSubmit = (formValues: IHomeItem) => {
        console.log(formValues);
        const request: IUpsertHomeItemRequest = {
            homeItem: formValues,
            userId: currentUser!.userId
        }

        doItemUpsert(request)
            .unwrap()
            .then((response: number) => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleUpload = () => {
        if (!file || !home || !currentUser){
            alert("Must select file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        
        const request: IUploadHomeIconRequest = {
            userId: currentUser!.userId,
            homeId: home.homeId,
            file: formData
        }

        doHomeIconUpload(request)
            .unwrap()
            .then((response: any) => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });

    }
    const handleHomeItemUpload = (homeItemId: number) => {
        //todo
    }
    
    useEffect(() => {
        if (homeId && currentUser && currentUser.userId){
            setHomeRequest({homeId: +homeId, userId: currentUser.userId});
        }
    }, [homeId, currentUser])

    if (!home) return;

    return (
        <>
            {(isFetching || isLoading || isHomeItemsLoading || isSaveLoading || isUserLoading) && <PageSpinnerComponent />}

            <div className={"row mb-3"}>
                <h4 className={"col"}>{home.homeName}</h4>
                {(isOwner || canEditItems) &&
                    <Button className="btn btn-primary col-2" onClick={handleItemShow}>+ Create Home Item</Button>
                }
            </div>

            <Tab.Container defaultActiveKey={'#basicInfo'}>
                <HomeTabs home={home} homeItems={homeItems || []} />
                <Tab.Content>
                {(isOwner || canViewBasic || canEditBasic) &&
                    <Tab.Pane key={"basicInfo"} eventKey={"#basicInfo"}>
                        <HomeBasicTab
                            home={home}
                            handleSubmit={handleSubmit}
                            showImageModal={showImageModal}
                            setShowImageModal={setShowImageModal}
                            file={file}
                            setFile={setFile}
                            handleUpload={handleUpload}
                        />
                    </Tab.Pane>
                }
                
                {(isOwner || canViewItems || canEditItems) &&
                    homeItems?.map((item) => {
                        return (<Tab.Pane key={item.homeItemId} eventKey={"#homeItem" + item.homeItemId}>
                                <HomeItemTab
                                    key={item.homeItemId}
                                    home={home}
                                    item={item}
                                    handleSubmit={handleItemSubmit}
                                    showImageModal={showImageModal}
                                    setShowImageModal={setShowImageModal}
                                    file={file}
                                    setFile={setFile}
                                    handleUpload={handleHomeItemUpload}
                                />
                            </Tab.Pane>
                        )
                    })
                }
                </Tab.Content>
            </Tab.Container>

            <HomeItemModal modalTitle={"Create Home Item"}
                           homeId={home.homeId}
                           show={showItemModal}
                           handleClose={handleItemClose}
                           handleSubmit={handleItemSubmit}/>
        </>
    )
}

export default HousePage;