import moment from "moment"
import styled from "styled-components"

export default function Profile({ user }) {

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
            </header>

            <div className="mt-5">
                <div className="flex items-center mb-5">
                    <LabelText>Full name: </LabelText>
                    <div>{user.first_name} {user.last_name}</div>
                </div>
                <div className="flex items-center mb-5">
                    <LabelText>Position: </LabelText>
                    <div>{user.position}</div>
                </div>
                <div className="flex items-center mb-5">
                    <LabelText>Birth date: </LabelText>
                    <div>{moment(user.birthday).format('LL')}</div>
                </div>
                <div className="flex items-center mb-5">
                    <LabelText>Gender: </LabelText>
                    <div>{user.gender}</div>
                </div>
                <div className="flex items-center mb-5">
                    <LabelText>Email: </LabelText>
                    <div>{user.email}</div>
                </div>
                <div className="flex items-center mb-5">
                    <LabelText>Contact: </LabelText>
                    <div>{user.contact}</div>
                </div>
                <div className="flex items-center">
                    <LabelText>Address: </LabelText>
                    <div>{user.address}</div>
                </div>
            </div>
        </section>
    )
}

const LabelText = styled.div.attrs(() => ({
    className: `font-semibold uppercase text-sm shrink-0 w-32`
}))``