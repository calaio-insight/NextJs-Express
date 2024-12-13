import { usePermissionsHook } from "@/app/hooks/usePermissions.hook";
import { INeighborOption, IRoleOption } from "@/app/interfaces/options.interface";
import { ITrustedNeighbor } from "@/app/interfaces/trustedNeighbor.interface";
import { useLoginMutation } from "@/services/user/user.api";
import { useEffect, useState } from "react";
import { Button, FormGroup } from "react-bootstrap";
import Select from "react-select";
import { UserHomeDisplay } from "./userHomeDisplay.component";
import { IHome } from "@/app/interfaces/home.interface";
import { useGetUserTrustedNeighborsByUserIdQuery } from "@/services/userTrustedNeighbor/userTrustedNeighbor.api";
import { IHomeRoleType } from "@/app/interfaces/homeRole.type";
import { $enum } from "ts-enum-util";

interface IUserHomeFormFieldsProps {
    home: IHome;
    setFieldValue: any;
}
export const UserHomeFormFields = ({home, setFieldValue}:IUserHomeFormFieldsProps
) => {
    const {isOwner, canViewAccess, canEditAccess} = usePermissionsHook(home);
    const [, {isLoading: isUserLoading, data: currentUser}] = useLoginMutation({fixedCacheKey: 'currentUser'});
    const { data: userTrustedNeighbors, isLoading: isUserTrustedNeighborsLoading } = useGetUserTrustedNeighborsByUserIdQuery(currentUser?.userId);
    const hideDeleteButton = !isOwner && !canEditAccess;

    const [selectedNeighbor, setSelectedNeighbor] = useState<INeighborOption|null>(null);
    const [selectedRole, setSelectedRole] = useState<IRoleOption|null>(null);

    const [homeTrustedNeighbors, setHomeTrustedNeighbors] = useState<ITrustedNeighbor[]>([]);
    const [neighborOptions, setNeighborOptions] = useState<INeighborOption[]>([]);
    const [roleOptions, setRoleOptions] = useState<IRoleOption[]>([]);

    const mapRoleOptions = () => {
        const options = [];
        const roleValues = $enum(IHomeRoleType).getValues();
        const roleLabels = $enum(IHomeRoleType).getKeys();
        
        for (let i = 0; i < roleValues.length; i++) {
            let newOption: IRoleOption = {
                label: roleLabels[i],
                value: roleValues[i]
            }
            options.push(newOption);
        }
        setRoleOptions(options);
    }
    const mapNeighborOptions = () => {
        userTrustedNeighbors?.map((neighbor) => {
            let newOption:INeighborOption = {
                label: neighbor.displayName,
                value: {homeId: home.homeId, userId: neighbor.trustedUserId, displayName: neighbor.displayName},
            }
            
            //If trusted neighbor is already added to this home
            if (homeTrustedNeighbors.filter(x => x.userId === neighbor.trustedUserId).length > 0){
                //Remove from options
                let neighbors = neighborOptions.filter(n => n.value.userId != neighbor.trustedUserId);
                setNeighborOptions(neighbors);
            }
            else{
                //If neighbor option is not already in list
                if (neighborOptions.filter(x => x.value.userId == neighbor.trustedUserId).length == 0) {
                    setNeighborOptions([...neighborOptions, newOption]);
                }
            }
        });
    }
       
    const handleRemoveNeighbor = (neighborUserId: number) => {
        let neighbors = homeTrustedNeighbors.filter(n => n.userId != neighborUserId);
        setHomeTrustedNeighbors(neighbors);        
    }

    const handleAddNeighbor = () => {
        if (selectedNeighbor?.value === null || selectedRole?.value === null) {
            alert("Must select user and role.");
            return;
        }
        
        const newTrustedNeighbor:ITrustedNeighbor = {
            homeId: home.homeId,
            userId: selectedNeighbor!.value!.userId,
            displayName: selectedNeighbor!.value!.displayName,
            roleType: selectedRole!.value,            
        }        
        
        setHomeTrustedNeighbors([...homeTrustedNeighbors, newTrustedNeighbor]);
        setSelectedNeighbor(null);
        setSelectedRole(null);
    }

    useEffect(() => {
        if (home){
            setHomeTrustedNeighbors(home.trustedNeighbors)
        }
    }, [home]);
    
    useEffect(() => {
        setFieldValue("trustedNeighbors", homeTrustedNeighbors);
    }, [homeTrustedNeighbors])

    useEffect(() => {
        if (userTrustedNeighbors){
            mapNeighborOptions();
        }
    }, [userTrustedNeighbors])

    useEffect(() => {
        if (currentUser){
            mapRoleOptions();
        }
    }, [currentUser])
    
    return (
        <>
            <div className={"form-row mb-3"}>
                {(isOwner || canEditAccess) &&
                    <>
                        <span>Select other <i>trusted neighbors</i> who can access this home:</span>

                        <div className={"row"}>
                            <FormGroup className={"col-4"}>
                                <label
                                    htmlFor={"selectedUser"}
                                    className={"form-label col-form-label col-form-label-sm col"}>
                                    User
                                </label>
                                <Select
                                    name={"selectedUser"}
                                    value={selectedNeighbor}
                                    options={neighborOptions}
                                    onChange={setSelectedNeighbor}
                                />
                            </FormGroup>

                            <FormGroup className={"col-4"}>
                                <label
                                    htmlFor={"selectedRole"}
                                    className={"form-label col-form-label col-form-label-sm col"}>
                                    Role
                                </label>
                                <Select
                                    name={"selectedRole"}
                                    value={selectedRole}
                                    options={roleOptions}
                                    onChange={setSelectedRole}
                                />
                            </FormGroup>

                            <FormGroup className={"col-2 mt-auto"}>
                                <Button
                                    variant={"success"}
                                    onClick={handleAddNeighbor}
                                    disabled={!selectedRole || !selectedNeighbor}
                                    className={!selectedRole || !selectedNeighbor ? "disabled-btn" : ""}
                                >
                                    + Add
                                </Button>
                            </FormGroup>
                        </div>
                    </>
                }

                {(isOwner || canViewAccess || canEditAccess) &&
                    homeTrustedNeighbors && homeTrustedNeighbors.length > 0 &&
                        <UserHomeDisplay 
                            handleRemoveNeighbor={handleRemoveNeighbor}
                            homeTrustedNeighbors={homeTrustedNeighbors}
                            hideDeleteButton={hideDeleteButton}
                        />                    
                }                
            </div>
        </>
    )
}