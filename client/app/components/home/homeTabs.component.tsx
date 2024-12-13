'use client';
import { usePermissionsHook } from "@/app/hooks/usePermissions.hook";
import { IHome } from "@/app/interfaces/home.interface";
import { IHomeItem } from "@/app/interfaces/homeItem.interface";
import { Nav } from "react-bootstrap";


interface IHomeTabsProps {
    home: IHome;
    homeItems: IHomeItem[]
}
export const HomeTabs = ({home, homeItems}:IHomeTabsProps) => {
    const {isOwner, canViewItems, canEditItems, canViewBasic, canEditBasic} = usePermissionsHook(home);

    return (
        <Nav variant="tabs">
            {(isOwner || canViewBasic || canEditBasic) &&
                <Nav.Item key={"0"}>
                    <Nav.Link eventKey={"#basicInfo"}>Basic Info</Nav.Link>
                </Nav.Item>
            }
            {(isOwner || canViewItems || canEditItems) &&
                <>
                    {homeItems?.map((item) => {
                        return (<Nav.Item key={item.homeItemId}>
                            <Nav.Link eventKey={"#homeItem" + item.homeItemId}>{item.itemName}</Nav.Link>
                        </Nav.Item>)
                        })}
                </>                
            }            
        </Nav>
    )
}