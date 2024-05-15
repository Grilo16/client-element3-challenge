import { AdminCreateUserForm, Column, Main, Row } from "../../components";

export const Admin = () => {
    return (
        <Main>
            <Row>
                <Column>
                    <h1>admin page</h1>
                    <AdminCreateUserForm/>
                </Column>
            </Row>
        </Main>
    )
};