import React from "react";
import AccountLayout from "../../components/AccountLayout";

type Props = {};

const Tickets = (props: Props) => {
  const tickets = [];

  return (
    <AccountLayout>
      <div className="col-span-12 row-start-4">
        <h1 className="self-end text-base text-neutral-600">Reviews</h1>
        <div className="grid grid-cols-2 gap-2">
          {tickets.length > 0 ? (
            <></>
          ) : (
            <p className="col-span-2 text-center text-sm text-neutral-600">
              Not yet implemented
            </p>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default Tickets;
