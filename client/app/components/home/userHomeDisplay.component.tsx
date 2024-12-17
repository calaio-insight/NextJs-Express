import { IHomeRoleType } from "@/app/interfaces/homeRole.type";
import { ITrustedNeighbor } from "@/app/interfaces/trustedNeighbor.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Table } from "react-bootstrap";

interface IUserHomeDisplayProps {
    homeTrustedNeighbors: ITrustedNeighbor[];
    handleRemoveNeighbor: (neighborUserId: number) => void;
    hideDeleteButton: boolean;
}
export const UserHomeDisplay = ({homeTrustedNeighbors, handleRemoveNeighbor, hideDeleteButton}: IUserHomeDisplayProps) => {
    
    return (
        <>
            <div className={"row mt-3"}>
                <Table className={'ms-2'} striped bordered style={{width: '60%'}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th className={"col-1"}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {homeTrustedNeighbors?.map((neighbor: ITrustedNeighbor) => {
                        return <tr key={neighbor.userId} id={"user-" + neighbor.userId}>
                            <td>{neighbor.displayName}</td>
                            <td>{neighbor?.roleType ? IHomeRoleType[neighbor.roleType] : ""}</td>
                            <td className={"text-center"}>
                                {!hideDeleteButton &&
                                    <Button className={"btn-sm"} variant={"danger"}
                                            onClick={() => handleRemoveNeighbor(neighbor.userId)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                }                                
                            </td>
                        </tr>
                    })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}