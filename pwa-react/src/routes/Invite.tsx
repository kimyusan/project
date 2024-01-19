import React, { useEffect, useState } from "react";
import { UserInterface } from "../interface/UserInterface";
import { Wrapper } from "../styles/Invite/Compos";
import { QRCodeCanvas } from "qrcode.react";
import InvitePage from "../components/Invite/InvitePage";
import ShareButton from "../components/Invite/ShareButton";
import useUserStore from "../stores/UserStore";

const Invite = () => {
  const user = useUserStore();

  return (
    <Wrapper>
      <InvitePage userId={user.userId} name={user.name} email={user.email} />
      <QRCodeCanvas
        value={`http://localhost:3000/invite/${user.userId}/${user.name}/`}
        className="mb-30"
      />
      <ShareButton />
    </Wrapper>
  );
};

export default Invite;
