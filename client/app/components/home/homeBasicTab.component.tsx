import { IHome } from "@/app/interfaces/home.interface";
import { ImageWithTooltip } from "../imageWithTooltip.component";
import { usePermissionsHook } from "@/app/hooks/usePermissions.hook";
import { useTooltip } from "@/app/hooks/useTooltip.hook";
import { Form, Formik } from "formik";
import { homeSchema } from "@/app/constants/homeSchema";
import { BasicHomeFormFields } from "./basicHomeFormFields.component";
import { Alert, Button } from "react-bootstrap";
import { UserHomeFormFields } from "./userHomeFormFields.component";
import { ImageUploadModal } from "../imageUploadModal.component";


interface IHomeBasicTabProps {
    home: IHome;
    handleSubmit: (formValues: IHome) => void;
    showImageModal: boolean;
    setShowImageModal: any;
    file: File | undefined;
    setFile: any;
    handleUpload: () => void;
}

export const HomeBasicTab = (
    {
        home, 
        handleSubmit,
        showImageModal,
        setShowImageModal,
        file,
        setFile,
        handleUpload
    }: IHomeBasicTabProps
) => {  
    const {refs, getReferenceProps, isOpen, floatingStyles, getFloatingProps} = useTooltip();
    const {isOwner, canViewBasic, canEditBasic, canViewAccess, canEditAccess} = usePermissionsHook(home);
    const isBasicDisabled = !isOwner && !canEditBasic;  
            
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
                imgSrc={home?.homePhoto || ""}
                imgAlt={"Home Icon"}
                handleImageClick={handleImageClick}
                setReference={refs.setReference}
                getReferenceProps={getReferenceProps}
            />    
                        
            <Formik
                initialValues={{
                    homeId: home?.homeId ?? undefined,
                    homeName: home?.homeName ?? "",
                    homePhoto: home?.homePhoto ?? "",
                    address: home?.address ?? "",
                    address2: home?.address2 ?? "",
                    city: home?.city ?? "",
                    state: home?.state ??"",
                    zip: home?.zip ?? "",
                    purchaseDate: home?.purchaseDate ?? undefined,
                    purchasePrice: home?.purchasePrice ?? 0,
                    notes: home?.notes ?? "",
                    trustedNeighbors: home?.trustedNeighbors ?? []
                }}
                validationSchema={homeSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ errors, touched, isValid, dirty, values, setFieldValue }) => (
                    <Form>
                        {(isOwner || canViewBasic || canEditBasic) &&
                            <BasicHomeFormFields errors={errors} touched={touched} isBasicDisabled={isBasicDisabled}/>
                        }                        
                        <hr />
                        {home
                            ? <>
                                {(isOwner || canViewAccess || canEditAccess) &&
                                    <UserHomeFormFields
                                        home={home}
                                        setFieldValue={setFieldValue}
                                    />
                                }
                            </>
                            :
                            <Alert variant={"info"}>
                                After home creation, edit home to grant other users access and add further details.
                            </Alert>
                        }

                        {(isOwner || canEditBasic || canEditAccess) &&
                            <Button
                                variant="primary"
                                type={"button"}
                                onClick={() => handleSubmit(values)}
                                disabled={!(dirty && isValid)}
                                className={!(dirty && isValid) ? "disabled-btn mb-3" : "mb-3"}
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
                handleUpload={handleUpload}
            />
        </>
    )
    
}