import { usePermissionsHook } from "@/app/hooks/usePermissions.hook";
import { useTooltip } from "@/app/hooks/useTooltip.hook";
import { IHome } from "@/app/interfaces/home.interface";
import { IHomeItem } from "@/app/interfaces/homeItem.interface";
import { ImageWithTooltip } from "../imageWithTooltip.component";
import { Form, Formik } from "formik";
import { homeItemSchema } from "@/app/constants/homeItemSchema";
import { Alert, Button } from "react-bootstrap";
import { ImageUploadModal } from "../imageUploadModal.component";
import { HomeItemFormFields } from "./homeItemFormFields.component";

interface IHomeItemTabProps {
    home: IHome;
    item: IHomeItem;
    handleSubmit: (formValues: IHomeItem) => void;
    showImageModal: boolean;
    setShowImageModal: any;
    file: File | undefined;
    setFile: any;
    handleUpload: (homeItemId: number) => void;
}
export const HomeItemTab = (
    {
        home,
        item,
        handleSubmit,
        showImageModal,
        setShowImageModal,
        file,
        setFile,
        handleUpload
    }:IHomeItemTabProps
) => {
    const {refs, getReferenceProps, isOpen, floatingStyles, getFloatingProps} = useTooltip();
    const {isOwner, canViewItems, canEditItems, canViewFiles, canEditFiles} = usePermissionsHook(home);
    const isItemDisabled = !isOwner && !canEditItems;
    
    const handleImageClick = () => {
        setShowImageModal(true);
    }
    
    const handleCloseImageModal = () => {
        setShowImageModal(false);
        setFile(undefined);
    }
    
    return (
        <>
            <ImageWithTooltip
                isOpen={isOpen}
                setFloating={refs.setFloating}
                floatingStyles={floatingStyles}
                getFloatingProps={getFloatingProps}
                imgSrc={item?.itemPhoto}
                imgAlt={"Home Item Icon"}
                handleImageClick={handleImageClick}
                setReference={refs.setReference}
                getReferenceProps={getReferenceProps}
            />

            <Formik
                initialValues={{
                    homeItemId: item?.homeItemId ?? undefined,
                    homeId: item?.homeId ?? undefined,
                    itemName: item?.itemName ?? "",
                    itemPhoto: item?.itemPhoto ?? "",
                    purchaseDate: item?.purchaseDate ?? undefined,
                    purchasePrice: item?.purchasePrice ?? undefined,
                    maintenanceDate: item?.maintenanceDate ?? undefined,
                    maintenanceCost: item?.maintenanceCost ?? undefined,
                    notes: item?.notes ?? "",
                }}
                validationSchema={homeItemSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ errors, touched, isValid, dirty, values }) => (
                    <Form>
                        {(isOwner || canViewItems || canEditItems) &&
                            <HomeItemFormFields 
                                errors={errors} 
                                touched={touched}
                                isItemDisabled={isItemDisabled}
                            />
                        }
                        <hr />
                        {item
                            ? <>
                                {(isOwner || canViewFiles || canEditFiles) &&
                                    <div>file uploads here?</div>
                                }
                            </>
                            :
                            <Alert variant={"info"}>
                                After home item creation, edit item to add an image or file uploads.
                            </Alert>
                        }

                        {(isOwner || canEditItems || canEditFiles) &&
                            <Button
                                variant="primary"
                                type={"button"}
                                onClick={() => handleSubmit(values)}
                                disabled={!(dirty && isValid)}
                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                            >
                                Save Changes
                            </Button>
                        }
                    </Form>
                )}
            </Formik>


            <ImageUploadModal
                file={file}
                setFile={setFile}
                show={showImageModal}
                handleClose={handleCloseImageModal}
                handleUpload={() => handleUpload(item.homeItemId)}
            />
        </>
    )
}