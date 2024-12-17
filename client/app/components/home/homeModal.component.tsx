/* eslint-disable @typescript-eslint/no-explicit-any */
import { homeSchema } from "@/app/constants/homeSchema";
import { IHome } from "@/app/interfaces/home.interface";
import { Form, Formik } from "formik";
import { Alert, Button, Modal } from "react-bootstrap";
import { BasicHomeFormFields } from "./basicHomeFormFields.component";

interface IHomeModalProps {
    show: boolean;
    handleClose: () => void;
    modalTitle: string;
    handleSubmit: (formValues: any) => void;
    homeData?: IHome;
}
export const HomeModal = (
{
    show,
    handleClose,
    modalTitle,
    handleSubmit,
    homeData
}:IHomeModalProps) => {            
    const handleFormSubmit = (formValues:any) => {
        for(const key in formValues){
            console.log(key, formValues[key])
        }        
        handleSubmit(formValues);
    };

    return (
        <Modal show={show} onHide={handleClose} size={"lg"}>
            <Formik 
                initialValues={{
                    homeId: homeData?.homeId ?? undefined,
                    homeName: homeData?.homeName ?? "",
                    homePhoto: homeData?.homePhoto ?? "",
                    address: homeData?.address ?? "",
                    address2: homeData?.address2 ?? "",
                    city: homeData?.city ?? "",
                    state: homeData?.state ??"",
                    zip: homeData?.zip ?? "",
                    purchaseDate: homeData?.purchaseDate ?? undefined,
                    purchasePrice: homeData?.purchasePrice ?? 0,
                    notes: homeData?.notes ?? "",
                    trustedNeighbors: homeData?.trustedNeighbors ?? []
                }} 
                validationSchema={homeSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
            {({ errors, touched, isValid, dirty, values }) => (
                    <Form>
                        <Modal.Header closeButton>
                            <Modal.Title>{modalTitle} - {values.homeName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <BasicHomeFormFields errors={errors} touched={touched} />
                            <hr />
                            <Alert variant={"info"}>
                                After home creation, edit home to grant other users access and add further details.
                            </Alert>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                type={"button"}
                                onClick={() => handleFormSubmit(values)}
                                disabled={!(dirty && isValid)}
                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                            >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
            )}
            </Formik>
        </Modal>
    )
}